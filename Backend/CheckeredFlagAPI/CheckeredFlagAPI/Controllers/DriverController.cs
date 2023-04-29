using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase

    {

        private readonly DataContext _context;

        public DriversController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Driver>>> GetDrivers()
        {
            return Ok(await _context.Drivers.ToListAsync());
        }


        [HttpGet("league/{leagueId}")]
        public async Task<ActionResult<List<Driver>>> GetDriversByLeague(int leagueId)
        {
            var drivers = await _context.Drivers
                 .Where(c => c.leagueId == leagueId)
                 .ToListAsync();

            return drivers;
        }

        /*
        [HttpGet("points")]
        public async Task<ActionResult<List<Driver>>> GetDriversByPoints()
        {
            return Ok(await _context.Drivers.OrderByDescending(Drivers => Drivers.).ToListAsync());
        }*/



        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<List<Driver>>> GetTeam(int teamId)
        {
            var drivers = await _context.Drivers
                .Where(c => c.team == teamId)
                .ToListAsync();

            return drivers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> Get(int id)
        {
            var Driver = await _context.Drivers.FindAsync(id);
            if (Driver == null)
                return BadRequest("Driver not found.");
            return Ok(Driver);
        }




        [HttpPost]
        public async Task<ActionResult<List<Driver>>> AddDriver(Driver Driver)
        {
            _context.Drivers.Add(Driver);
            await _context.SaveChangesAsync();

            return Ok(await _context.Drivers.ToListAsync());
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateDriver([FromRoute] int id, Driver request)
        {
            var dbDriver = await _context.Drivers.FindAsync(request.driverId);
            if (dbDriver == null)
                return BadRequest("Driver not found.");
            //dbTask.Id = request.Id;
            dbDriver.Name = request.Name;
            dbDriver.Country = request.Country;
            dbDriver.Flag = request.Flag;
            dbDriver.Number = request.Number;
            dbDriver.Lastname = request.Lastname;
            dbDriver.imageDriver = request.imageDriver;
            dbDriver.currentPrice = request.currentPrice;
            dbDriver.seasonChange = request.seasonChange;
            dbDriver.seasonStartPrice = request.seasonStartPrice;
            dbDriver.Age = request.Age;


            await _context.SaveChangesAsync();

            return Ok(dbDriver);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Driver>>> Delete(int id)
        {
            var dbDriver = await _context.Drivers.FindAsync(id);
            if (dbDriver == null)
                return BadRequest("Driver not found.");

            _context.Drivers.Remove(dbDriver);
            await _context.SaveChangesAsync();

            return Ok(await _context.Drivers.ToListAsync());
        }
    }
}