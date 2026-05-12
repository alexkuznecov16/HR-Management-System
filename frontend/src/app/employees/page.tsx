'use client';

import {useEffect, useState} from 'react';
import '@/styles/employees.scss';
import {Employee, Department} from '@/types';
import {getEmployees, getDepartments} from '@/services/api';

export default function EmployeesPage() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [empData, depData] = await Promise.all([getEmployees(), getDepartments()]);

				setEmployees(empData);
				setDepartments(depData);
			} catch (e) {
				console.error('API error:', e);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	const grouped = departments.map(dep => ({
		...dep,
		employees: employees.filter(emp => emp.departmentId === dep.id),
	}));

	if (loading) return <div className='employees'>Loading...</div>;

	return (
		<div className='employees'>
			<h1 className='employees__title'>Employees Overview</h1>

			{grouped.map(dep => (
				<section key={dep.id} className='employees__department'>
					<div className='employees__departmentHeader'>
						<h2>{dep.name}</h2>
						<span>{dep.employees.length} employees</span>
					</div>

					<table className='employees__table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Surname</th>
								<th>Phone</th>
							</tr>
						</thead>

						<tbody>
							{dep.employees.length === 0 ? (
								<tr>
									<td colSpan={4}>No employees</td>
								</tr>
							) : (
								dep.employees.map(emp => (
									<tr key={emp.id}>
										<td>{emp.id}</td>
										<td>{emp.name}</td>
										<td>{emp.surname}</td>
										<td>{emp.phone}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</section>
			))}
		</div>
	);
}
