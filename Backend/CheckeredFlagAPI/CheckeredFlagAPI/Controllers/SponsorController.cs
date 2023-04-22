using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly DataContext _context;

        public SponsorController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Sponsor>>> GetSponsors()
        {
            return Ok(await _context.Sponsors.ToListAsync());
        }

        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<List<Sponsor>>> GetTeam(int teamId)
        {
            var sponsors = await _context.Sponsors
                .Where(c => c.Team == teamId)
                .ToListAsync();

            return sponsors;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sponsor>> Get(int id)
        {
            var Sponsor = await _context.Sponsors.FindAsync(id);
            if (Sponsor == null)
                return BadRequest("Sponsor not found.");
            return Ok(Sponsor);
        }

        [HttpPost]
        public async Task<ActionResult<List<Sponsor>>> AddSponsor(Sponsor Sponsor)
        {
            _context.Sponsors.Add(Sponsor);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sponsors.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Sponsor>>> UpdateSponsor(Sponsor request)
        {
            var dbSponsor = await _context.Sponsors.FindAsync(request.sponsorId);
            if (dbSponsor == null)
                return BadRequest("Sponsor not found.");

            dbSponsor.Name = request.Name;
            dbSponsor.Description = request.Description;
            dbSponsor.Link = request.Link;
            dbSponsor.imgShieldBlack = request.imgShieldBlack;
            dbSponsor.imgShield = request.imgShield;
            dbSponsor.Team = request.Team;


            await _context.SaveChangesAsync();

            return Ok(await _context.Sponsors.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Sponsor>>> Delete(int id)
        {
            var dbSponsor = await _context.Sponsors.FindAsync(id);
            if (dbSponsor == null)
                return BadRequest("Sponsor not found.");

            _context.Sponsors.Remove(dbSponsor);
            await _context.SaveChangesAsync();

            return Ok(await _context.Sponsors.ToListAsync());
        }
    }
}
