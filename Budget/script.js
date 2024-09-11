
document.getElementById('profitForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
    const salePrice = parseFloat(document.getElementById('salePrice').value) || 0;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
    const ebayFeePercentage = 0.12;
    const packagingFees = parseFloat(document.getElementById('packagingFees').value) || 0;

    const ebayFees = (salePrice * ebayFeePercentage) + 0.3;
    
    const totalCosts = purchasePrice + shippingCost + ebayFees + packagingFees;
    
    const profit = salePrice - totalCosts;

    document.getElementById('result').innerHTML = `
        <h3>Results:</h3>
        <p><strong>Total Costs:</strong> $${totalCosts.toFixed(2)}</p>
        <p><strong>Profit:</strong> $${profit.toFixed(2)}</p>
    `;
});
