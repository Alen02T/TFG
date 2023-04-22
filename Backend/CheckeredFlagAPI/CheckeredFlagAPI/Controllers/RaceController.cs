using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceController : ControllerBase
    {
        private readonly DataContext _context;

        public RaceController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Race>>> GetRaces()
        {
            return Ok(await _context.Races.OrderBy(Races => Races.round).ToListAsync());
        }



        [HttpGet("sponsor/{sponsorId}")]
        public async Task<ActionResult<List<Race>>> GetSponsor(int sponsorId)
        {
            var races = await _context.Races
                .Where(c => c.Sponsor == sponsorId)
                .ToListAsync();

            return races;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Race>> Get(int id)
        {
            var Race = await _context.Races.FindAsync(id);
            if (Race == null)
                return BadRequest("Race not found.");
            return Ok(Race);
        }



        [HttpPost]
        public async Task<ActionResult<List<Race>>> AddRace(Race Race)
        {
            _context.Races.Add(Race);
            await _context.SaveChangesAsync();

            return Ok(await _context.Races.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Race>>> UpdateRace(Race request)
        {
            var dbRace = await _context.Races.FindAsync(request.Id);
            if (dbRace == null)
                return BadRequest("Race not found.");

            dbRace.year = request.year;
            dbRace.round = request.round;
            dbRace.name = request.name;
            dbRace.Circuit = request.Circuit;
            dbRace.Sponsor = request.Circuit;
            dbRace.date = request.date;

            await _context.SaveChangesAsync();

            return Ok(await _context.Races.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Race>>> Delete(int id)
        {
            var dbRace = await _context.Races.FindAsync(id);
            if (dbRace == null)
                return BadRequest("Race not found.");

            _context.Races.Remove(dbRace);
            await _context.SaveChangesAsync();

            return Ok(await _context.Races.ToListAsync());
        }

    }
}
