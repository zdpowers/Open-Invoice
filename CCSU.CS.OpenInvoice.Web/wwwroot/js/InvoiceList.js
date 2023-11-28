const deleteConfirmationModal = document.getElementById('delete-invoice-modal')

function deleteInvoice(invoiceId) {
    console.log(invoiceId);
    let headers = {};
    let antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
    headers['RequestVerificationToken'] = antiForgeryToken;

    $.ajax({
        url: "api/Invoices/Delete?id=" + invoiceId,
        headers: headers,
        type: "DELETE",
        success: function (data) {
            $("#invoiceTable").DataTable().ajax.reload(null, false);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });
}



var oTable;
$(document).ready(function () {

    $("#invoiceTable").on('click', '.btn-invoice-edit', function () {
        let invoiceData = $('#invoiceTable').dataTable().api().row($(this).parents('tr')).data();
        let invoiceId = invoiceData.Id;
        let customerId = invoiceData.CustomerId;
        let invoiceUrl = "/Customer/" + customerId + "/Invoice/" + invoiceId;
        window.location.href = invoiceUrl;
    });

    // Delete Confirmation Modal
    $("#invoiceTable").on('click', '.btn-invoice-delete-modal', function () {
        let invoiceData = $('#invoiceTable').dataTable().api().row($(this).parents('tr')).data();
        let invoiceId = invoiceData.Id;
        $(deleteConfirmationModal).find(".invoice-conf-id").html(invoiceId);
        $(deleteConfirmationModal).find("#editInvoiceIdConfirmation").val(invoiceId)
        $(deleteConfirmationModal).modal();
    });

    // action to delete invoice
    $(deleteConfirmationModal).on("click", ".btn-invoice-delete", function () {
        console.log("Hello :D");
        let invoiceId = $("#editInvoiceIdConfirmation").val();
        console.log("InvoiceId = " + invoiceId)
        $(deleteConfirmationModal).modal("hide");
        deleteInvoice(invoiceId);
    });

    $('#invoiceTable').dataTable({
        ajax: {
            'url': '/api/Invoices',
            'dataSrc': ''
        },
        select: {
            style: 'single'
        },
        columnDefs: [
            {
                target: [5],
                visible: false,
                searchable: false
            },
            {
                target: 5,
                className: 'dt-body-center',
                searchable: false,
                orderable: false
            }



        ],
        initComplete: function (settings, json) {
            oTable = $('#invoiceTable').dataTable();

            oTable.on('click', 'tbody tr', (e) => {
                let classList = e.currentTarget.classList;

                if (classList.contains('selected')) {
                    classList.remove('selected');
                }
                else {
                    classList.add('selected');
                }
            });
        },
        columns: [
            { data: 'Id' },
            { data: 'Customer.Name' },
            { data: 'Date' },
            { data: 'DueDate' },
            { data: 'Total' },
            { data: 'CustomerId' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary btn-invoice-edit" data-id="' + row.Id + '"><i class="fa-solid fa-pen-to-square p-1"></i>Edit</button> <button type="button" class="btn btn-danger ml-2 btn-invoice-delete-modal"><i class="fa-solid fa-trash p-1"></i>Delete</button>';
                }
            }
           
        ]
    });


});