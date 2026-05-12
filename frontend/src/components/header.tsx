import Link from 'next/link';
import '@/styles/header.scss';

export default function Header() {
	return (
		<header className='header'>
			<div className='container header__container'>
				<div className='header__left'>
					<div className='header__logo'>
						{/* если будет логотип */}
						{/* <Image src="/logo.svg" alt="HR Logo" width={40} height={40} /> */}
						<span className='header__brand'>HR System</span>
					</div>
				</div>
				<nav className='header__nav'>
					<Link href='/' className='header__link'>
						Home
					</Link>
					<Link href='/employees' className='header__link'>
						Employees
					</Link>
					<Link href='#about' className='header__link'>
						About
					</Link>
				</nav>
				<div className='header__right'>
					<Link href='/admin' className='header__admin'>
						Admin Panel
					</Link>
				</div>
			</div>
		</header>
	);
}
