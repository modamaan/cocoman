'use client';

import { useState } from 'react';
import { addAddress, setDefaultAddress } from '@/app/account/actions';
import { useRouter } from 'next/navigation';

export function ProfileView({ customer }: { customer: any }) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const address = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      city: formData.get('city'),
      province: formData.get('province'),
      country: formData.get('country'),
      zip: formData.get('zip'),
      phone: formData.get('phone'),
    };

    const res = await addAddress(address);
    if (res.success) {
      setShowAddressForm(false);
      router.refresh();
    } else {
      alert('Failed to add address');
    }
    setLoading(false);
  };

  const handleSetDefault = async (addressId: string) => {
    const res = await setDefaultAddress(addressId);
    if (res.success) {
      router.refresh();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-serif font-bold uppercase tracking-tight mb-6">Profile</h2>
      
      <div className="bg-white p-8 border border-jet-black/10 mb-8">
        <h3 className="font-bold uppercase tracking-wider mb-4">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Name</p>
            <p className="font-semibold">{customer.firstName} {customer.lastName}</p>
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Email</p>
            <p className="font-semibold">{customer.email}</p>
          </div>
          {customer.phone && (
            <div>
              <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Phone</p>
              <p className="font-semibold">{customer.phone}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold uppercase tracking-wider">Saved Addresses</h3>
        <button 
          onClick={() => setShowAddressForm(!showAddressForm)}
          className="text-xs font-bold uppercase tracking-wider underline decoration-1 underline-offset-4"
        >
          {showAddressForm ? 'Cancel' : 'Add New Address'}
        </button>
      </div>

      {showAddressForm && (
        <form onSubmit={handleAddAddress} className="bg-white p-6 border border-jet-black/10 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" required className="border border-jet-black/20 p-3 w-full" />
          <input type="text" name="lastName" placeholder="Last Name" required className="border border-jet-black/20 p-3 w-full" />
          <input type="text" name="address1" placeholder="Address Line 1" required className="border border-jet-black/20 p-3 w-full md:col-span-2" />
          <input type="text" name="address2" placeholder="Address Line 2 (Optional)" className="border border-jet-black/20 p-3 w-full md:col-span-2" />
          <input type="text" name="city" placeholder="City" required className="border border-jet-black/20 p-3 w-full" />
          <input type="text" name="province" placeholder="State/Province" required className="border border-jet-black/20 p-3 w-full" />
          <input type="text" name="zip" placeholder="Postal/Zip Code" required className="border border-jet-black/20 p-3 w-full" />
          <input type="text" name="country" placeholder="Country" required className="border border-jet-black/20 p-3 w-full" />
          <input type="tel" name="phone" placeholder="Phone Number" required className="border border-jet-black/20 p-3 w-full md:col-span-2" />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button type="submit" disabled={loading} className="bg-jet-black text-soft-ivory px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-jet-black/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customer.addresses?.edges?.map((edge: any) => {
          const address = edge.node;
          const isDefault = customer.defaultAddress?.id === address.id;
          
          return (
            <div key={address.id} className="bg-white p-6 border border-jet-black/10 relative">
              {isDefault && (
                <span className="absolute top-4 right-4 text-[10px] bg-jet-black text-soft-ivory px-2 py-1 font-bold uppercase tracking-wider">
                  Default
                </span>
              )}
              <p className="font-bold mb-2">{address.firstName} {address.lastName}</p>
              <div className="text-sm text-jet-black/80 space-y-1 mb-6">
                <p>{address.address1}</p>
                {address.address2 && <p>{address.address2}</p>}
                <p>{address.city}, {address.province} {address.zip}</p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>
              
              {!isDefault && (
                <button 
                  onClick={() => handleSetDefault(address.id)}
                  className="text-xs font-bold uppercase tracking-wider underline decoration-1 underline-offset-4"
                >
                  Set as Default
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
