using CheckeredFlagAPI.Models.AuthModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        //private readonly JwtConfig _jwtConfig;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<IdentityUser> userManager,
            //JwtConfig jwtConfig
            IConfiguration configuration
            )
        {

            _userManager = userManager;
            _configuration = configuration;
            //_jwtConfig = jwtConfig;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
        {
            //Validate the incoming request
            if (ModelState.IsValid)
            {
                //We need to check if this is a valid 

                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);
                if (user_exist != null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Errors = new List<string>()
                        {
                               "Email already exist"
                        }

                    });
                }
                //Create a user
                var new_user = new IdentityUser()
                {
                    UserName = requestDto.Name,
                    Email = requestDto.Email,

                };

                var is_created = await _userManager.CreateAsync(new_user, requestDto.Password);

                if (is_created.Succeeded)
                {
                    //Generate the token 
                    var token = GenerateJwtToken(new_user);
                    return Ok(new AuthResult()
                    {
                        Result = true,
                        Token = token

                    });
                }
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Server Error"
                    },
                    Result = false
                });


            }
            return BadRequest();
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDto loginRequest)
        {
            if (ModelState.IsValid)
            {
                var existing_user = await _userManager.FindByEmailAsync(loginRequest.Email);


                if (existing_user == null)
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>() {
                        "Invalid Payload"
                        }
                        ,
                        Result = false

                    });

                var isCorrect = await _userManager.CheckPasswordAsync(existing_user, loginRequest.Password);

                if (!isCorrect)
                    return BadRequest(new AuthResult()
                    {
                        Errors = new List<string>() {
                            "Invalid credentials"
                        },
                        Result = false
                    });

                var jwtToken = GenerateJwtToken(existing_user);
                return Ok(jwtToken);

            }
            return BadRequest(new AuthResult()
            {
                Errors = new List<string>() {
                    "Invalid Payload"
                },
                Result = false

            });
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            //Token Descriptor

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id",user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub,user.Email),
                    //new Claim(JwtRegisteredClaimNames.Email,user.Email),
                    new Claim("email",user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.Now.ToUniversalTime().ToString()),

                }),

                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),

            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);
            return jwtToken;



        }

    }
}
