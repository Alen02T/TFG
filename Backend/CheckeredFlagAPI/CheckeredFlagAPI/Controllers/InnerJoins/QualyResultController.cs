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


  

       



      

    }
}

