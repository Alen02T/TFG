using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatController : ControllerBase
    {
        private readonly DataContext _context;

        public StatController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Stat>>> GetStats()
        {
            return Ok(await _context.Stats.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stat>> Get(int id)
        {
            var Stat = await _context.Stats.FindAsync(id);
            if (Stat == null)
                return BadRequest("Stat not found.");
            return Ok(Stat);
        }


        [HttpGet("driver/{driverId}")]
        public async Task<ActionResult<Stat>> GetDriverStatsByDriverId(int driverId)
        {
            /*
            var Tasks = await _context.Stats
                .Where(c => c.DriverId == driverId)
                .ToListAsync();

            return Tasks;*/

            var Stat = await _context.Stats.
                FirstOrDefaultAsync(s=>s.DriverId == driverId);
            if (Stat == null)
                return BadRequest("Stat not found.");
            return Ok(Stat);

            /*
            var Stat = await _context.Stats.FindAsync(id);
            if (Stat == null)
                return BadRequest("Stat not found.");
            return Ok(Stat);*/
        }

        [HttpPost]
        public async Task<ActionResult<List<Stat>>> AddStat(Stat Stat)
        {
            _context.Stats.Add(Stat);
            await _context.SaveChangesAsync();

            return Ok(await _context.Stats.ToListAsync());
        }


        [HttpPut]
        public async Task<ActionResult<List<Stat>>> UpdateStat(Stat request)
        {
            var dbStat = await _context.Stats.FindAsync(request.Id);
            if (dbStat == null)
                return BadRequest("Stat not found.");

            dbStat.Points = request.Points;
            dbStat.Dnfs = request.Dnfs;
            dbStat.Wins = request.Wins;
            dbStat.Poles = request.Poles;
            dbStat.FastestLaps = request.FastestLaps;
            dbStat.HighestGridPos = request.HighestGridPos;
            dbStat.Podiums = request.Podiums;
            dbStat.beatTeamMateRate = request.beatTeamMateRate;
            dbStat.HighestScoringTrack = request.HighestScoringTrack;

            await _context.SaveChangesAsync();

            return Ok(await _context.Stats.ToListAsync());
        }



        [HttpPut("driver/{driverId}")]
        public async Task<ActionResult<Stat>> UpdateStatByDriverId(Stat request, int driverId)
        {
            var dbStat = await _context.Stats.
               FirstOrDefaultAsync(s => s.DriverId == driverId);
            if (dbStat == null)
                return BadRequest("Stat not found.");

            dbStat.Points = request.Points;
            dbStat.Dnfs = request.Dnfs;
            dbStat.Wins = request.Wins;
            dbStat.Poles = request.Poles;
            dbStat.FastestLaps = request.FastestLaps;
            dbStat.HighestGridPos = request.HighestGridPos;
            dbStat.Podiums = request.Podiums;
            dbStat.beatTeamMateRate = request.beatTeamMateRate;
            dbStat.HighestScoringTrack = request.HighestScoringTrack;

            await _context.SaveChangesAsync();

            return Ok(dbStat);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Stat>>> Delete(int id)
        {
            var dbStat = await _context.Stats.FindAsync(id);
            if (dbStat == null)
                return BadRequest("Stat not found.");

            _context.Stats.Remove(dbStat);
            await _context.SaveChangesAsync();

            return Ok(await _context.Stats.ToListAsync());
        }


        [HttpDelete("driver/{driverId}")]
        public async Task<ActionResult<List<Stat>>> DeleteByDriverId(int driverId)
        {
            var Stat = await _context.Stats.
                FirstOrDefaultAsync(s => s.DriverId == driverId);
            if (Stat == null)
                return BadRequest("Stat not found.");
            _context.Stats.Remove(Stat);
            await _context.SaveChangesAsync();

            return Ok(await _context.Stats.ToListAsync());
        }
    }
}
