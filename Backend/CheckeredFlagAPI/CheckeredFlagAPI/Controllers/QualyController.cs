using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
/**/
namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualyController : ControllerBase
    {

        private readonly DataContext _context;

        public QualyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Qualy>>> GetQualys()
        {
            return Ok(await _context.Qualys.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Qualy>> Get(int id)
        {
            var Qualy = await _context.Qualys.FindAsync(id);
            if (Qualy == null)
                return BadRequest("Qualy not found.");
            return Ok(Qualy);
        }

        [HttpGet("races/{raceId}")]
        public async Task<ActionResult<List<Qualy>>> GetAllRacesByRaceId(int raceId)
        {
            var qualys = await _context.Qualys
                .Where(c => c.RaceId == raceId)
                .ToListAsync();

            return qualys;
        }

        [HttpGet("race/{raceId}")]
        public async Task<ActionResult<Qualy>> GetRace(int raceId)
        {
            var qualy = await _context.Qualys
                .Where(c => c.RaceId == raceId)
                .FirstOrDefaultAsync();

            return qualy;
        }

   


        [HttpPost]
        public async Task<ActionResult<List<Qualy>>> AddQualy(Qualy qualy)
        {
            _context.Qualys.Add(qualy);
            await _context.SaveChangesAsync();

            return Ok(await _context.Qualys.ToListAsync());
        }


        [HttpPost("/Qualys")]
        public async Task<ActionResult<List<Qualy>>> AddQualys(List<Qualy> qualys)
        {
            _context.Qualys.AddRange(qualys);
            await _context.SaveChangesAsync();

            return Ok(await _context.Qualys.ToListAsync());
        }


        [HttpPut]
        public async Task<ActionResult<List<Qualy>>> UpdateQualy(Qualy request)
        {
            var dbResult = await _context.Qualys.FindAsync(request.Id);
            if (dbResult == null)
                return BadRequest("Qualy not found.");

            dbResult.RaceId = request.RaceId;
            dbResult.DriverId = request.DriverId;
            dbResult.Time = request.Time;
            dbResult.Grid = request.Grid;
            dbResult.FastestLap = request.FastestLap;
            dbResult.TeamId = request.TeamId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Qualys.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Qualy>>> Delete(int id)
        {
            var dbResult = await _context.Qualys.FindAsync(id);
            if (dbResult == null)
                return BadRequest("Qualy not found.");

            _context.Qualys.Remove(dbResult);
            await _context.SaveChangesAsync();

            return Ok(await _context.Qualys.ToListAsync());
        }

        [HttpDelete("race/{raceId}")]
        public async Task<ActionResult> DeleteByRace(int raceId)
        {
            var qualysToDelete = await _context.Qualys.Where(q => q.RaceId == raceId).ToListAsync();

            if (qualysToDelete.Count == 0)
            {
                return BadRequest("No qualys found for the race.");
            }

            _context.Qualys.RemoveRange(qualysToDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
