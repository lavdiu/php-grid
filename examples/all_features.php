<!DOCTYPE html>
<html lang="en-US">
<head>
	<title>Example 1</title>
	<!--Jquery-->
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

	<!--Bootstrap-->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

	<!--FontAwesome-->
	<script src="https://kit.fontawesome.com/d0075f0299.js" crossorigin="anonymous"></script>

	<!--SheetJS-->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.3/xlsx.extendscript.js"></script>
	<!--JS Grid-->
	<script type="text/javascript" src="./assets/grid.js"></script>

</head>
<body>
<div class="container">
<?php
require_once __DIR__ . '/vendor/autoload.php';

use PhpGrid\PhpGrid;
use PhpGrid\Column;
use PhpGrid\ActionButton;

$pdo = new PDO('mysql:host=localhost;dbname=database', 'username', 'password');

$grid = new PhpGrid($pdo, 'test_grid');
$grid->setTitle('First Grid')
    ->setRowsPerPage(10)
    ->setSqlQuery("SELECT id, name, email, created_on FROM person")
    ->addColumn(new Column('id', 'Person Id', true, true, '?mod=person&id={id}', '_blank'))
    ->addColumn(new Column('name', 'Full Name'))
    ->addColumn(new Column('email', 'Email Address'))
    ->addColumn(new Column('created_on', 'Registration Date', false))
    ->addActionButton(new ActionButton('View', '?mod=person&id={id}', 'fa fa-eye'))
    ->addActionButton(new ActionButton('Update', '?mod=person&id={id}&action=update', 'fa fa-pencil'))
    ->addActionButton(new ActionButton('Delete', '?mod=person&id={id}&action=delete', 'fa fa-trash'));

if ($grid->isReadyToHandleRequests()) {
    $grid->bootstrap();
}

echo $grid->draw();


