function updateTotalPrice(row) {
    var quantity = +$(row).find("[name='itemquantity']").val();
    var price = +$(row).find("[name='unitprice']").val();
    var total = (quantity * price).toFixed(2);
    $(row).find("[name='totalprice']").val(total);
}

function updateSubtotal() {
    var subtotal = 0;

    $('.line-item').each(function () {
        var total = parseFloat($(this).find('input[name="totalprice"]').val());
        if (!isNaN(total)) {
            subtotal += total;
        }
    });

    // Update the subtotal input value
    $('input[name="subtotal"]').val(subtotal.toFixed(2));
    updateTotalAfterTax();
}

function removeLineItem(lineItem) {
    if (lineItem.target.parentNode.parentNode.parentNode.childElementCount > 1) {
        lineItem.target.parentNode.parentNode.remove();
        updateSubtotal();

    }

}
function updateTotalAfterTax() {
    var subtotal = parseFloat($('input[name="subtotal"]').val());
    var taxPercentage = parseFloat($('input[name="tax"]').val());

    if (!isNaN(subtotal) && !isNaN(taxPercentage)) {
        var totalAfterTax = subtotal * (1 + taxPercentage / 100);
        $('input[name="total"]').val(totalAfterTax.toFixed(2));
    }
}

$(document).ready(function () {

    $('.datepicker').datepicker({
        orientation: 'bottom',
        autoclose: 'true'
    });

    $("#invoice-btn-add").click(function () {
        var cloned = $('.line-item').first().clone()
        cloned.find('input[type="text"], input[type="number"]').val('');
        // Append the cloned item to the invoice form body
        $('#invoice-form-body').append(cloned);
    });

    $('#invoice-form-body').on('click', '.btn-invoice-remove', function (e) {
        removeLineItem(e)
    });

    // Event handler for input change in quantity or price fields
    $('#invoice-form-body').on('input', '.row-price', function () {
        updateTotalPrice($(this).closest('.line-item'));
        updateSubtotal();
    });

    $(document).on('input', 'input[name="tax"]', function () {
        updateTotalAfterTax();
    });






});

// Populate invoice datatable
$.ajax({
    'url': "/api/Invoices",
    'method': "GET",
    'content': 'application/json'
}).done(function (data) {
    $('#invoiceTable').dataTable({
        "aaData": data,
        "columns": [
            { data: 'Id' },
            { data: 'CustomerId' },
            { data: 'Date' },
            { data: 'DueDate' },
            { data: 'PaymentTerms'}
        ]
    });
});