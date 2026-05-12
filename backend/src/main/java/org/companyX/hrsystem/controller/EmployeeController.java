package org.companyX.hrsystem.controller;

import org.companyX.hrsystem.model.Employee;
import org.companyX.hrsystem.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // ADD EMPLOYEE =================================================
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    // REMOVE EMPLOYEE =================================================
    @DeleteMapping("/{id}")
    public void removeEmployeeById(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
    }

    // GET EMPLOYEES =================================================
    @GetMapping
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    // GET EMPLOYEE =================================================
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // ASSIGN DEPARTMENT
    @PostMapping("/{employeeId}/department/{departmentId}")
    public void assignDepartment(@PathVariable Long employeeId, @PathVariable Long departmentId) {
        employeeService.assignDepartment(employeeId, departmentId);
    }

    // UPDATE EMPLOYEE
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }
}