using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly DataContext _context;

        public TeamController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Team>>> GetTeams()
        {
            return Ok(await _context.Teams.ToListAsync());
        }


        [HttpGet("points")]
        public async Task<ActionResult<List<Team>>> GetTeamsByPoints()
        {
            return Ok(await _context.Teams.OrderByDescending(Teams => Teams.points).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> Get(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null)
                return BadRequest("Team not found.");
            return Ok(team);
        }



        [HttpPost]
        public async Task<ActionResult<List<Team>>> AddTeam(Team team)
        {
            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            return Ok(await _context.Teams.ToListAsync());
        }
        
        //Version Optimizada de Put
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTeam([FromRoute] int id, Team request)
        {
            var dbTeam = await _context.Teams.FindAsync(request.teamId);
            if (dbTeam == null)
                return BadRequest("Team not found.");

            dbTeam.name = request.name;
            dbTeam.country = request.country;
            dbTeam.flag = request.flag;
            dbTeam.color = request.color;
            dbTeam.director = request.director;
            dbTeam.engine = request.engine;
            dbTeam.points = request.points;
            dbTeam.shieldImage = request.shieldImage;
            dbTeam.vehicleImage = request.vehicleImage;
            dbTeam.poles = request.poles;
            dbTeam.chassis = request.chassis;
            dbTeam.wins = request.wins;
            dbTeam.homefactory= request.homefactory;
            dbTeam.championships = request.championships;
            dbTeam.highestScoringTrack = request.highestScoringTrack;

            await _context.SaveChangesAsync();

            return Ok(dbTeam);

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Team>>> Delete(int id)
        {
            var dbTeam = await _context.Teams.FindAsync(id);
            if (dbTeam == null)
                return BadRequest("Team not found.");

            _context.Teams.Remove(dbTeam);
            await _context.SaveChangesAsync();

            return Ok(await _context.Teams.ToListAsync());
        }
    }
}
