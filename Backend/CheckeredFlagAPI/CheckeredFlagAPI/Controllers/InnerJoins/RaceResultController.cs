﻿using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Models;
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
    }
}