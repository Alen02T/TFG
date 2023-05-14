using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        // POST: api/Liga
        [HttpPost]
        public async Task<ActionResult<Liga>> PostLiga(Liga liga)
        {
            _context.Ligas.Add(liga);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiga", new { id = liga.Id }, liga);
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
