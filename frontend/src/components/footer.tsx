import Link from 'next/link';
import '@/styles/footer.scss';

export default function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				{/* LEFT */}
				<div className='footer__brand'>
					<div className='footer__title'>HR System</div>
					<div className='footer__text'>Web-based Human Resources management system built with Spring Boot and Next.js. Designed for efficient employee and department management.</div>
				</div>

				{/* LINKS */}
				<div className='footer__links'>
					<Link href='/' className='footer__link'>
						Home
					</Link>
					<Link href='/employees' className='footer__link'>
						Employees
					</Link>
					<Link href='#about' className='footer__link'>
						About
					</Link>
					<Link href='/admin' className='footer__link'>
						Admin
					</Link>
				</div>

				{/* RIGHT INFO */}
				<div className='footer__info'>
					<div className='footer__badge'>Course Project</div>
					<div>Turiba University</div>
					<div>Spring Boot + Next.js</div>
					<div>© {new Date().getFullYear()} Company X - HR System</div>
				</div>
			</div>

			<div className='footer__bottom'>Designed for academic demonstration purposes</div>
		</footer>
	);
}
