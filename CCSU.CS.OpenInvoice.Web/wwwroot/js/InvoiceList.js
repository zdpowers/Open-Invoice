var oTable;
$(document).ready(function () {

    $("#invoiceTable").on('click', '.btn-invoice-edit', function () {
        let invoiceData = $('#invoiceTable').dataTable().api().row($(this).parents('tr')).data();
        let invoiceId = invoiceData.Id;
        let customerId = invoiceData.CustomerId;
        let invoiceUrl = "/Customer/" + customerId + "/Invoice/" + invoiceId;
        window.location.href = invoiceUrl;
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
                    return '<button class="btn btn-primary btn-invoice-edit" data-id="' + row.Id + '"><i class="fa-solid fa-pen-to-square p-1"></i>Edit</button>';
                }
            }
           
        ]
    });


});