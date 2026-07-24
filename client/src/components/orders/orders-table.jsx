import OrderStatusSelect from "@/components/orders/order-status-select";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                Store
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`transition-all duration-200 hover:bg-slate-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold tracking-wide text-slate-700">
                    ORD-{String(order.id).padStart(4, "0")}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-700">
                  Store {order.store_id}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-base font-bold text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {formatDate(order.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
