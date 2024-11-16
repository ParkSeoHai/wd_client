
function formatter(price) {
    // Format currency
    const formatVND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    return formatVND.format(price);
}

const calcProductPriceSale = ({ price, discount }) => {
    const priceSale = (price * discount) / 100;
    return price - priceSale;
};

export { formatter, calcProductPriceSale };