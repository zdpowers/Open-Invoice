$(document).ready(function () {

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
                { data: 'Customer.Name' },
                { data: 'Date' },
                { data: 'DueDate' },
                { data: 'Total' },
                {
                    data: null,
                    render: function (data, type, row) {
                        return '<button class="btn btn-primary btn-invoice-edit" data-id="' + row.Id + '"><i class="fa-solid fa-pen-to-square p-1"></i>Edit</button>';
                    }
                },
                { data: 'CustomerId' },
            ]
        });
    });
});