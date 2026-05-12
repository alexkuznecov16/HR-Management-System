package org.companyX.hrsystem.repository;

import org.companyX.hrsystem.model.Employee;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class EmployeeRepository {
    private final List<Employee> employees = new ArrayList<>();
    private long nextId = 1;

    public EmployeeRepository() {
        addEmployee(new Employee(1L, "Nikita", "Ivanov", "+371111111"));
        addEmployee(new Employee(2L, "Anna", "Petrova", "+371222222"));
        addEmployee(new Employee(3L, "Oleg", "Sidorov", "+371333333"));
        addEmployee(new Employee(4L, "Maria", "Smirnova", "+371444444"));
        addEmployee(new Employee(4L, "Ivan", "Kuznetsov", "+371555555"));
        addEmployee(new Employee(5L, "Elena", "Popova", "+371666666"));
        addEmployee(new Employee(4L, "Sergey", "Volkov", "+371777777"));
        addEmployee(new Employee(2L, "Olga", "Morozova", "+371888888"));
        addEmployee(new Employee(6L, "Dmitry", "Lebedev", "+371999999"));
        addEmployee(new Employee(1L, "Irina", "Sokolova", "+371000000"));
    }

    // GET ALL
    public List<Employee> getEmployees() {
        return employees;
    }

    // GET BY ID
    public Optional<Employee> getById(Long id) {
        return employees.stream().filter(employee -> employee.getId().equals(id)).findFirst();
    }

    // ADD
    public Employee addEmployee(Employee employee) {
        employee.setId(nextId++);
        employees.add(employee);
        return employee;
    }

    // DELETE
    public void deleteEmployeeById(Long id) {
        employees.removeIf(employee -> employee.getId().equals(id));
    }

    // UPDATE
    public void updateEmployee(Employee updatedEmployee) {
        for (int i = 0; i < employees.size(); i++) {
            if (employees.get(i).getId().equals(updatedEmployee.getId())) {
                employees.set(i, updatedEmployee);
                return;
            }
        }
    }
}
