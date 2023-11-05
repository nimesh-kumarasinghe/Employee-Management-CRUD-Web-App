using Microsoft.EntityFrameworkCore;

namespace EmployeeManage.Models
{
    public class AllDbContext : DbContext
    {
        public AllDbContext(DbContextOptions<AllDbContext> options) : base(options)
        { 
        }

        public DbSet<Employee> Employee { get; set;}
        public DbSet<Department> Department { get; set;}

    }
}
