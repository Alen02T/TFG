using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models.InnerJoinClasses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckeredFlagAPI.Controllers.InnerJoins
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceResultController : ControllerBase
    {
        private readonly DataContext _context;

        public RaceResultController(DataContext context)
        {
            _context = context;

        }


        // List<Circuit> circuit= new List<Circuit>();
        //List<Race> race = new List<Race>();

        // api/GrandPrix/GetGrandPrix
        [HttpGet]
        public ActionResult<List<RaceResult>> GetAllRaceResult()
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from r in _context.Results
                                  join d in _context.Drivers on r.driverId equals d.driverId
                                  join t in _context.Teams on r.teamId equals t.teamId
                                  join ra in _context.Races on r.raceId equals ra.Id
                                  join re in _context.Results on r.raceId equals re.resultId
                                  select new RaceResult()
                                  {
                                      ResultId = r.resultId,
                                      RaceId = r.raceId,

                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      ResultGrid = r.grid,
                                      ResultPosition = r.position,
                                      ResultPoints = r.points,
                                      ResultFastestLap=re.fastestLap,

                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }

        [HttpGet("GrandPrix/{raceId}")]
        public ActionResult<List<RaceResult>> GetAllRaceResultById(int raceId)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from r in _context.Results
                                  join d in _context.Drivers on r.driverId equals d.driverId
                                  join t in _context.Teams on r.teamId equals t.teamId
                                  join ra in _context.Races on r.raceId equals ra.Id
                                  where raceId.Equals(ra.Id)
                                  orderby r.position
                                  select new RaceResult()
                                  {
                                      ResultId = r.resultId,


                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      ResultGrid = r.grid,
                                      ResultPosition = r.position,
                                      ResultPoints = r.points,
                                      ResultFastestLap = r.fastestLap,

                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }



        [HttpGet("GrandPrix/round/{roundId}")]
        public ActionResult<List<RaceResult>> GetRaceResultsByRoundId(int roundId)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from r in _context.Results
                                  join d in _context.Drivers on r.driverId equals d.driverId
                                  join t in _context.Teams on r.teamId equals t.teamId
                                  join ra in _context.Races on r.raceId equals ra.Id
                                  where roundId.Equals(ra.round)
                                  orderby r.position
                                  select new RaceResult()
                                  {
                                      ResultId = r.resultId,


                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      ResultGrid = r.grid,
                                      ResultPosition = r.position,
                                      ResultPoints = r.points,
                                      ResultFastestLap = r.fastestLap,

                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }



        [HttpGet("{id}")]
        public ActionResult<RaceResult> GetRaceResultById(int id)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from r in _context.Results
                                  join d in _context.Drivers on r.driverId equals d.driverId
                                  join t in _context.Teams on r.teamId equals t.teamId
                                  join ra in _context.Races on r.raceId equals ra.Id
                                  select new RaceResult()
                                  {
                                      ResultId = r.resultId,
                                      RaceId = r.raceId,

                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      ResultGrid = r.grid,
                                      ResultPosition = r.position,
                                      ResultPoints = r.points,
                                      ResultFastestLap = r.fastestLap,
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,

                                  }).FirstOrDefault();
            return Ok(raceResultList);
        }

    }
}
