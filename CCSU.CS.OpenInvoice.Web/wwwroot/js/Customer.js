/*
    References:
    https://datatables.net/forums/discussion/47910/add-button-column
    https://stackoverflow.com/questions/19981949/how-to-make-a-button-in-bootstrap-look-like-a-normal-link-in-nav-tabs
*/

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

var form = $("#customer-form");
form.validate();

$("#customer-form").on("submit", function (e) {
    event.preventDefault();
    if ($("#customer-form").valid()) {
        let form = $(e.target);
        let json = convertFormToJSON(form);
        submitForm(json);
        $('#myModal').hide(); //closes the modal
        $('.modal-backdrop').hide(); //closes the backdrop
    }
});

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
            $('#example').DataTable().ajax.reload(null, false); //reloads ajax table
            $('#customer-form')[0].reset(); //clears the modal form
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });

}

var oTable;

/*$.ajax({
    'url': "/api/Customers",
    'method': "GET",
    'contentType': 'application/json' //,
    //'dataSrc': ''
}).done(function (data) {
    $('#example').dataTable({
        //"ajax": '',
        select: {
            style: 'single'
        },
        "initComplete": function (settings, json) {
            oTable = $('#example').dataTable();

            oTable.on('click', 'tbody tr', (e) => {
                let classList = e.currentTarget.classList;

                if (classList.contains('selected')) {
                    classList.remove('selected');
                }
                else {
                    classList.add('selected');
                }
            });

            document.querySelector('#ultimateEditButton').addEventListener('click', function () {
                console.log(oTable.api().row('.selected').data().Id);
            });
        },
        "aaData": data,
        "columns": [
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
            { data: 'Email' }
        ]
    });
});*/

$(document).ready(function () {
    $('#example').dataTable({
        ajax: {
            'url': '/api/Customers',
            'dataSrc': ''
        },
        select: {
            style: 'single'
        },
        columnDefs: [
            {
                target: 0,
                visible: false,
                searchable: false
            },
            {
                target: 11,
                visible: false,
                searchable: false
            }
        ],
        initComplete: function (settings, json) {
            oTable = $('#example').dataTable();

            oTable.on('click', 'tbody tr', (e) => {
                let classList = e.currentTarget.classList;

                if (classList.contains('selected')) {
                    classList.remove('selected');
                }
                else {
                    classList.add('selected');
                }
            });

            document.querySelector('#ultimateEditButton').addEventListener('click', function () {
                //console.log(oTable.api().row('.selected').data().Id);
                var customerData = oTable.api().row('.selected').data();
                console.log(customerData.Id);
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
            { data: 'Notes' }
        ]
    });
});
