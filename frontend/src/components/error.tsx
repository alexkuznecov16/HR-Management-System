'use client';

import {useEffect} from 'react';
import '@/styles/error.scss';
import {ErrorProps} from '@/types';

export default function Error({message, onClose}: ErrorProps) {
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [message, onClose]);

	if (!message) return null;

	return (
		<div className='error-container'>
			<span>{message}</span>

			<button onClick={onClose} className='closeBtn'>
				✕
			</button>
			<div className='progress'></div>
		</div>
	);
}
