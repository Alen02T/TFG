using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {

        private readonly DataContext _context;

        public ResultController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Result>>> GetResults()
        {
            return Ok(await _context.Results.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> Get(int id)
        {
            var Result = await _context.Results.FindAsync(id);
            if (Result == null)
                return BadRequest("Result not found.");
            return Ok(Result);
        }

        [HttpGet("race/{raceId}")]
        public async Task<ActionResult<List<Result>>> GetRace(int raceId)
        {
            var results = await _context.Results
                .Where(c => c.raceId == raceId)
                .ToListAsync();

            return results;
        }

        /*
        [HttpPost]
        public async Task<ActionResult<List<Result>>> AddResult(Result Result)
        {
            _context.Results.Add(Result);
            await _context.SaveChangesAsync();

            return Ok(await _context.Results.ToListAsync());
        }*/

        //Solo añade 
        [HttpPost]
        public async Task<ActionResult<Result>> AddResult(Result result)
        {
            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<ActionResult<List<Result>>> UpdateResult(Result request)
        {
            var dbResult = await _context.Results.FindAsync(request.resultId);
            if (dbResult == null)
                return BadRequest("Result not found.");

            dbResult.raceId = request.raceId;
            dbResult.driverId = request.driverId;
            dbResult.teamId = request.teamId;
            dbResult.grid = request.grid;
            dbResult.position = request.position;
            dbResult.points = request.points;


            await _context.SaveChangesAsync();

            return Ok(await _context.Results.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Result>>> Delete(int id)
        {
            var dbResult = await _context.Results.FindAsync(id);
            if (dbResult == null)
                return BadRequest("Result not found.");

            _context.Results.Remove(dbResult);
            await _context.SaveChangesAsync();

            return Ok(await _context.Results.ToListAsync());
        }
    }
}
