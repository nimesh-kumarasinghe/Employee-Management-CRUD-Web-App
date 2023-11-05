using System.ComponentModel.DataAnnotations;

namespace EmployeeManage.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public DateTime dob { get; set; }
        public int age { get; set; }
        public float salary { get; set; }
        public int deptId { get; set; }
    }
}
