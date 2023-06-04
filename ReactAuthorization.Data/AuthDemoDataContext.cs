using Microsoft.EntityFrameworkCore;

namespace ReactAuthorization.Data
{
    public class AuthDemoDataContext : DbContext
        {
            private readonly string _connectionString;

            public AuthDemoDataContext(string connectionString)
            {
                _connectionString = connectionString;
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }

            public DbSet<BookMark> BookMarks { get; set; }
            public DbSet<User> Users { get; set; }
            public DbSet<UrlEntry> UrlEntries { get; set; }
    }
}

