'use server';

import { cookies } from 'next/headers';
import { 
  customerAccessTokenCreate, 
  customerCreate, 
  getCustomer,
  customerAddressCreate,
  customerAddressUpdate,
  customerDefaultAddressUpdate
} from '@/lib/shopify';

const COOKIE_NAME = 'customerAccessToken';

export async function login(email: string, password: string) {
  const token = await customerAccessTokenCreate(email, password);
  
  if (token) {
    (await cookies()).set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    return { success: true };
  }
  
  return { success: false, error: 'Invalid email or password' };
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
  const success = await customerCreate(email, password, firstName, lastName);
  if (success) {
    // Automatically log them in after registration
    return login(email, password);
  }
  return { success: false, error: 'Failed to create account. Email may already be in use.' };
}

export async function logout() {
  (await cookies()).delete(COOKIE_NAME);
  return { success: true };
}

export async function getSessionCustomer() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  
  const customer = await getCustomer(token);
  // If the token is invalid or expired, just return null
  if (!customer) {
    return null;
  }
  
  return customer;
}

export async function addAddress(address: any) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return { success: false, error: 'Not authenticated' };
  
  const success = await customerAddressCreate(token, address);
  return { success };
}

export async function updateAddress(id: string, address: any) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return { success: false, error: 'Not authenticated' };
  
  const success = await customerAddressUpdate(token, id, address);
  return { success };
}

export async function setDefaultAddress(addressId: string) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return { success: false, error: 'Not authenticated' };
  
  const success = await customerDefaultAddressUpdate(token, addressId);
  return { success };
}
