import type {Employee, Department} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080/api';

// ========================= EMPLOYEES =========================

// GET ALL EMPLOYEES
export async function getEmployees(): Promise<Employee[]> {
	const res = await fetch(`${BASE_URL}/employees`);

	if (!res.ok) throw new Error('Failed to fetch employees');

	return res.json();
}

// GET EMPLOYEE BY ID
export async function getEmployeeById(id: number): Promise<Employee> {
	const res = await fetch(`${BASE_URL}/employees/${id}`);

	if (!res.ok) throw new Error('Failed to fetch employee');

	return res.json();
}

// ADD EMPLOYEE
export async function addEmployee(employee: Employee): Promise<Employee> {
	const res = await fetch(`${BASE_URL}/employees`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(employee),
	});

	if (!res.ok) throw new Error('Failed to add employee');

	return res.json();
}

// UPDATE EMPLOYEE
export async function updateEmployee(id: number, employee: Employee): Promise<Employee> {
	const res = await fetch(`${BASE_URL}/employees/${id}`, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(employee),
	});

	if (!res.ok) throw new Error('Failed to update employee');

	return res.json();
}

// DELETE EMPLOYEE
export async function deleteEmployee(id: number): Promise<void> {
	if (!confirm('Are you sure?')) return;
	const res = await fetch(`${BASE_URL}/employees/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) throw new Error('Failed to delete employee');
}

// ASSIGN DEPARTMENT
export async function assignDepartment(employeeId: number, departmentId: number): Promise<void> {
	const res = await fetch(`${BASE_URL}/employees/${employeeId}/department/${departmentId}`, {
		method: 'POST',
	});

	if (!res.ok) throw new Error('Failed to assign department');
}

// ========================= DEPARTMENTS =========================

// GET ALL DEPARTMENTS
export async function getDepartments(): Promise<Department[]> {
	const res = await fetch(`${BASE_URL}/departments`);

	if (!res.ok) throw new Error('Failed to fetch departments');

	return res.json();
}

// GET DEPARTMENT BY ID
export async function getDepartmentById(id: number): Promise<Department> {
	const res = await fetch(`${BASE_URL}/departments/${id}`);

	if (!res.ok) throw new Error('Failed to fetch department');

	return res.json();
}

// ADD DEPARTMENT
export async function addDepartment(department: Department): Promise<Department> {
	const res = await fetch(`${BASE_URL}/departments`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(department),
	});

	if (!res.ok) throw new Error('Failed to add department');

	return res.json();
}

// DELETE DEPARTMENT
export async function deleteDepartment(id: number): Promise<void> {
	if (!confirm('Are you sure?')) return;
	const res = await fetch(`${BASE_URL}/departments/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) throw new Error('Failed to delete department');
}

// UPDATE DEPARTMENT
export async function updateDepartment(id: number, departmentData: Partial<Department>): Promise<Department> {
	const res = await fetch(`${BASE_URL}/departments/${id}`, {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(departmentData),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		throw new Error(errorData.message || 'Failed to update department');
	}

	return res.json();
}
