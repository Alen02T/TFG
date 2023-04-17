using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbilityController : ControllerBase
    {

        private readonly Ability[] _abilities = new Ability[] {
            new Ability { DriverId = 1,statId = 1,overtaking = 8,defending = 7,tireManagement = 9,consistency = 8,experience = 6,pace = 9,overall = 8},
            new Ability { DriverId = 2,statId =3,overtaking =2,defending = 3,tireManagement = 1,consistency = 4,experience = 5,pace = 1,overall = 3}
        };


        private readonly DataContext _context;
        public AbilityController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("All")]
        public IEnumerable<Ability> Get()
        {
                // Crear y devolver una lista de habilidades
                return _abilities;
        }

        /*
        [HttpGet("driver/{driverId}")]
        public async IActionResult<Stat>> GetDriverStatsByDriverId(int driverId)
        {
            var Tasks =_abilities.FirstOrDefault(d => d.driverId == id);

            return Tasks;
        }*/





        [HttpGet("{driverId}")]
        public ActionResult<Ability> GetDriverById(int driverId)
        {
            var driverAbility = _abilities.FirstOrDefault(da => da.DriverId == driverId);

            if (driverAbility == null)
            {
                return NotFound();
            }

            return driverAbility;
        }















    }




}
