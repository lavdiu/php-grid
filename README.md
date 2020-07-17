# PhpGrid
PHP Grid - simple php class that allows building dynamic grids using PHP and JS

## Getting Started
### Prerequisites
This class relies on the following libaries:
 * `box/spout` and `phpoffice/phpspreadsheet` to generate Excel exports on the server side
 * [SheetJS](https://github.com/sheetjs/sheetjs) to generate Excel/CSV export in the browser.
 * [FontAwesome](https://fontawesome.com/) to display icons
 * [JQuery](https://jquery.com/) and 
 * [Bootstrap 4](https://getbootstrap.com/)

### Installation
To install this library use 
```bash
composer require lavdiu/php-grid
```  

Copy `grid.js` from `assets/` folder to your assets folder or root of your web directory and include it in your page.  

### Usage
```php
require_once __DIR__ . '/vendor/autoload.php';

use PhpGrid\PhpGrid;
use PhpGrid\Column;
use PhpGrid\ActionButton;

$pdo = new PDO('mysql:host=localhost;dbname=database', 'username', 'password');

$grid = new PhpGrid($pdo, 'test_grid');
$grid->setTitle('First Grid')
    ->setRowsPerPage(10)
    ->setSqlQuery("SELECT id, name, email, created_on FROM contacts")
    ->addColumn(new Column('id', 'Contact Id', true, true, '?mod=contact&id={id}', '_blank'))
    ->addColumn(new Column('email', 'Email Address'))
    ->addActionButton(new ActionButton('View', '?mod=contact&id={id}', 'fa fa-eye'))
    ->addActionButton(new ActionButton('Update', '?mod=contact&id={id}&action=update', 'fa fa-pencil'))
    ->addActionButton(new ActionButton('Delete', '?mod=contact&id={id}&action=delete', 'fa fa-trash'));

$col1 = new Column('name', 'Full Name');
$col1->setCellCssClass('text-center'); #set css class of the Table Td element
$col1->setCellCssStyle('background-color:silver'); #set css style of the Table TD element
$grid->addColumn($col1);

$col2 = new Column('created_on', 'Registration Date', true);
$col2->setCellContentCssClass('border border-danger'); #set css style of the element inside table td
$col2->setCellContentCssStyle('color:red'); #set css style of the element inside table td
$grid->addColumn($col2);

#catch and handle the ajax request 
if ($grid->isReadyToHandleRequests()) {
    $grid->bootstrap();
}

$grid->setDebug(true); #output additional debugging info in json responses


echo $grid->draw();

```

See [examples](https://github.com/lavdiu/php-grid/tree/master/examples) directory for more examples