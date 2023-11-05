using EmployeeManage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AllDbContext _allDbContext;

        public EmployeeController(AllDbContext allDbContext)
        {
            this._allDbContext = allDbContext;
        }
        [HttpGet]
        [Route("GetEmployee")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if(_allDbContext.Employee == null)
            {
                return NotFound();
            }
            return await _allDbContext.Employee.ToListAsync();
        }

        [HttpGet]
        [Route("GetEmployee/{id}")]
        public async Task<ActionResult<Employee>> GetEmployeesById(int id)
        {
            if (_allDbContext.Employee == null)
            {
                return NotFound();
            }
            var employee = await _allDbContext.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }

        [HttpPost]
        [Route("AddEmployee")]
        public async Task<Employee> AddEmployee(Employee objEmployee)
        {
           _allDbContext.Employee.Add(objEmployee);
            await _allDbContext.SaveChangesAsync();
            return objEmployee;
        }

        [HttpPut]
        [Route("UpdateEmployee/{id}")]
        public async Task<Employee> UpdateEmployee(Employee objEmployee)
        {
            _allDbContext.Entry(objEmployee).State = EntityState.Modified;
            await _allDbContext.SaveChangesAsync();
            return objEmployee;
        }

        [HttpDelete]
        [Route("DeleteEmployee/{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        { 
           if(_allDbContext.Employee == null)
            {
                return NotFound();
            }
           var employee = await _allDbContext.Employee.FindAsync(id);
            if(employee == null) 
            { 
                return NotFound();
            }
            _allDbContext.Employee.Remove(employee);
            await _allDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
