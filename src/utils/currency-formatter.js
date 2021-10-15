const formatter = new Intl.NumberFormat('ru-RU', {
    currency: 'RUB', 
    style: 'currency',
});

export function currencyFormatter(value) {
    return formatter.format(value);
}