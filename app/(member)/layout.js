import { redirect } from 'next/navigation';
import { getMember } from '@/lib/auth.js';
import Sidebar from '@/components/Sidebar.js';
import Footer from '@/components/Footer.js';

export const dynamic = 'force-dynamic';

export default async function MemberLayout({ children }) {
  const member = await getMember();
  if (!member) redirect('/api/logout');

  const name = member.nama || member.email.split('@')[0];

  return (
    <div className="min-h-screen lg:pl-72">
      <Sidebar name={name} email={member.email} />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
    }
