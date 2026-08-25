'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/account/actions';
import { OrdersView } from './OrdersView';
import { ProfileView } from './ProfileView';
import { ReturnsForm } from './ReturnsForm';

type Tab = 'orders' | 'profile' | 'returns';

export function AccountDashboard({ customer }: { customer: any }) {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'profile', label: 'Profile' },
    { id: 'returns', label: 'Return / Exchange' }
  ];

  return (
    <div className="bg-soft-ivory min-h-screen text-jet-black pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <h1 className="text-2xl font-serif font-bold uppercase tracking-tight mb-8">
              Welcome, {customer.firstName || 'User'}
            </h1>
            
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-jet-black text-soft-ivory' 
                      : 'bg-white text-jet-black hover:bg-jet-black/5 border border-jet-black/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              
              <button
                onClick={handleLogout}
                className="text-left px-4 py-3 mt-4 text-sm font-semibold uppercase tracking-wider text-jet-black/70 hover:text-jet-black transition-colors"
              >
                Logout
              </button>
            </nav>

            <div className="mt-12 p-6 bg-white border border-jet-black/10">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                My Profile
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </h3>
              <div className="text-sm text-jet-black/80 space-y-1">
                <p className="font-semibold text-jet-black">{customer.firstName} {customer.lastName}</p>
                <p className="mb-4">{customer.email}</p>
                {customer.defaultAddress ? (
                  <>
                    <p>{customer.defaultAddress.address1}</p>
                    {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                    <p>{customer.defaultAddress.city}, {customer.defaultAddress.zip}</p>
                    <p>{customer.defaultAddress.country}</p>
                  </>
                ) : (
                  <p className="italic text-jet-black/50">No default address set.</p>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {activeTab === 'orders' && <OrdersView orders={customer.orders?.edges?.map((e: any) => e.node) || []} />}
            {activeTab === 'profile' && <ProfileView customer={customer} />}
            {activeTab === 'returns' && <ReturnsForm customer={customer} />}
          </main>
          
        </div>
      </div>
    </div>
  );
}
