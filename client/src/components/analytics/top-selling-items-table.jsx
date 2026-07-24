import { Trophy } from "lucide-react";

export default function TopSellingItemsTable({ data }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <Trophy size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Top Selling Items
          </h2>

          <p className="text-sm text-slate-500">
            Items ranked by total quantity sold.
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            No sales data available
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Top-selling items will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Item
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                  Quantity Sold
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {data.map((item, index) => (
                <tr
                  key={item.item_id}
                  className={`transition-colors hover:bg-slate-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                  }`}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                        {index + 1}
                      </span>

                      <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold tracking-wide text-slate-700">
                        ITEM-{String(item.item_id).padStart(4, "0")}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-md bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                      {Number(item.total_quantity)}
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
