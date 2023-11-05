using System.ComponentModel.DataAnnotations;

namespace EmployeeManage.Models
{
    public class Department
    {
        [Key]
        public int deptId { get; set; }
        public string deptName { get; set; }

    }
}
