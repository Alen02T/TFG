using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models.AuthModels;
using CheckeredFlagAPI.Services.DirectorService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectoresController : ControllerBase
        {
            private readonly DataContext _context;
            private readonly IDirectorService _directorService;
            public DirectoresController(DataContext context, IDirectorService directorService)
            {
                _context = context;
                _directorService = directorService;

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

        }
    }
