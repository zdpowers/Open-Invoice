﻿<?php
 
/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simple to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = 'Customers';
 
// Table's primary key
$primaryKey = 'Id';
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'ID', 'dt' => 0 ),
    array( 'db' => 'Name',  'dt' => 1 ),
    array( 'db' => 'Contact',   'dt' => 2 ),
    array( 'db' => 'Address',     'dt' => 3 ),

    array( 'db' => 'Address2', 'dt' => 4 ),
    array( 'db' => 'City',  'dt' => 5 ),
    array( 'db' => 'State',   'dt' => 6 ),
    array( 'db' => 'Zip',     'dt' => 7 ),

    array( 'db' => 'Country', 'dt' => 8 ),
    array( 'db' => 'Phone',  'dt' => 9 ),
    array( 'db' => 'Email',   'dt' => 10 )
);
 
// SQL server connection information
$sql_details = array(
    'user' => '',
    'pass' => '',
    'db'   => 'OpenInvoice.db',
    'host' => 'https://localhost:7140/'
    // ,'charset' => 'utf8' // Depending on your PHP and MySQL config, you may need this
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);