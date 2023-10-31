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
    }
});

/*$("#customer-form").on("edit", function () {
    console.log("Hello from editting modal!");
    //$("#customerName").val("Test Name :D");
});*/

//$(document).ready(function () {
//    $("#modalEdit").click(function () {
//        $('#myModal').modal('show');
//        $("#customerName").val("Test Name :D");
//    });
//});

//function fillAddCustomerModal() {
//    $('#myModal').modal('show');
//    $("#customerName").val("Test Name :D");
//}

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
            location.reload(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });

}

var oTable;

$.ajax({
    'url': "/api/Customers",
    'method': "GET",
    'contentType': 'application/json'
}).done(function (data) {
    $('#example').dataTable({
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
                    //oTable.rows('.selected').nodes().each((row) => row.classList.remove('selected'));
                    classList.add('selected');
                }
            });

            document.querySelector('#ultimateEditButton').addEventListener('click', function () {
                //table.row('.selected').remove().draw(false);
                console.log(oTable.api().row('.selected').data().Id);
            });
            //alert('DataTables has finished its initialisation.');
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
            { data: 'Email' }/*,
            {
                data: null,
                render: function (data, type, row) {
                    document.getElementById("example").addEventListener("click", function (e) {
                        const tgt = e.target;
                        if (tgt.classList.contains("editButton")) {
                            e.preventDefault(); // stop the button if not type=button 
                            console.log("Hello from A editButton!");
                            console.log(row);
                        }
                    });

                    return '<button type="edit" class="btn btn-link editButton" data-toggle="modal" data-target="#myModal" data-whatever="editing">Edit</button>';
                }
            }
            {
                data: null,
                render: function (data, type, row) {
                    $("#edit").click(function (e) {
                        //console.log($('#example').DataTable().row().data());
                        console.log(row);
                    });

                    counter = 1;
                    myButton = '';
                    row().forEach(myFunction);
                    function myFunction() {
                        myButton = '<button type="edit" id="edit'
                            + counter + '" class="btn btn-link" data-toggle="modal" data-target="#myModal" data-whatever="editing">Edit</button>';
                        counter += 1;
                        return myButton;
                    }

                    return '<button type="edit" id="edit'
                        + '' + '" class="btn btn-link" data-toggle="modal" data-target="#myModal" data-whatever="editing">Edit</button>';
                }
            }*/
        ]
    })/*.on('click', 'tbody tr', (e) => {
        let classList = e.currentTarget.classList;

        if (classList.contains('selected')) {
            classList.remove('selected');
        }
        else {
            rows('.selected').nodes().each((row1) => row1.classList.remove('selected'));
            classList.add('selected');
        }
    })*/;
});
