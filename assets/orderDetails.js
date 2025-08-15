document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');

    if (!orderId) {
        document.body.innerHTML = '<p>شناسه سفارش یافت نشد.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('سفارش یافت نشد.');

        const data = await response.json();
        
        // *** تغییر کلیدی: از data.data استفاده می‌کنیم ***
        const order = data.data;

        // نمایش اطلاعات کلی فاکتور
        document.getElementById('order-id').textContent = order.id;
        document.getElementById('order-date').textContent = new Date(order.created_at).toLocaleDateString('fa-IR');
        document.getElementById('order-total').textContent = Number(order.total_amount).toLocaleString('fa-IR') + ' تومان';
        document.getElementById('order-status').textContent = order.status;

        // نمایش آیتم‌های فاکتور
        const itemsContainer = document.getElementById('order-items-table-body');
        itemsContainer.innerHTML = ''; // پاک کردن محتوای قبلی

        order.items.forEach(item => {
            const itemTotal = item.quantity * item.price;
            const row = `
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>${Number(item.price).toLocaleString('fa-IR')} تومان</td>
                    <td class="fw-bold">${itemTotal.toLocaleString('fa-IR')} تومان</td>
                </tr>
            `;
            itemsContainer.insertAdjacentHTML('beforeend', row);
        });

    } catch (error) {
        console.error('خطا:', error);
        document.body.innerHTML = `<p class="text-center mt-5">خطا در بارگذاری سفارش: ${error.message}</p>`;
    }
});
