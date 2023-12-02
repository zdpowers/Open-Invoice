function updateTotalPrice(row) {
    var quantity = +$(row).find("[name='Qty']").val();
    var price = +$(row).find("[name='Price']").val();
    var total = (quantity * price).toFixed(2);
    $(row).find("[name='TotalPrice']").val(total);
}

function updateSubtotal() {
    var subtotal = 0;

    $('.line-item').each(function () {
        var total = parseFloat($(this).find('input[name="TotalPrice"]').val());
        if (!isNaN(total)) {
            subtotal += total;
        }
    });

    // Update the subtotal input value
    $('input[name="SubTotal"]').val(subtotal.toFixed(2));
    updateTotalAfterTax();
}

function removeLineItem(lineItem) {
    if ($(lineItem.target).parents("#invoice-form-body")[0].children.length > 1) {
        $(lineItem.target).parents(".line-item")[0].remove();
        updateSubtotal();

    }

}
function updateTotalAfterTax() {
    var subtotal = parseFloat($('input[name="SubTotal"]').val());
    var taxPercentage = parseFloat($('input[name="Tax"]').val());

    if (!isNaN(subtotal) && !isNaN(taxPercentage)) {
        var totalAfterTax = subtotal * (1 + taxPercentage / 100);
        $('input[name="Total"]').val(totalAfterTax.toFixed(2));
    }
}

function docToPDF() {

    var invoiceContent = document.documentElement;
    // Create a deep clone of the HTML content
    var clonedContent = invoiceContent.cloneNode(true);

    var style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: 'Arial, sans-serif';
        }
        .form-control {
            padding:0rem;
            padding-left:0.5rem;
        }
        .input-group-text{
             padding:0rem;
             padding-left:0.5rem;
             padding-right:0.5rem;
        }
        .input-group-text
        {
            background-color:#fff
        }
        .form-control:disabled, .form-control[readonly] {
            background-color:#fff
        }
        .invoice-container {
            border: none;
            padding: 5px;
        }
        /* Add more styles as needed */
    `;
    clonedContent.querySelector('head').appendChild(style);



    var opt = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2, scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
},
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf to convert HTML content to PDF
    html2pdf().from(clonedContent).set(opt).save();

}

function generateFormData() {

    let formData = {

        Id: Number($('input[name="Id"]').val()),
        Date: $('input[name="Date"]').val() == "" ? null : new Date($("input[name=Date]").val()),
        DueDate: $('input[name="DueDate"]').val() == "" ? null : new Date($("input[name=DueDate]").val()),
        PaymentTerms: $('input[name="PaymentTerms"]').val(),
        From: $('textarea[name="From"]').val(),
        BillTo: $('textarea[name="BillTo"]').val(),
        CustomerId: $('input[name="CustomerId"]').val(),
        Notes: $('textarea[name="Notes"]').val(),
        Terms: $('textarea[name="Terms"]').val(),
        SubTotal: Number($('input[name="SubTotal"]').val()),
        Tax: Number($('input[name="Tax"]').val()),
        Total: Number($('input[name="Total"]').val()),
        LineItems: []
     
    }
    $('.line-item').each(function () {
        var lineItem = {
            Id: $(this).find('input[name="Id"]').val(),
            Description: $(this).find('input[name="Description"]').val(),
            Qty: Number($(this).find('input[name="Qty"]').val()),
            Price: Number($(this).find('input[name="Price"]').val()),
            TotalPrice: Number($(this).find('input[name="TotalPrice"]').val()),
        };
        formData.LineItems.push(lineItem);
    });


    return formData;


}

function saveInvoice(formData) {
    console.log(formData);
    console.log(JSON.stringify(formData));
    let headers = {};
    let antiForgeryToken = $("input[name=__RequestVerificationToken]").val();

    headers['RequestVerificationToken'] = antiForgeryToken;

    $.ajax({
        url: "/api/Invoices/save",
        headers: headers,
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function (data) {
            window.location.href = `/Customer/${data.CustomerId}/Invoice/${data.Id}`; //relative to domain
            alert("Success");
   
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });

}

$(document).ready(function () {

    $('.datepicker').datepicker({
        orientation: 'bottom',
        autoclose: 'true'
    });

    $("#invoice-btn-add").click(function () {
        var cloned = $('.line-item').first().clone()
        cloned.find('input[type="text"], input[type="number"]').val('');
        cloned.find('input[type="hidden"]').val(0);
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

    $(document).on('input', 'input[name="Tax"]', function () {
        updateTotalAfterTax();
    });

    $("#invoice-btn-save").click(function (e) {
        e.preventDefault();
        let data = generateFormData();
        saveInvoice(data);
    });
    $("#invoice-btn-print").click(function (e) {
        e.preventDefault();
        docToPDF()
    });




});