using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models.InnerJoinClasses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
