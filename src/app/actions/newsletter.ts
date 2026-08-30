'use server';

import { customerCreate } from '@/lib/shopify';
import { login } from '@/app/account/actions';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;
  
  // 1. Server-side validation (Security/Hardening)
  if (!email || typeof email !== 'string') {
    return { success: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // 2. Extract first name from email so Shopify Admin doesn't just show the email
  const firstName = email.split('@')[0];

  // Generate a random strong password since Storefront API requires it for customer creation
  const randomPassword = Math.random().toString(36).slice(-10) + 'A1!@' + Date.now();

  try {
    // Pass firstName to customerCreate
    const success = await customerCreate(email, randomPassword, firstName);
    
    if (success) {
      // Auto-login the user seamlessly
      await login(email, randomPassword);
      return { success: true };
    } else {
      // If customerCreate returns false, it usually means the email is already in the system
      // We'll treat this as a success for the user (they are already subscribed/registered)
      return { success: true, message: 'Already subscribed' };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: 'Failed to subscribe' };
  }
}
