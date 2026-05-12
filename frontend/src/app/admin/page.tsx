'use client';

import {useEffect, useState} from 'react';
import {getDepartments} from '@/services/api';
import type {Department} from '@/types';

export default function AdminPage() {
	const [departments, setDepartments] = useState<Department[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getDepartments();
				setDepartments(data);
			} catch (error) {
				console.error('Failed to fetch stats:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	const totalEmployees = departments.reduce((acc, dep) => acc + (dep.employees?.length || 0), 0);
	const totalDepartments = departments.length;

	return (
		<div className='admin-dashboard'>
			<header className='admin-dashboard__header'>
				<h1 className='admin-dashboard__title'>Admin Dashboard</h1>
				<p className='admin-dashboard__subtitle'>Welcome to HR System Admin Panel</p>
			</header>

			<div className='admin-dashboard__stats'>
				{/* Карточка сотрудников */}
				<div className='stat-card'>
					<div className='stat-card__info'>
						<span className='stat-card__label'>Total Employees</span>
						<h2 className='stat-card__value'>{loading ? '...' : totalEmployees}</h2>
					</div>
					<div className='stat-card__icon'>👥</div>
				</div>

				{/* Карточка департаментов */}
				<div className='stat-card'>
					<div className='stat-card__info'>
						<span className='stat-card__label'>Departments</span>
						<h2 className='stat-card__value'>{loading ? '...' : totalDepartments}</h2>
					</div>
					<div className='stat-card__icon'>🏢</div>
				</div>

				{/* Статус системы */}
				<div className='stat-card'>
					<div className='stat-card__info'>
						<span className='stat-card__label'>System Status</span>
						<h2 className='stat-card__value' style={{color: '#10b981'}}>
							Active
						</h2>
					</div>
					<div className='stat-card__icon'>⚡</div>
				</div>
			</div>
		</div>
	);
}
