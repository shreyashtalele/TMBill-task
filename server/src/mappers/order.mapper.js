export const mapOrderResponse = (order) => {
    return {
        ...order,
        total_amount: Number(order.total_amount),
    };
};