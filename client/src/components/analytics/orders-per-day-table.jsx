import { CalendarDays } from "lucide-react";

import { formatDate } from "@/utils/format-date";

export default function OrdersPerDayTable({ data }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <CalendarDays size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Orders Per Day
          </h2>

          <p className="text-sm text-slate-500">
            Daily order volume across all stores.
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            No order data available
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Daily order statistics will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Total Orders
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {data.map((order, index) => (
                <tr
                  key={order.order_date}
                  className={`transition-all duration-200 hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                    {formatDate(order.order_date, false)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {order.total_orders}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
