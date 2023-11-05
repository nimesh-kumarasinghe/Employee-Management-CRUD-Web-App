using EmployeeManage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly AllDbContext _allDbContext;

        public DepartmentController(AllDbContext allDbContext)
        {
            this._allDbContext = allDbContext;
        }

        [HttpGet]
        [Route("GetDepartment")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            if (_allDbContext.Department == null)
            {
                return NotFound();
            }
            return await _allDbContext.Department.ToListAsync();
        }

        [HttpGet]
        [Route("GetDepartment/{deptId}")]
        public async Task<ActionResult<Department>> GetDepartmentById(int deptId)
        {
            if (_allDbContext.Department == null)
            {
                return NotFound();
            }
            var department = await _allDbContext.Department.FindAsync(deptId);
            if (department == null)
            {
                return NotFound();
            }
            return department;
        }

        [HttpPost]
        [Route("AddDepartment")]
        public async Task<Department> AddDepartment(Department department)
        {
            _allDbContext.Department.Add(department);
            await _allDbContext.SaveChangesAsync();
            return department;
        }

        [HttpPut]
        [Route("UpdateDepartment/{deptId}")]
        public async Task<Department> UpdateDepartment(Department department)
        {
            _allDbContext.Entry(department).State = EntityState.Modified;
            await _allDbContext.SaveChangesAsync();
            return department;
        }

        [HttpDelete]
        [Route("DeleteDepartment/{deptId}")]
        public async Task<ActionResult> DeleteDepartment(int deptId)
        {
            if (_allDbContext.Department == null)
            {
                return NotFound();
            }
            var department = await _allDbContext.Department.FindAsync(deptId);
            if (department == null)
            {
                return NotFound();
            }
            _allDbContext.Department.Remove(department);
            await _allDbContext.SaveChangesAsync();
            return Ok();
        }

    }
}
