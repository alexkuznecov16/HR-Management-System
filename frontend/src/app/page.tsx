import '@/styles/home.scss';

export default function Home() {
	return (
		<main className='home'>
			{/* HERO DASHBOARD */}
			<section className='home__hero'>
				<div className='home__top'>
					<div className='home__badge'>HR Management System • Enterprise Dashboard</div>

					<h1 className='home__title'>Centralized Human Resources Management Platform</h1>

					<p className='home__subtitle'>A full-stack HR system designed to manage employees, departments, and organizational structure in a structured and scalable way. Built as a course project demonstrating modern web architecture using Spring Boot and Next.js.</p>
				</div>

				{/* SYSTEM STATUS STRIP */}
				<div className='home__status'>
					<div className='home__statusItem'>
						<span className='home__statusLabel'>Backend</span>
						<span className='home__statusValue'>Spring Boot API</span>
					</div>

					<div className='home__statusItem'>
						<span className='home__statusLabel'>Frontend</span>
						<span className='home__statusValue'>Next.js + TypeScript</span>
					</div>

					<div className='home__statusItem'>
						<span className='home__statusLabel'>Database</span>
						<span className='home__statusValue'>In-Memory Storage (List-based)</span>
					</div>

					<div className='home__statusItem'>
						<span className='home__statusLabel'>Architecture</span>
						<span className='home__statusValue'>REST API</span>
					</div>
				</div>

				{/* KPI DASHBOARD CARDS */}
				<div className='home__kpiGrid'>
					<div className='home__kpiCard'>
						<div className='home__kpiTitle'>Employee Management</div>
						<div className='home__kpiText'>Full CRUD operations for employee records including creation, editing, deletion and retrieval.</div>
					</div>

					<div className='home__kpiCard'>
						<div className='home__kpiTitle'>Department Structure</div>
						<div className='home__kpiText'>Organizational departments with employee assignment and hierarchical structure support.</div>
					</div>

					<div className='home__kpiCard'>
						<div className='home__kpiTitle'>REST API Layer</div>
						<div className='home__kpiText'>Clean controller-service-repository architecture with RESTful endpoints.</div>
					</div>

					<div className='home__kpiCard'>
						<div className='home__kpiTitle'>Frontend System</div>
						<div className='home__kpiText'>Modular UI built with reusable components and API integration layer.</div>
					</div>
				</div>
			</section>

			{/* SYSTEM OVERVIEW SECTION */}
			<section id='about' className='home__overview'>
				<h2 className='home__sectionTitle'>System Overview</h2>

				<div className='home__overviewGrid'>
					<div className='home__block'>
						<h3>Purpose</h3>
						<p>The system replaces manual HR processes with a centralized digital solution for managing employee data efficiently.</p>
					</div>

					<div className='home__block'>
						<h3>Architecture</h3>
						<p>Client-server model using REST API communication between Spring Boot backend and Next.js frontend.</p>
					</div>

					<div className='home__block'>
						<h3>Data Flow</h3>
						<p>Frontend sends requests → backend processes logic → repository stores data → response returned as JSON.</p>
					</div>

					<div className='home__block'>
						<h3>Academic Goal</h3>
						<p>Demonstrates full-stack development principles and enterprise system design fundamentals.</p>
					</div>
				</div>
			</section>

			{/* TECH STACK STRIP */}
			<section className='home__tech'>
				<h2 className='home__sectionTitle'>Technology Stack</h2>

				<div className='home__techGrid'>
					<div className='home__techItem'>Java Spring Boot</div>
					<div className='home__techItem'>REST API</div>
					<div className='home__techItem'>Next.js</div>
					<div className='home__techItem'>TypeScript</div>
					<div className='home__techItem'>SCSS</div>
					<div className='home__techItem'>In-Memory Storage</div>
				</div>
			</section>

			{/* FOOT NOTE */}
			<section className='home__footerNote'>
				<p>This system is developed as an academic course project for demonstration of full-stack web development skills.</p>
			</section>
		</main>
	);
}
