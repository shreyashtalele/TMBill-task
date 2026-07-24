const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function OrderStatusBadge({ status }) {
  const normalizedStatus = status?.toUpperCase();

  const statusStyle =
    STATUS_STYLES[normalizedStatus] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
    >
      {normalizedStatus ?? "UNKNOWN"}
    </span>
  );
}
