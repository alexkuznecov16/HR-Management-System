'use client';

import Error from '@/components/error';
import {useEffect, useState} from 'react';
import {getEmployees, deleteEmployee} from '@/services/api';
import type {Department, Employee} from '@/types';

const emptyEmployee: Employee = {
	id: undefined,
	name: '',
	surname: '',
	phone: '',
};

export default function AdminEmployees() {
	const [error, setError] = useState<string | null>(null);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [form, setForm] = useState<Employee>(emptyEmployee);
	const [isEditing, setIsEditing] = useState(false);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [sortOrders, setSortOrders] = useState({
		id: 'asc' as 'asc' | 'desc',
		departmentId: 'asc' as 'asc' | 'desc',
	});

	useEffect(() => {
		load();
		loadDepartments();
	}, []);

	async function load() {
		const data = await getEmployees();
		setEmployees(data);
	}

	async function loadDepartments() {
		const res = await fetch('http://localhost:8080/api/departments');
		const data = await res.json();
		setDepartments(data);
	}

	const handleSort = (key: 'id' | 'departmentId') => {
		const newDirection = sortOrders[key] === 'asc' ? 'desc' : 'asc';
		setSortOrders(prev => ({...prev, [key]: newDirection}));

		const sorted = [...employees].sort((a, b) => {
			const valA = a[key] ?? 0;
			const valB = b[key] ?? 0;
			return newDirection === 'asc' ? valA - valB : valB - valA;
		});

		setEmployees(sorted);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleEdit = (emp: Employee) => {
		setForm(emp);
		setIsEditing(true);
	};

	const resetForm = () => {
		setForm(emptyEmployee);
		setIsEditing(false);
	};

	async function handleDelete(id: number) {
		await deleteEmployee(id);
		setEmployees(prev => prev.filter(e => e.id !== id));
	}

	async function handleSubmit() {
		if (!form.name.trim() || !form.surname.trim() || !form.phone.trim() || !form.departmentId) {
			setError('Please fill all fields and select department');
			return;
		}
		if (isEditing && form.id) {
			// UPDATE
			await fetch(`http://localhost:8080/api/employees/${form.id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(form),
			});
		} else {
			// CREATE
			await fetch(`http://localhost:8080/api/employees`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(form),
			});
		}

		await load();
		resetForm();
	}

	return (
		<div>
			<Error message={error} onClose={() => setError(null)} />
			<h1>Employees</h1>

			{/* FORM */}
			<div style={{marginBottom: 20, padding: 16, background: '#111827'}}>
				<h3 style={{marginBottom: 10}}>{isEditing ? 'Edit employee' : 'Add employee'}</h3>

				<input name='name' placeholder='Name' value={form.name} onChange={handleChange} />

				<input name='surname' placeholder='Surname' value={form.surname} onChange={handleChange} />

				<input name='phone' placeholder='Phone' value={form.phone} onChange={handleChange} />

				{/* DEPARTMENT SELECT */}
				<select
					name='departmentId'
					value={form.departmentId || ''}
					onChange={e =>
						setForm(prev => ({
							...prev,
							departmentId: Number(e.target.value),
						}))
					}
				>
					<option value=''>Select department</option>

					{departments.map(dep => (
						<option key={dep.id} value={dep.id}>
							{dep.name}
						</option>
					))}
				</select>

				<div style={{marginTop: 10}}>
					<button onClick={handleSubmit}>{isEditing ? 'Update' : 'Create'}</button>

					{isEditing && <button onClick={resetForm}>Cancel</button>}
				</div>
			</div>

			{/* TABLE */}
			<table>
				<thead>
					<tr>
						<th onClick={() => handleSort('id')} style={{cursor: 'pointer', userSelect: 'none'}}>
							ID {sortOrders.id === 'asc' ? '↑' : '↓'}
						</th>
						<th>Employee</th>
						<th>Phone</th>
						<th onClick={() => handleSort('departmentId')} style={{cursor: 'pointer', userSelect: 'none'}}>
							Department {sortOrders.departmentId === 'asc' ? '↑' : '↓'}
						</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{employees.map(emp => {
						const dept = departments.find(d => d.id === emp.departmentId);

						return (
							<tr key={emp.id}>
								<td>{emp.id}</td>

								<td>
									{emp.name} {emp.surname}
								</td>

								<td>{emp.phone}</td>

								<td>{dept ? dept.name : '—'}</td>

								<td style={{display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap'}}>
									<button onClick={() => handleEdit(emp)}>Edit</button>
									<button onClick={() => handleDelete(emp.id!)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
