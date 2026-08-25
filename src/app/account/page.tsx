import { getSessionCustomer } from '@/app/account/actions';
import { LoginView } from '@/components/account/LoginView';
import { AccountDashboard } from '@/components/account/AccountDashboard';

export const metadata = {
  title: 'My Account | COCOMAN',
  description: 'Manage your orders, profile, and returns.',
};

export default async function AccountPage() {
  const customer = await getSessionCustomer();

  if (!customer) {
    return (
      <main className="min-h-[70vh] bg-soft-ivory">
        <LoginView />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-soft-ivory">
      <AccountDashboard customer={customer} />
    </main>
  );
}
