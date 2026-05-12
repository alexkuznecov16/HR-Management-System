package org.companyX.hrsystem.repository;

import org.companyX.hrsystem.model.Department;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class DepartmentRepository {
    private final List<Department> departments = new ArrayList<>();
    private long nextId = 1;

    public DepartmentRepository() {
        addDepartment(new Department("Managers"));
        addDepartment(new Department("Designers"));
        addDepartment((new Department("Analyst")));
        addDepartment(new Department("Developers"));
        addDepartment(new Department("Testers"));
        addDepartment(new Department("Production"));
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departments.stream().filter(department -> department.getId().equals(id)).findFirst();
    }

    public void addDepartment(Department department) {
        department.setId(nextId++);
        departments.add(department);
    }

    public void deleteDepartmentById(Long id) {
        departments.removeIf(department -> department.getId().equals(id));
    }

    public void updateDepartment(Long id, Department updatedDepartment) {
        getDepartmentById(id).ifPresent(existingDept -> {
            existingDept.setName(updatedDepartment.getName());
        });
    }
}
