import { CircleCheckBig, Clock3, LoaderCircle, Package } from "lucide-react";

const CARD_CONFIG = {
  visible: {
    title: "Visible Orders",
    description: "Orders on this page",
    icon: Package,
    iconStyle: "bg-slate-100 text-slate-700",
  },
  placed: {
    title: "Placed",
    description: "Waiting to be prepared",
    icon: Clock3,
    iconStyle: "bg-amber-100 text-amber-700",
  },
  preparing: {
    title: "Preparing",
    description: "Currently in progress",
    icon: LoaderCircle,
    iconStyle: "bg-blue-100 text-blue-700",
  },
  completed: {
    title: "Completed",
    description: "Successfully completed",
    icon: CircleCheckBig,
    iconStyle: "bg-emerald-100 text-emerald-700",
  },
};

export default function OrderSummaryCards({ orders }) {
  const visibleOrders = orders.length;

  const placedOrders = orders.filter(
    (order) => order.status === "PLACED",
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "PREPARING",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED",
  ).length;

  const cards = [
    {
      ...CARD_CONFIG.visible,
      value: visibleOrders,
    },
    {
      ...CARD_CONFIG.placed,
      value: placedOrders,
    },
    {
      ...CARD_CONFIG.preparing,
      value: preparingOrders,
    },
    {
      ...CARD_CONFIG.completed,
      value: completedOrders,
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
