import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const LOGO = '/logo.png';

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
