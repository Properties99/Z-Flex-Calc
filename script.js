function generateInstallmentPlan() {
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const totalInstallments = parseInt(document.getElementById('installments').value);

    const firstPayment = unitPrice * 0.05;
    const secondPayment = unitPrice * 0.05;
    const remainingAfterFirstTwo = unitPrice - firstPayment - secondPayment;

    const restInstallments = totalInstallments - 2;
    const installmentAmount = remainingAfterFirstTwo / restInstallments;

    const tbody = document.getElementById('installmentTable').querySelector('tbody');
    tbody.innerHTML = ''; // clear previous rows

    let remaining = unitPrice;

    // First 5% Payment
    tbody.insertRow().innerHTML = `
        <td>1</td>
        <td>EG ${firstPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
        <td>EG ${(remaining - firstPayment).toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
    `;
    remaining -= firstPayment;

    // Second 5% Payment
    tbody.insertRow().innerHTML = `
        <td>2</td>
        <td>EG ${secondPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
        <td>EG ${(remaining - secondPayment).toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
    `;
    remaining -= secondPayment;

    // Remaining Installments
    for (let i = 3; i <= totalInstallments; i++) {
        remaining -= installmentAmount;
        tbody.insertRow().innerHTML = `
            <td>${i}</td>
            <td>EG ${installmentAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>EG ${remaining.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
        `;
    }

    document.getElementById('paymentPlanResult').classList.remove('hidden');
}