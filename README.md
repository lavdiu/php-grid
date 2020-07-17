# PhpGrid
PHP Grid - simple php class that allows building dynamic grids using PHP and JS

#Getting Started
##Prerequisites
This class relies on the following libaries:
 * `box/spout` to generate Excel exports on the server side 
 * `phpoffice/phpspreadsheet` to generate Excel exports on the server side
 * [SheetJS](https://github.com/sheetjs/sheetjs) to generate Excel/CSV export in the browser.
 * `ext-pdo` to perform queries in the server side
 * `ext-json` to encode/decode JSON requests 
 
It also requires [JQuery](https://jquery.com/) and [Bootstrap](https://getbootstrap.com/).
##Installation
To install this library use `composer require lavdiu/php-grid`  
Copy `grid.js` from `assets/` folder to your assets folder or root of your web directory

##Usage
```php
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
```