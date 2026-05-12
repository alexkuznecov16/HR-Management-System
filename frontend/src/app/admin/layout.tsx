import Link from 'next/link';
import '@/styles/admin.scss';

export default function AdminLayout({children}: {children: React.ReactNode}) {
	return (
		<div className='admin'>
			<aside className='admin__sidebar'>
				<h2>Admin Panel</h2>

				<nav>
					<Link href='/admin'>Dashboard</Link>
					<Link href='/admin/employees'>Employees</Link>
					<Link href='/admin/departments'>Departments</Link>
				</nav>
			</aside>

			<main className='admin__content'>{children}</main>
		</div>
	);
}
