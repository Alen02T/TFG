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



        [HttpGet("{leagueId}/{id}")]
        public async Task<ActionResult<Team>> Get(int leagueId,int id)
        {
            var league = await _context.Ligas.FindAsync(leagueId);

            if (league == null)
            {
                return NotFound("Liga not found.");
            }

            var team = await _context.Teams.FindAsync(id);

            if (team == null) {
                return BadRequest("Team not found.");
            }

            if (team.leagueId != league.Id)
            {
                return Unauthorized("Access denied."); // Devuelve un error de autorización si el director no tiene permiso para acceder al piloto
            }

         
               
            return Ok(team);
        }



        [HttpGet("league/{leagueId}")]
        public async Task<ActionResult<List<Team>>> GetTeamsByLeague(int leagueId)
        {
            var teams = await _context.Teams
                 .Where(c => c.leagueId == leagueId)
                 .ToListAsync();

            return teams;
        }


        [HttpGet("points/{leagueId}")]
        public async Task<ActionResult<List<Team>>> GetTeamsByLeagueOrderedByPoints(int leagueId)
        {
            var teams = await _context.Teams
                 .Where(c => c.leagueId == leagueId).
                  OrderByDescending(c=>c.points)
                 .ToListAsync();

            return teams;
        }

        //Equipos sin un piloto
        [HttpGet("teams-without-one-driver/league/{leagueId}")]
        public async Task<ActionResult<List<Team>>> GetTeamsWithoutOneDriver(int leagueId)
        {
            var teams = await _context.Teams
             .Where(t => _context.Drivers.Count(d => d.team == t.teamId) == 1 && t.leagueId == leagueId)
             .ToListAsync();
            return teams;

        }
        //Equipos disponibles
        [HttpGet("teams-available/league/{leagueId}")]
        public async Task<ActionResult<List<Team>>> GetAvailableTeams(int leagueId)
        {
            var teams = await _context.Teams
             .Where(t => _context.Drivers.Count(d => d.team == t.teamId) == 1 && t.leagueId == leagueId || !_context.Drivers.Any(d => d.team == t.teamId) && t.leagueId == leagueId)
             .ToListAsync();
            return teams;

        }
        //Equipos sin pilotos
        [HttpGet("teams-without-drivers/league/{leagueId}")]
        public async Task<ActionResult<List<Team>>> GetTeamsWithoutDrivers(int leagueId)
        {
            var teams = await _context.Teams
                .Where(t => !_context.Drivers.Any(d => d.team == t.teamId) && t.leagueId == leagueId)
                .ToListAsync();

            return teams;

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

        } /*
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTeam([FromRoute] int id, [FromBody] int points)
        {
            var dbTeam = await _context.Teams.FindAsync(id);
            if (dbTeam == null)
                return BadRequest("Team not found.");

            dbTeam.points += points;

            await _context.SaveChangesAsync();

            return Ok(dbTeam);
        }
        */


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

        [HttpDelete("league/{leagueId}")]
        public async Task<ActionResult> DeleteByLeague(int leagueId)
        {
            var teamsToDelete = await _context.Teams.Where(t => t.leagueId == leagueId).ToListAsync();

            if (teamsToDelete.Count == 0)
            {
                return BadRequest("No teams found in the league.");
            }

            _context.Teams.RemoveRange(teamsToDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
