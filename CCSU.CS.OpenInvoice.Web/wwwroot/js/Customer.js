//$('#example').DataTable({
//    ajax: './../Models/SampleData/SampleCustomers.txt',
//    columns: [
//        { data: 'CustomerId' },
//        { data: 'Name' },
//        { data: 'Contact'},
//        { data: 'Address' },
//        { data: 'Address2' },
//        { data: 'City' },
//        { data: 'State' },
//        { data: 'Zip' },
//        { data: 'Country' },
//        { data: 'Phone' },
//        { data: 'Email' }
//    ]
//});

$(document).ready(function (){
    $('#example').DataTable({
        "ajax": {
            "url": "/api/customers",
            "dataSrc": ""
        },
        columns: [
            { data: 'CustomerId' },
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
});