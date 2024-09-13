
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

    result.style.display = 'block';

    const resultDiv = document.getElementById('result');
    if (profit > 0) {
        resultDiv.style.color = 'green';
        resultDiv.textContent = "Your ebay fees are: " + (ebayFeePercentage*100).toFixed(2) + "% , Profit: $" + profit.toFixed(2);

    } else if (profit < 0) {
        resultDiv.textContent = "Your ebay fees are: " + (ebayFeePercentage*100).toFixed(2) + "% , Lost: $" + Math.abs(profit).toFixed(2);
        resultDiv.style.color = 'red';
    } else {
        resultDiv.textContent = "Your ebay fees are: " + (ebayFeePercentage*100).toFixed(2) + "% , Profit: $" + profit.toFixed(2);
        resultDiv.style.color = 'black';

    }
});
