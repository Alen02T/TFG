using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models.InnerJoinClasses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Controllers.InnerJoins
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualyResultController : ControllerBase
    {
        private readonly DataContext _context;
        public QualyResultController(DataContext context)
        {
            _context = context;

        }


        // api/GrandPrix/GetGrandPrix
        [HttpGet]
        public ActionResult<List<QualyResult>> GetAllQualyResult()
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from q in _context.Qualys
                                  join d in _context.Drivers on q.DriverId equals d.driverId
                                  join t in _context.Teams on q.TeamId equals t.teamId
                                  join ra in _context.Races on q.RaceId equals ra.Id
                                  select new QualyResult()
                                  {
                                      QualyId = q.Id,

                                      DriverId =d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      QualyGrid = q.Grid,
                                      QualyFastestLap = q.FastestLap,
                                      QualyTime = q.Time,

                                      TeamId = t.teamId,
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }


        
        [HttpGet("race/{raceId}")]
        public ActionResult<List<QualyResult>> GetAllQualyResultById(int raceId)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from q in _context.Qualys
                                  join d in _context.Drivers on q.DriverId equals d.driverId
                                  join t in _context.Teams on q.TeamId equals t.teamId
                                  join ra in _context.Races on q.RaceId equals ra.Id
                                  where raceId.Equals(ra.Id)
                                  orderby q.Grid
                                  select new QualyResult()
                                  {
                                      QualyId = q.Id,

                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      QualyGrid = q.Grid,
                                      QualyFastestLap = q.FastestLap,
                                      QualyTime = q.Time,

                                      TeamId = t.teamId,
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }

        
        [HttpGet("round/{raceRound}")]
        public ActionResult<List<QualyResult>> GetAllQualyRaceRoundById(int raceRound)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from q in _context.Qualys
                                  join d in _context.Drivers on q.DriverId equals d.driverId
                                  join t in _context.Teams on q.TeamId equals t.teamId
                                  join ra in _context.Races on q.RaceId equals ra.Id
                                  where raceRound.Equals(ra.round)
                                  orderby q.Grid
                                  select new QualyResult()
                                  {
                                      QualyId = q.Id,

                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      QualyGrid = q.Grid,
                                      QualyFastestLap = q.FastestLap,
                                      QualyTime = q.Time,

                                      TeamId = t.teamId,
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                  }).ToList();
            return raceResultList;
        }
        

        [HttpGet("{id}")]
        public ActionResult<QualyResult> GetQualyResultById(int id)
        {
            //var _context = new UserRegistrationContext();
            var raceResultList = (from q in _context.Qualys
                                  join d in _context.Drivers on q.DriverId equals d.driverId
                                  join t in _context.Teams on q.TeamId equals t.teamId
                                  join ra in _context.Races on q.RaceId equals ra.Id
                                  select new QualyResult()
                                  {
                                      QualyId = q.Id,

                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,

                                      RaceId = ra.Id,
                                      RaceYear = ra.year,
                                      RaceRound = ra.round,

                                      QualyGrid = q.Grid,
                                      QualyFastestLap = q.FastestLap,
                                      QualyTime = q.Time,

                                      TeamId = t.teamId,
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,

                                  }).FirstOrDefault();
            return Ok(raceResultList);
        }




    }
}

