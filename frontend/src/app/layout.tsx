import type {Metadata} from 'next';
import '@/styles/globals.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Public_Sans, Roboto_Mono} from 'next/font/google';

const publicSans = Public_Sans({
	subsets: ['latin'],
	variable: '--font-primary',
});

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: 'HR management platform',
	description: 'HR management platform made by Alexander Kuznecov',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${publicSans.variable} ${robotoMono.variable}`}>
			<body>
				<Header />
				<main style={{flex: 1}}>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
