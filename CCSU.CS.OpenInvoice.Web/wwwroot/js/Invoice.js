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

function docToPDF() {

    var invoiceContent = document.documentElement;

    //var elementsToHide = document.querySelectorAll('.non-print');
    //elementsToHide.forEach(function (button) {
    //    button.style.display = 'none'; // Hide the buttons
    //});

    
    // Set options for the PDF creation
    var opt = {
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf to convert HTML content to PDF
    html2pdf().from(invoiceContent).set(opt).save();

}

//function generateFormData() {

//    let formData = {

//        Id: $('input[name="Id"]').val(),
//        Date: $('input[name="Date"]').val(),
//        DueDate: $('input[name="DueDate"]').val(),
//        PaymentTerms: $('input[name="PaymentTerms"]').val(),
//        From: $('input[name="From"]').val(),
//        BillTo: $('input[name="BillTo"]').val(),
//        Notes: $('input[name="Notes"]').val(),
//        Terms: $('input[name="Terms"]').val(),
//        SubTotal: $('input[name="SubTotal"]').val(),
//        Tax: $('input[name="Tax"]').val(),
//        Total: $('input[name="Total"]').val(),
//        lineItems: []
//        $('.line-item').each(function () {
//            var lineItem = {
//                Id: $(this).find('input[name="Id"]').val(),
//                Description: $(this).find('input[name="Description"]').val(),
//                Qty: $(this).find('input[name="Qty"]').val(),
//                Price: $(this).find('input[name="Price"]').val(),
//                TotalPrice: $(this).find('input[name="TotalPrice"]').val(),
//            };
//            formData.lineItems.push(lineItem);
//        });




//    }

//    return formData;


//}

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