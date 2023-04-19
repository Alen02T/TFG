using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbilityController : ControllerBase
    {

        private readonly DataContext _context;

        public AbilityController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ability>>> GetStats()
        {
            return Ok(await _context.Abilities.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ability>> Get(int id)
        {
            var Ability = await _context.Abilities.FindAsync(id);
            if (Ability == null)
                return BadRequest("Ability not found.");
            return Ok(Ability);
        }


        [HttpGet("driver/{driverId}")]
        public async Task<ActionResult<List<Ability>>> GetDriverStatsByDriverId(int driverId)
        {
            var Tasks = await _context.Abilities
                .Where(c => c.driverId == driverId)
                .ToListAsync();

            return Tasks;
        }

        [HttpPost]
        public async Task<ActionResult<List<Ability>>> AddStat(Ability ability)
        {
            _context.Abilities.Add(ability);
            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }


        [HttpPut]
        public async Task<ActionResult<List<Ability>>> UpdateStat(Ability request)
        {
            var dbStat = await _context.Abilities.FindAsync(request.abilityId);
            if (dbStat == null)
                return BadRequest("Ability not found.");

            dbStat.overtaking = request.overtaking;
            dbStat.defending = request.defending;
            dbStat.tireManagement = request.tireManagement;
            dbStat.consistency = request.consistency;
            dbStat.pace = request.pace;
            dbStat.experience= request.experience;
            dbStat.overall = request.overall;
            //dbStat.driverId = request.driverId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Ability>>> Delete(int id)
        {
            var dbStat = await _context.Abilities.FindAsync(id);
            if (dbStat == null)
                return BadRequest("Ability not found.");

            _context.Abilities.Remove(dbStat);
            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }








    }




}
