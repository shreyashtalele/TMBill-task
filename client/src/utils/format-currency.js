export function formatCurrency(amount) {
    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount)) {
        return "₹0";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(numericAmount);
}