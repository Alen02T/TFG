using AutoMapper;
using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Entity;
using CheckeredFlagAPI.Models;
using CheckeredFlagAPI.Models.AuthModels;
using CheckeredFlagAPI.Services.DirectorService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoresController : ControllerBase
        {
            private readonly DataContext _context;
            private readonly IDirectorService _directorService;
            private readonly IMapper _mapper;    
        public DirectoresController(DataContext context, IDirectorService directorService,IMapper mapper)
            {
                _context = context;
                _directorService = directorService;
                _mapper = mapper;

            }


            /// <summary>
            /// Devuelve todos los empleados
            /// </summary>
            /// <returns>Devuelve lista de <see cref="EmpleadoDTO"/></returns>

            [HttpGet]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DirectorDTO))]
            public ActionResult<DirectorDTO> Get()
            {
                return Ok(_directorService.GetAll());
            }

            /// <summary>
            /// Devuelve empleado buscado por su email
            /// </summary>
            /// <param name="Email">Correo del empleado a buscar</param>
            /// <returns>Devuelve <see cref="EmpleadoDTO"/></returns>

            [HttpGet("GetByEmail/{Email}")]
            [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DirectorDTO))]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public ActionResult<DirectorDTO> Get(string Email)
            {
                DirectorDTO result = _directorService.GetByUser(Email);
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
        /*
        [HttpPut("{directorId}")]
        public IActionResult UpdateDirector(int directorId, [FromBody] DirectorDTO updatedDirector)
        {
            try
            {
                var existingDirector = _directorService.GetByID(directorId);
                if (existingDirector == null)
                {
                    return NotFound();
                }

                updatedDirector.Id = directorId;
                var updatedDirectorDTO = _directorService.Update(directorId, updatedDirector);

                return Ok(updatedDirectorDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the director: {ex.Message}");
            }
        }*/

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateDriver([FromRoute] int id, DirectorDTO request)
        {
            var dbDirector = await _context.Directores.FindAsync(id);
            if (dbDirector == null)
                return BadRequest("Driver not found.");
            //dbTask.Id = request.Id;
            dbDirector.Name = request.Name;
            dbDirector.Email = request.Email;
            dbDirector.LeagueId= request.LeagueId;
          

            await _context.SaveChangesAsync();

            return Ok(dbDirector);
        }

        [HttpPost]
        public async Task<IActionResult> CrearDirector([FromBody] DirectorDTO directorDTO)
        {
            var director = _mapper.Map<DirectorDTO,DirectorEntity>(directorDTO);

            _context.Directores.Add(director);
            await _context.SaveChangesAsync();

            return Ok();
        }



     
     
    }
    }
