using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigaController : ControllerBase
    {

        private readonly DataContext _context;

        public LigaController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Liga
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Liga>>> GetLigas()
        {
            return await _context.Ligas.Include(l=>l.Circuits).ToListAsync();
        }

        // GET: api/Liga/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Liga>> GetLiga(int id)
        {
            var liga = await _context.Ligas.Include(l => l.Circuits).FirstOrDefaultAsync(l => l.Id == id);
            if (liga == null)
            {
                return NotFound();
            }

            return liga;
        }



        // GET: api/Liga/5
        [HttpGet("Director/{directorId}")]
        public async Task<ActionResult<Liga>> GetLigaByDirectorId(int directorId)
        {
            var ligaDirector = await _context.Ligas
                .Where(c => c.DirectorId == directorId)
                .Include(l => l.Circuits)
                .FirstOrDefaultAsync();

            if (ligaDirector == null)
            {
                return BadRequest("No se ha encontrado ninguna liga relacionada a este director");
            }

            return ligaDirector;
        }

        // PUT: api/Liga/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiga(int id, Liga liga)
        {
            if (id != liga.Id)
            {
                return BadRequest();
            }

            _context.Entry(liga).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LigaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    

        [HttpPost("{idLiga}/seleccionar-circuitos")]
        public async Task<ActionResult<Liga>> SeleccionarCircuitos(int idLiga, List<int> circuitoIds)
        {
            var liga = await _context.Ligas.FindAsync(idLiga);

            if (liga == null)
            {
                return NotFound();
            }

            if (circuitoIds == null || circuitoIds.Count == 0)
            {
                // No hay circuitos seleccionados, borrar la lista actual
                liga.Circuits = null;
            }
            else
            {
                // Buscar los circuitos seleccionados por id en la base de datos y agregarlos a la lista de circuitos seleccionados de la liga.
                var circuitosSeleccionados = await _context.Circuits.Where(c => circuitoIds.Contains(c.circuitId)).ToListAsync();

                if (circuitosSeleccionados.Count != circuitoIds.Count)
                {
                    // Alguno de los circuitoIds no existe en la base de datos
                    return BadRequest("Uno o más circuitos seleccionados no existen.");
                }

                liga.Circuits = circuitosSeleccionados;
            }

            await _context.SaveChangesAsync();

            return Ok(liga);
        }

        [HttpPut("{ligaId}/currentRound/{newCurrentRound}")]
        public async Task<ActionResult> UpdateCurrentRound(int ligaId, int newCurrentRound)
        {
            var liga = await _context.Ligas.FindAsync(ligaId);

            if (liga == null)
            {
                return NotFound(); // Retorna un resultado 404 si no se encuentra la liga correspondiente
            }

            liga.currentRound = newCurrentRound;
           

            _context.Entry(liga).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(liga); // Retorna un resultado 200 OK si la actualización se realiza correctamente
        }


        // DELETE: api/Liga/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLiga(int id)
        {
            var liga = await _context.Ligas.FindAsync(id);
            if (liga == null)
            {
                return NotFound();
            }

            _context.Ligas.Remove(liga);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LigaExists(int id)
        {
            return _context.Ligas.Any(e => e.Id == id);
        }
    }
}
