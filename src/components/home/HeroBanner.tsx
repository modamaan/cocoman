import React from 'react';
import { getShopTheLookLooks } from '@/lib/shopify';
import { ShopTheLookHero } from './lookbook/ShopTheLookHero';

export async function HeroBanner() {
  const looks = await getShopTheLookLooks();

  return <ShopTheLookHero looks={looks} />;
}
