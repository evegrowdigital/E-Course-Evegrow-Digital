import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const LOGO = 'https://i.ibb.co.com/BHQvvZNP/Welcome-1024-x-1024-piksel-20261018-204041-0000.png';

export const metadata = {
  title: 'Evegrow.Digital | Member Area',
  description: 'Area belajar eksklusif member Evegrow.Digital',
  icons: { icon: LOGO, apple: LOGO },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
    }
