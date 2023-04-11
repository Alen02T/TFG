

using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Data
{
    public class DataContext : IdentityDbContext
    {


        

        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Team> Teams => Set<Team>();

    }
}