using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CircuitController : ControllerBase
    {
        private readonly DataContext _context;

        public CircuitController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Circuit>>> GetCircuits()
        {
            return Ok(await _context.Circuits.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Circuit>> Get(int id)
        {
            var Circuit = await _context.Circuits.FindAsync(id);
            if (Circuit == null)
                return BadRequest("Circuit not found.");
            return Ok(Circuit);
        }

        [HttpPost]
        public async Task<ActionResult<List<Circuit>>> AddHero(Circuit Circuit)
        {
            _context.Circuits.Add(Circuit);
            await _context.SaveChangesAsync();

            return Ok(await _context.Circuits.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Circuit>>> UpdateHero(Circuit request)
        {
            var dbCircuit = await _context.Circuits.FindAsync(request.circuitId);
            if (dbCircuit == null)
                return BadRequest("Circuit not found.");

            dbCircuit.name = request.name;
            dbCircuit.country = request.country;
            dbCircuit.flag = request.flag;
            dbCircuit.laps = request.laps;
            dbCircuit.imageMap = request.imageMap;
            dbCircuit.imageCircuit = request.imageCircuit;
            dbCircuit.length = request.length;
            dbCircuit.driverRecord = request.driverRecord;
            dbCircuit.lapRecord=request.lapRecord;

            await _context.SaveChangesAsync();

            return Ok(await _context.Circuits.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Circuit>>> Delete(int id)
        {
            var dbCircuit = await _context.Circuits.FindAsync(id);
            if (dbCircuit == null)
                return BadRequest("Circuit not found.");

            _context.Circuits.Remove(dbCircuit);
            await _context.SaveChangesAsync();

            return Ok(await _context.Circuits.ToListAsync());
        }
    }
}
