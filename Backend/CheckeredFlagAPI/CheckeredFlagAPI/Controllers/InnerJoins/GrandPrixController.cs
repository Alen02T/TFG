using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers.InnerJoins
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrandPrixController : ControllerBase
    {
        private readonly DataContext _context;

        public GrandPrixController(DataContext context)
        {
            _context = context;

        }


        // List<Circuit> circuit= new List<Circuit>();
        //List<Race> race = new List<Race>();

        // api/GrandPrix/GetGrandPrix
        [HttpGet]
        public ActionResult<List<GrandPrix>> GetAllGrandPrix()
        {
            //var _context = new UserRegistrationContext();
            var grandprixList = (from r in _context.Races
                                 join c in _context.Circuits on r.Circuit equals c.circuitId
                                 join s in _context.Sponsors on r.Sponsor equals s.sponsorId

                                 select new GrandPrix()
                                 {
                                     RaceId = r.Id,
                                     leagueId = r.leagueId,
                                     CircuitId = c.circuitId,
                                     CircuitName = c.name,
                                     CircuitCountry = c.country,
                                     CircuitFlag = c.flag,
                                     CircuitImageMap = c.imageMap,
                                     CircuitLaps = c.laps,
                                     CircuitImage = c.imageCircuit,
                                     CircuitdriverRecord = c.driverRecord,
                                     CircuitlapRecord = c.lapRecord,
                                     Circuitlength = c.length,

                                     RaceYear = r.year,
                                     RaceRound = r.round,
                                     RaceName = r.name,
                                     RaceDate = r.date,

                                     SponsorName = s.Name,
                                     SponsorLink = s.Link,

                                 }).ToList();
            return grandprixList;
        }



        [HttpGet("round/{roundId}")]
        public ActionResult<GrandPrix> GetGrandPrixByRoundNumber(int roundId)
        {
            //var _context = new UserRegistrationContext();
            var grandprixList = (from r in _context.Races
                                 join c in _context.Circuits on r.Circuit equals c.circuitId
                                 join s in _context.Sponsors on r.Sponsor equals s.sponsorId
                                 where r.round == roundId
                                 select new GrandPrix()
                                 {
                                     RaceId = r.Id,
                                     CircuitId = c.circuitId,
                                     CircuitName = c.name,
                                     CircuitCountry = c.country,
                                     CircuitFlag = c.flag,
                                     CircuitImageMap = c.imageMap,
                                     CircuitLaps = c.laps,
                                     CircuitImage = c.imageCircuit,
                                     CircuitdriverRecord = c.driverRecord,
                                     CircuitlapRecord = c.lapRecord,
                                     Circuitlength = c.length,

                                     RaceYear = r.year,
                                     RaceRound = r.round,
                                     RaceName = r.name,
                                     RaceDate = r.date,
                                     leagueId = r.leagueId,

                                     SponsorName = s.Name,
                                     SponsorLink = s.Link,



                                 }).FirstOrDefault();
            return Ok(grandprixList);
        }





        [HttpGet("league/{leagueId}")]
        public ActionResult<List<GrandPrix>> GetAllGrandPrixByLeagueOrderedByRound(int leagueId)
        {
            //var _context = new UserRegistrationContext();
            var grandprixList = (from r in _context.Races
                                 join c in _context.Circuits on r.Circuit equals c.circuitId
                                 join s in _context.Sponsors on r.Sponsor equals s.sponsorId
                                 where r.leagueId.Equals(leagueId)
                                 orderby r.round
                                 select new GrandPrix()
                                 {
                                     RaceId = r.Id,
                                     leagueId = r.leagueId,
                                     CircuitId = c.circuitId,
                                     CircuitName = c.name,
                                     CircuitCountry = c.country,
                                     CircuitFlag = c.flag,
                                     CircuitImageMap = c.imageMap,
                                     CircuitLaps = c.laps,
                                     CircuitImage = c.imageCircuit,
                                     CircuitdriverRecord = c.driverRecord,
                                     CircuitlapRecord = c.lapRecord,
                                     Circuitlength=c.length,

                                     RaceYear = r.year,
                                     RaceRound = r.round,
                                     RaceName = r.name,
                                     RaceDate = r.date,

                                     SponsorName = s.Name,
                                     SponsorLink = s.Link,

                                 }).ToList();
            return grandprixList;
        }
    }
}
