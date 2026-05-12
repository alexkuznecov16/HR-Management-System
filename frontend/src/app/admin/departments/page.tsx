'use client';

import {useEffect, useState} from 'react';
import {getDepartments, deleteDepartment} from '@/services/api';
import type {Department} from '@/types';
import Error from '@/components/error';

const emptyDepartment: Department = {
	id: undefined,
	name: '',
	employees: [],
};

export default function AdminEmployees() {
	const [error, setError] = useState<string | null>(null);
	const [form, setForm] = useState<Department>(emptyDepartment);
	const [isEditing, setIsEditing] = useState(false);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [sortOrders, setSortOrders] = useState({
		id: 'asc' as 'asc' | 'desc',
		employees: 'asc' as 'asc' | 'desc',
	});

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const data = await getDepartments();
		setDepartments(data);
	}

	const handleSort = (key: 'id' | 'employees') => {
		const newDirection = sortOrders[key] === 'asc' ? 'desc' : 'asc';
		setSortOrders(prev => ({...prev, [key]: newDirection}));

		const sorted = [...departments].sort((a, b) => {
			let valA, valB;

			if (key === 'employees') {
				valA = a.employees?.length ?? 0;
				valB = b.employees?.length ?? 0;
			} else {
				valA = a.id ?? 0;
				valB = b.id ?? 0;
			}

			if (newDirection === 'asc') return valA - valB;
			return valB - valA;
		});

		setDepartments(sorted);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleEdit = (dep: Department) => {
		setForm(dep);
		setIsEditing(true);
	};

	const resetForm = () => {
		setForm(emptyDepartment);
		setIsEditing(false);
	};

	async function handleDelete(id: number) {
		await deleteDepartment(id);
		setDepartments(prev => prev.filter(d => d.id !== id));
	}

	async function handleSubmit() {
		if (!form.name) {
			setError('Please fill all fields and select department');
			return;
		}

		const url = isEditing && form.id ? `http://localhost:8080/api/departments/${form.id}` : `http://localhost:8080/api/departments`;

		const method = isEditing ? 'PUT' : 'POST';

		await fetch(url, {
			method: method,
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(form),
		});

		await load();
		resetForm();
	}

	return (
		<div style={{color: 'white', padding: '20px'}}>
			<Error message={error} onClose={() => setError(null)} />
			<h1>Departments</h1>

			{/* FORM */}
			<div style={{marginBottom: 20, padding: 16, background: '#111827', borderRadius: '8px'}}>
				<h3 style={{marginBottom: 10}}>{isEditing ? 'Edit Department' : 'Add Department'}</h3>

				<input name='name' placeholder='Department Name' value={form.name} onChange={handleChange} style={{padding: '8px', borderRadius: '4px', border: '1px solid #374151', background: '#1f2937', color: 'white'}} />

				<div style={{marginTop: 10}}>
					<button onClick={handleSubmit} style={{marginRight: 8}}>
						{isEditing ? 'Update' : 'Create'}
					</button>
					{isEditing && <button onClick={resetForm}>Cancel</button>}
				</div>
			</div>

			{/* TABLE */}
			<table style={{width: '100%', borderCollapse: 'collapse'}}>
				<thead>
					<tr style={{textAlign: 'left', borderBottom: '1px solid #374151'}}>
						<th onClick={() => handleSort('id')} style={{cursor: 'pointer', userSelect: 'none'}}>
							ID {sortOrders.id === 'asc' ? '↑' : '↓'}
						</th>
						<th>Name</th>
						<th onClick={() => handleSort('employees')} style={{cursor: 'pointer', userSelect: 'none'}}>
							Employees Count {sortOrders.employees === 'asc' ? '↑' : '↓'}
						</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{departments.map(dep => (
						<tr key={dep.id} style={{borderBottom: '1px solid #1f2937'}}>
							<td>{dep.id}</td>
							<td>{dep.name}</td>
							{/* Количество берем напрямую из массива, который заполнил Java Service */}
							<td>{dep.employees ? dep.employees.length : 0}</td>
							<td style={{display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap'}}>
								<button onClick={() => handleEdit(dep)} style={{marginRight: 8}}>
									Edit
								</button>
								<button onClick={() => handleDelete(dep.id!)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
