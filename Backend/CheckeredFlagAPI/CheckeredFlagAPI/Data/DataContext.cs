using CheckeredFlagAPI.Entity;
using CheckeredFlagAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Data
{
    public class DataContext:IdentityDbContext
    {
       
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<DirectorEntity> Directores { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<Stat> Stats { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Circuit> Circuits { get; set; }

        public DbSet<Race> Races { get; set; }
    }
}
