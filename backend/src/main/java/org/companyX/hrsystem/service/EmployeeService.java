package org.companyX.hrsystem.service;

import org.companyX.hrsystem.model.Employee;
import org.companyX.hrsystem.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // GET ALL
    public List<Employee> getEmployees() {
        return employeeRepository.getEmployees();
    }

    // GET BY ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.getById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    // ADD
    public Employee addEmployee(Employee employee) {
        return employeeRepository.addEmployee(employee);
    }

    // DELETE
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployeeById(id);
    }

    // ASSIGN
    public void assignDepartment(Long employeeId, Long departmentId) {
        Employee employee = employeeRepository.getById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setDepartmentId(departmentId);
        employeeRepository.updateEmployee(employee);
    }

    // UPDATE
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee employee = employeeRepository.getById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(updatedEmployee.getName());
        employee.setSurname(updatedEmployee.getSurname());
        employee.setPhone(updatedEmployee.getPhone());
        employee.setDepartmentId(updatedEmployee.getDepartmentId());

        employeeRepository.updateEmployee(employee);
        return employee;
    }
}
