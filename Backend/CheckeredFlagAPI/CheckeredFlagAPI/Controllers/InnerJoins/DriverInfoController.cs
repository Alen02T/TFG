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

        /*


              [HttpGet]
              public ActionResult<List<DriverInfo>> GetAllDriverInfo()
              {
                  //var _context = new UserRegistrationContext();
                  var driverInfoList = (from d in _context.Drivers
                                        join t in _context.Teams on d.Team equals t.teamId
                                        join s in _context.Stats on d.driverId equals s.driver
                  orderby d.Points descending
                                        select new DriverInfo()
                                        {
                                            DriverId = d.driverId,

                                            DriverName = d.Name,
                                            DriverLastName = d.Lastname,
                                            DriverCountry = d.Country,
                                            DriverAge = d.Age,
                                            DriverFlag = d.Flag,
                                            DriverNumber = d.Number,
                                            DriverImageDriver = d.imageDriver,
                                            DriverPoints = d.Points,
                                            DriverPodiums = d.Podiums,


                                            TeamColor = t.color,
                                            TeamName = t.name,
                                            TeamShieldImage = t.shieldImage,
                                            TeamVehicleImage = t.vehicleImage,
                                            TeamDirector = t.director,
                                            TeamCountry = t.country,
                                            TeamFlag = t.flag,

                                            overtaking = s.overtaking,
                                            defending = s.defending,
                                            tireManagement = s.tireManagement,
                                            consistency = s.consistency,
                                            pace = s.pace,
                                            wetClimate = s.wetClimate,
                                            overall = s.overall



                                        }).ToList();
                  return driverInfoList;
              }*/
    }
}
