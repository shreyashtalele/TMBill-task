import { IndianRupee, Package, ShoppingBasket } from "lucide-react";

import { formatCurrency } from "@/utils/format-currency";

export default function OrderSummary({
  itemCount,
  totalQuantity,
  totalAmount,
}) {
  return (
    <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">
          Order Summary
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Review the order details before creating it.
        </p>
      </div>

      <dl className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <dt className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Package size={17} aria-hidden="true" />
            </span>
            Items
          </dt>

          <dd className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-900">
            {itemCount}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <ShoppingBasket size={17} aria-hidden="true" />
            </span>
            Total quantity
          </dt>

          <dd className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-900">
            {totalQuantity}
          </dd>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-end justify-between gap-4">
            <dt>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <IndianRupee size={16} aria-hidden="true" />
                Total amount
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Final payable amount
              </p>
            </dt>

            <dd className="text-right text-2xl font-bold tracking-tight text-slate-900">
              {formatCurrency(totalAmount)}
            </dd>
          </div>
        </div>
      </dl>
    </aside>
  );
}
