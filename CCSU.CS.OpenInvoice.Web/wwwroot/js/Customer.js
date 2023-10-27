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

function convertFormToJSON(form) {
    //console.log("Hello from inside Customer.js convertFormToJSON");
    return $(form)
        .serializeArray()
        .reduce(function (json, { name, value }) {
            json[name] = value;
            return json;
        }, {});
}

function submitForm(formData) {
    //console.log("Hello from inside Customer.js submitForm");
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
            alert("Success")
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
        }
    });

}

/*$(document).ready(function () {
    $('#example').DataTable({
        "ajax": {
            "url": "/api/Customers",
            "dataSrc": ""
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
            { data: 'Email' }
        ]
    });
});*/
