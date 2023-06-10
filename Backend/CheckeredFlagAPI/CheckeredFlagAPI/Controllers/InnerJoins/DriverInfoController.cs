using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
using CheckeredFlagAPI.Models.InnerJoinClasses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace CheckeredFlagAPI.Controllers.InnerJoins
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverInfoController : ControllerBase
    {
        private readonly DataContext _context;

        public DriverInfoController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("league/{leagueId}")]
        public ActionResult<List<DriverInfo>> GetAllDriverInfoByLeagueId(int leagueId)
        {
            //var _context = new UserRegistrationContext();
            var driverInfoList = (from d in _context.Drivers
                                  join t in _context.Teams on d.team equals t.teamId
                                  join s in _context.Stats on d.driverId equals s.DriverId
                                  join a in _context.Abilities on d.driverId equals a.driverId
                                  where leagueId.Equals(d.leagueId)
                                  select new DriverInfo()
                                  {
                                      //Driver
                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverAge = d.Age,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,
                                      DrivercurrentPrice = d.currentPrice,
                                      DriverseasonChange = d.seasonChange,
                                      DriverseasonStartPrice = d.seasonStartPrice,
                                      DriverLeagueId = d.leagueId,

                                      //Driver's Stats
                                      DriverPoints = s.Points,
                                      DriverPodiums = s.Podiums,
                                      DriverWins = s.Wins,
                                      DriverPoles = s.Poles,
                                      DriverFastestLaps = s.FastestLaps,
                                      DriverDnfs = s.Dnfs,
                                      DriverHighestGridPos = s.HighestGridPos,
                                      DriverbeatTeamMateRate = s.beatTeamMateRate,
                                      DriverHighestScoringTrack = s.HighestScoringTrack,

                                      //Driver's Team
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                      TeamDirector = t.director,
                                      TeamCountry = t.country,
                                      TeamFlag = t.flag,

                                      //Driver's Abilities
                                      overtaking = a.overtaking,
                                      defending = a.defending,
                                      tireManagement = a.tireManagement,
                                      consistency = a.consistency,
                                      pace = a.pace,
                                      experience = a.experience,
                                      overall = a.overall



                                  }).ToList();
            return driverInfoList;
        }



        [HttpGet("points/{leagueId}")]
        public ActionResult<List<DriverInfo>> GetAllDriverInfoByLeagueIdOrderedByPoints(int leagueId)
        {
            //var _context = new UserRegistrationContext();
            var driverInfoList = (from d in _context.Drivers
                                  join t in _context.Teams on d.team equals t.teamId
                                  join s in _context.Stats on d.driverId equals s.DriverId
                                  join a in _context.Abilities on d.driverId equals a.driverId
                                  where leagueId.Equals(d.leagueId)
                                  orderby s.Points descending
                                  select new DriverInfo()
                                  {
                                      //Driver
                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverAge = d.Age,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,
                                      DrivercurrentPrice = d.currentPrice,
                                      DriverseasonChange = d.seasonChange,
                                      DriverseasonStartPrice = d.seasonStartPrice,
                                      DriverLeagueId = d.leagueId,

                                      //Driver's Stats
                                      DriverPoints = s.Points,
                                      DriverPodiums = s.Podiums,
                                      DriverWins = s.Wins,
                                      DriverPoles = s.Poles,
                                      DriverFastestLaps = s.FastestLaps,
                                      DriverDnfs = s.Dnfs,
                                      DriverHighestGridPos = s.HighestGridPos,
                                      DriverbeatTeamMateRate = s.beatTeamMateRate,
                                      DriverHighestScoringTrack = s.HighestScoringTrack,

                                      //Driver's Team
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                      TeamDirector = t.director,
                                      TeamCountry = t.country,
                                      TeamFlag = t.flag,

                                      //Driver's Abilities
                                      overtaking = a.overtaking,
                                      defending = a.defending,
                                      tireManagement = a.tireManagement,
                                      consistency = a.consistency,
                                      pace = a.pace,
                                      experience = a.experience,
                                      overall = a.overall



                                  }).ToList();
            return driverInfoList;
        }


        [HttpGet("rating/{leagueId}")]
        public ActionResult<List<DriverInfo>> GetAllDriverInfoByLeagueIdOrderedByOverall(int leagueId)
        {
            //var _context = new UserRegistrationContext();
            var driverInfoList = (from d in _context.Drivers
                                  join t in _context.Teams on d.team equals t.teamId
                                  join s in _context.Stats on d.driverId equals s.DriverId
                                  join a in _context.Abilities on d.driverId equals a.driverId
                                  where leagueId.Equals(d.leagueId)
                                  orderby a.overall descending
                                  select new DriverInfo()
                                  {
                                      //Driver
                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverAge = d.Age,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,
                                      DrivercurrentPrice = d.currentPrice,
                                      DriverseasonChange = d.seasonChange,
                                      DriverseasonStartPrice = d.seasonStartPrice,
                                      DriverLeagueId = d.leagueId,

                                      //Driver's Stats
                                      DriverPoints = s.Points,
                                      DriverPodiums = s.Podiums,
                                      DriverWins = s.Wins,
                                      DriverPoles = s.Poles,
                                      DriverFastestLaps = s.FastestLaps,
                                      DriverDnfs = s.Dnfs,
                                      DriverHighestGridPos = s.HighestGridPos,
                                      DriverbeatTeamMateRate = s.beatTeamMateRate,
                                      DriverHighestScoringTrack = s.HighestScoringTrack,

                                      //Driver's Team
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                      TeamDirector = t.director,
                                      TeamCountry = t.country,
                                      TeamFlag = t.flag,

                                      //Driver's Abilities
                                      overtaking = a.overtaking,
                                      defending = a.defending,
                                      tireManagement = a.tireManagement,
                                      consistency = a.consistency,
                                      pace = a.pace,
                                      experience = a.experience,
                                      overall = a.overall



                                  }).ToList();
            return driverInfoList;
        }


        [HttpGet("price/{leagueId}")]
        public ActionResult<List<DriverInfo>> GetAllDriverInfoByLeagueIdOrderedByPrice(int leagueId)
        {
            //var _context = new UserRegistrationContext();
            var driverInfoList = (from d in _context.Drivers
                                  join t in _context.Teams on d.team equals t.teamId
                                  join s in _context.Stats on d.driverId equals s.DriverId
                                  join a in _context.Abilities on d.driverId equals a.driverId
                                  where leagueId.Equals(d.leagueId)
                                  orderby d.currentPrice descending
                                  select new DriverInfo()
                                  {
                                      //Driver
                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverAge = d.Age,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,
                                      DrivercurrentPrice = d.currentPrice,
                                      DriverseasonChange = d.seasonChange,
                                      DriverseasonStartPrice = d.seasonStartPrice,
                                      DriverLeagueId = d.leagueId,

                                      //Driver's Stats
                                      DriverPoints = s.Points,
                                      DriverPodiums = s.Podiums,
                                      DriverWins = s.Wins,
                                      DriverPoles = s.Poles,
                                      DriverFastestLaps = s.FastestLaps,
                                      DriverDnfs = s.Dnfs,
                                      DriverHighestGridPos = s.HighestGridPos,
                                      DriverbeatTeamMateRate = s.beatTeamMateRate,
                                      DriverHighestScoringTrack = s.HighestScoringTrack,

                                      //Driver's Team
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                      TeamDirector = t.director,
                                      TeamCountry = t.country,
                                      TeamFlag = t.flag,

                                      //Driver's Abilities
                                      overtaking = a.overtaking,
                                      defending = a.defending,
                                      tireManagement = a.tireManagement,
                                      consistency = a.consistency,
                                      pace = a.pace,
                                      experience = a.experience,
                                      overall = a.overall



                                  }).ToList();
            return driverInfoList;
        }

        [HttpGet]
              public ActionResult<List<DriverInfo>> GetAllDriverInfo()
              {
                  //var _context = new UserRegistrationContext();
                  var driverInfoList = (from d in _context.Drivers
                                        join t in _context.Teams on d.team equals t.teamId
                                        join s in _context.Stats on d.driverId equals s.DriverId
                                        join a in _context.Abilities on d.driverId equals a.driverId
                                        orderby s.Points descending
                                        select new DriverInfo()
                                        {
                                            //Driver
                                            DriverId = d.driverId,
                                            DriverName = d.Name,
                                            DriverLastName = d.Lastname,
                                            DriverCountry = d.Country,
                                            DriverAge = d.Age,
                                            DriverFlag = d.Flag,
                                            DriverNumber = d.Number,
                                            DriverImageDriver = d.imageDriver,
                                            DrivercurrentPrice = d.currentPrice,
                                            DriverseasonChange = d.seasonChange,
                                            DriverseasonStartPrice = d.seasonStartPrice,
                                            DriverLeagueId = d.leagueId,

                                            //Driver's Stats
                                            DriverPoints = s.Points,
                                            DriverPodiums = s.Podiums,
                                            DriverWins = s.Wins,
                                            DriverPoles=s.Poles,
                                            DriverFastestLaps=s.FastestLaps,
                                            DriverDnfs=s.Dnfs,
                                            DriverHighestGridPos=s.HighestGridPos,
                                            DriverbeatTeamMateRate=s.beatTeamMateRate,
                                            DriverHighestScoringTrack=s.HighestScoringTrack,

                                            //Driver's Team
                                            TeamColor = t.color,
                                            TeamName = t.name,
                                            TeamShieldImage = t.shieldImage,
                                            TeamVehicleImage = t.vehicleImage,
                                            TeamDirector = t.director,
                                            TeamCountry = t.country,
                                            TeamFlag = t.flag,

                                            //Driver's Abilities
                                            overtaking = a.overtaking,
                                            defending = a.defending,
                                            tireManagement = a.tireManagement,
                                            consistency = a.consistency,
                                            pace = a.pace,
                                            experience = a.experience,
                                            overall = a.overall



                                        }).ToList();
                  return driverInfoList;
              }

        [HttpGet("{leagueId}/{driverId}")]
        public ActionResult<DriverInfo> GetAllDriverInfoByDriverId(int leagueId,int driverId)
        {
            var league = _context.Ligas.Find(leagueId);

            
            if (league == null)
            {
                return NotFound("Liga not found.");
            }


            /*
            if (Driver?.leagueId == null || Driver.leagueId != league.Id)
            {
                return Unauthorized("Access denied."); // Devuelve un error de autorización si el director no tiene permiso para acceder a la liga
            }*/
            var driver = _context.Drivers.FirstOrDefault(d => d.driverId == driverId);

            if (driver == null)
            {
                return NotFound("Driver not found."); // Devuelve un error 404 si el conductor no se encuentra
            }


            var driverInfo = (from d in _context.Drivers
                                  join t in _context.Teams on d.team equals t.teamId
                                  join s in _context.Stats on d.driverId equals s.DriverId
                                  join a in _context.Abilities on d.driverId equals a.driverId
                                  where driverId.Equals(d.driverId)
                                  select new DriverInfo()
                                  {
                                      //Driver
                                      DriverId = d.driverId,
                                      DriverName = d.Name,
                                      DriverLastName = d.Lastname,
                                      DriverCountry = d.Country,
                                      DriverAge = d.Age,
                                      DriverFlag = d.Flag,
                                      DriverNumber = d.Number,
                                      DriverImageDriver = d.imageDriver,
                                      DrivercurrentPrice = d.currentPrice,
                                      DriverseasonChange = d.seasonChange,
                                      DriverseasonStartPrice = d.seasonStartPrice,
                                      DriverLeagueId = d.leagueId,

                                      //Driver's Stats
                                      DriverPoints = s.Points,
                                      DriverPodiums = s.Podiums,
                                      DriverWins = s.Wins,
                                      DriverPoles = s.Poles,
                                      DriverFastestLaps = s.FastestLaps,
                                      DriverDnfs = s.Dnfs,
                                      DriverHighestGridPos = s.HighestGridPos,
                                      DriverbeatTeamMateRate = s.beatTeamMateRate,
                                      DriverHighestScoringTrack = s.HighestScoringTrack,

                                      //Driver's Team
                                      TeamColor = t.color,
                                      TeamName = t.name,
                                      TeamShieldImage = t.shieldImage,
                                      TeamVehicleImage = t.vehicleImage,
                                      TeamDirector = t.director,
                                      TeamCountry = t.country,
                                      TeamFlag = t.flag,

                                      //Driver's Abilities
                                      overtaking = a.overtaking,
                                      defending = a.defending,
                                      tireManagement = a.tireManagement,
                                      consistency = a.consistency,
                                      pace = a.pace,
                                      experience = a.experience,
                                      overall = a.overall



                                  }).FirstOrDefault();
                return Ok(driverInfo);
           
        }
    }
}
