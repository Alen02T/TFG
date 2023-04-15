using CheckeredFlagAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Data
{
    public class DataContext:DbContext
    {
       
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<DirectorEntity> Directores { get; set; }
    }
}
