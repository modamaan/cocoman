'use client';

import Image from 'next/image';
import Link from 'next/link';

export function OrdersView({ orders }: { orders: any[] }) {
  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-serif font-bold uppercase tracking-tight mb-6">Orders</h2>
        <div className="bg-white p-8 text-center border border-jet-black/10">
          <p className="text-jet-black/70 mb-6">You haven't placed any orders yet.</p>
          <Link
            href="/collections/all-products"
            className="inline-block bg-jet-black text-soft-ivory py-3 px-8 text-sm font-semibold uppercase tracking-wider hover:bg-jet-black/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-serif font-bold uppercase tracking-tight mb-6">Orders</h2>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-jet-black/10 overflow-hidden">
            <div className="bg-jet-black/5 p-4 border-b border-jet-black/10 flex flex-wrap gap-4 justify-between items-center">
              <div>
                <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Order Placed</p>
                <p className="text-sm font-semibold">{new Date(order.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Total</p>
                <p className="text-sm font-semibold">{order.currentTotalPrice.currencyCode} {order.currentTotalPrice.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase font-semibold text-jet-black/60 mb-1">Order Number</p>
                <p className="text-sm font-semibold">#{order.orderNumber}</p>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg uppercase">{order.fulfillmentStatus || 'UNFULFILLED'}</h3>
                  <p className="text-sm text-jet-black/70">Payment Status: {order.financialStatus}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {order.lineItems.edges.map((edge: any, index: number) => {
                  const item = edge.node;
                  const image = item.variant?.image;

                  return (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="relative w-20 h-24 bg-soft-ivory shrink-0 border border-jet-black/5">
                        {image && (
                          <Image
                            src={image.url}
                            alt={image.altText || item.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-jet-black/70">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {item.variant?.price?.currencyCode} {item.variant?.price?.amount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
