'use client';

import '@/styles/notFound.scss';
import {useRouter} from 'next/navigation';

export default function NotFound() {
	const router = useRouter();
	const handleRedirect = () => {
		router.push('/');
	};
	return (
		<div className='notFound'>
			<div className='notFound__code'>404</div>

			<div className='notFound__title'>Page Not Found</div>

			<div className='notFound__text'>The page you are looking for does not exist or has been moved.</div>

			<button type='button' className='notFound__button' onClick={() => handleRedirect()}>
				Go Home
			</button>
		</div>
	);
}
