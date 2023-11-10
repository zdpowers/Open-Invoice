/*
    References:
    https://datatables.net/forums/discussion/47910/add-button-column
    https://stackoverflow.com/questions/19981949/how-to-make-a-button-in-bootstrap-look-like-a-normal-link-in-nav-tabs
*/

const myModal = document.getElementById('customer-modal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

var form = $("#customer-form");
form.validate();




function convertFormToJSON(form) {
    return $(form)
        .serializeArray()
        .reduce(function (json, { name, value }) {
            json[name] = value;
            return json;
        }, {});
}

function submitForm(formData) {
    console.log(formData);
    console.log(JSON.stringify(formData));
    let headers = {};
    let antiForgeryToken = $("input[name=__RequestVerificationToken]").val();

    headers['RequestVerificationToken'] = antiForgeryToken;

    $.ajax({
        url: "api/Customers/save",
        headers: headers,
        contentType: "application/json",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function (data) {
            //alert("Success");
            //location.reload(true);
            $('#cutomer-table').DataTable().ajax.reload(null, false); //reloads ajax table
            $('#customer-form')[0].reset(); //clears the modal form
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });

}

var oTable;

$(document).ready(function () {
    $('#cutomer-table').dataTable({
        ajax: {
            'url': '/api/Customers',
            'dataSrc': ''
        },
        select: {
            style: 'single'
        },
        columnDefs: [
            {
                target: [0,3,4,5,6,7,8,11],
                visible: false,
                searchable: false
            },         
            {
                target: 12,
                className: 'dt-body-center',
                searchable: false,
                orderable : false
            }


            
        ],
        initComplete: function (settings, json) {
            oTable = $('#cutomer-table').dataTable();

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
            { data: 'Name' },
            { data: 'Contact' },
            { data: 'Address' },
            { data: 'Address2' },
            { data: 'City' },
            { data: 'State' },
            { data: 'Zip' },
            { data: 'Country' },
            { data: 'Phone' },
            { data: 'Email' },
            { data: 'Notes' },
            {
                data: null,
                render: function (data, type, row) {
                    return '<button class="btn btn-primary btn-customer-edit" data-id="' + row.Id + '"><i class="fa-solid fa-pen-to-square p-1"></i>Edit</button><button class="btn btn-secondary ml-2 btn-customer-delete" data-id="' + row.Id + '"><i class="fa-solid fa-file-invoice p-1"></i>Inovice</button>';
                }
            }
        ]
    });

    $('#cutomer-table').on('click', '.btn-customer-edit', function () {
        let customerData = oTable.api().row($(this).parents('tr')).data();
        form[0].reset()
        $("#editCustomerName").val(customerData.Name);
        $("#editCustomerContact").val(customerData.Contact);
        $("#editCustomerAddress").val(customerData.Address);
        $("#editCustomerAddress2").val(customerData.Address2);
        $("#editCustomerCity").val(customerData.City);
        $("#editCustomerState").val(customerData.State);
        $("#editCustomerZip").val(customerData.Zip);
        $("#editCustomerCountry").val(customerData.Country);
        $("#editCustomerPhone").val(customerData.Phone);
        $("#editCustomerEmail").val(customerData.Email);
        $("#editCustomerNotes").val(customerData.Notes);
        $(myModal).find(".modal-title").html("Edit Customer")
        $(myModal).modal();
    });

    $("#customerAddButton").on("click", function (e) {
        $(myModal).find(".modal-title").html("Add Customer")
        form[0].reset()
        $("#customer-modal").modal();
    });




    $("#customer-form").on("submit", function (e) {
        event.preventDefault();
        if ($("#customer-form").valid()) {
            let form = $(e.target);
            let json = convertFormToJSON(form);
            submitForm(json);
            $(myModal).modal('hide'); //closes the modal
        }
    });
});
