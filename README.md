# PhpGrid
PHP Grid - simple php class that allows building dynamic grids using PHP and JS

## Getting Started
### Prerequisites
This class relies on the following libaries:
 * `box/spout` and `phpoffice/phpspreadsheet` to generate Excel exports on the server side
 * [SheetJS](https://github.com/sheetjs/sheetjs) to generate Excel/CSV export in the browser.
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
require_once __DIR__ . '/../vendor/autoload.php';

use PhpGrid\PhpGrid;
use PhpGrid\Column;
use PhpGrid\ActionButton;

$pdo = new PDO('mysql:host=localhost;dbname=database', 'username', 'password');

$grid = new PhpGrid($pdo, 'contacts_list');
$grid->setTitle('List of all contacts')
    ->setRowsPerPage(10)
    ->setSqlQuery("SELECT id, name, email, created_on FROM contact_list")
    ->addColumn(new Column('id', 'Contact Id', true, true, '?mod=contact&id={id}', '_blank'))
    ->addColumn(new Column('email', 'Email Address'))
    ->addActionButton(new ActionButton('View', '?mod=contact&id={id}', 'fa fa-eye'))
    ->addActionButton(new ActionButton('Update', '?mod=contact&id={id}&action=update', 'fa fa-pencil'));

/**
 * Setting custom attributes to the button
 */
$deleteButton = new ActionButton('Delete', '?mod=contact&id={id}&action=delete', 'fa fa-trash');
$deleteButton->addAttribute('onclick', "return confirm('Are you sure?');");
$grid->addActionButton($deleteButton);

/**
 * Set custom style/classes to the cell itself
 */
$col1 = new Column('name', 'Full Name');
$col1->setOuterElementCssClass('text-center');
$col1->setOuterElementCssStyle('background-color:silver');
$grid->addColumn($col1);

/**
 * Set custom style/classes to the content of the cell
 */
$col2 = new Column('created_on', 'Registration Date', true);
$col2->setInnerElementCssClass('border border-danger');
$col2->setInnerElementCssStyle('color:red;cursor:pointer;');
$grid->addColumn($col2);

$grid->setDebug(true); #output additional debugging info in json responses

if ($grid->isReadyToHandleRequests()) {
    $grid->bootstrap();
}

echo $grid->draw();

```

See [examples](https://github.com/lavdiu/php-grid/tree/master/examples) directory for more examples
