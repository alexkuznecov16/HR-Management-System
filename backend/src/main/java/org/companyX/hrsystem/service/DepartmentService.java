package org.companyX.hrsystem.service;

import org.companyX.hrsystem.model.Department;
import org.companyX.hrsystem.model.Employee;
import org.companyX.hrsystem.repository.DepartmentRepository;
import org.companyX.hrsystem.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Department> getDepartments() {
        populateDepartmentsWithEmployees();

        return departmentRepository.getDepartments();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.getDepartmentById(id);
    }

    public Department addDepartment(Department department) {
        departmentRepository.addDepartment(department);
        return department;
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteDepartmentById(id);
    }

    public List<Employee> getEmployeesFromDepartment(Long departmentId) {

        Optional<Department> department = departmentRepository.getDepartmentById(departmentId);

        if (department.isEmpty()) {
            return new ArrayList<>();
        }

        return department.get().getEmployees();
    }

    public Department updateDepartment(Long id, Department department) {
        departmentRepository.updateDepartment(id, department);
        return department;
    }

    public void populateDepartmentsWithEmployees() {

        for (Department department : departmentRepository.getDepartments()) {

            department.getEmployees().clear();

            for (Employee employee : employeeRepository.getEmployees()) {

                if (employee.getDepartmentId() != null && employee.getDepartmentId().equals(department.getId())) {
                    department.getEmployees().add(employee);
                }

            }

        }
    }
}
