﻿$(document).ready(function () {

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
                { data: 'CustomerName' },
                { data: 'Date' },
                { data: 'DueDate' },
                { data: 'Total' }
            ]
        });
    });
});