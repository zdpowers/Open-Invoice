$('#example').DataTable({
    ajax: './js/SampleCustomers.txt',
    columns: [
        { data: 'CustomerId' },
        { data: 'Name' },
        { data: 'Contact'},
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