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
        public async Task<ActionResult<List<Ability>>> GetAbilities()
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
        public async Task<ActionResult<List<Ability>>> GetDriverAbilitiesByDriverId(int driverId)
        {
            var Ability = await _context.Abilities
                .FirstOrDefaultAsync(c => c.driverId == driverId);
             if (Ability == null)
                return BadRequest("Ability not found.");
            return Ok(Ability);
        }

        [HttpPost]
        public async Task<ActionResult<List<Ability>>> AddAbility(Ability ability)
        {
            _context.Abilities.Add(ability);
            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }


        [HttpPut]
        public async Task<ActionResult<List<Ability>>> UpdateAbility(Ability request)
        {
            var dbAbility = await _context.Abilities.FindAsync(request.abilityId);
            if (dbAbility == null)
                return BadRequest("Ability not found.");

            dbAbility.overtaking = request.overtaking;
            dbAbility.defending = request.defending;
            dbAbility.tireManagement = request.tireManagement;
            dbAbility.consistency = request.consistency;
            dbAbility.pace = request.pace;
            dbAbility.experience= request.experience;
            dbAbility.overall = request.overall;
            //dbAbility.driverId = request.driverId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Ability>>> Delete(int id)
        {
            var dbAbility = await _context.Abilities.FindAsync(id);
            if (dbAbility == null)
                return BadRequest("Ability not found.");

            _context.Abilities.Remove(dbAbility);
            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }
        
        [HttpDelete("driver/{driverId}")]
        public async Task<ActionResult<List<Ability>>> DeleteByDriverId(int driverId)
        {
            var Ability = await _context.Abilities.
                FirstOrDefaultAsync(a => a.driverId == driverId);
            if (Ability == null)
                return BadRequest("Ability not found.");
            _context.Abilities.Remove(Ability);
            await _context.SaveChangesAsync();

            return Ok(await _context.Abilities.ToListAsync());
        }
    }




}
