<?php

namespace PhpGrid;

/**
 * Class Column
 * @package PhpGrid
 */
class Column
{
    public $index = 0;
    public $fieldName = "";
    public $label = "";
    public $format = "";
    public $href = "";
    public $target = "";
    public $innerElementCssStyle = "";
    public $innerElementCssClass = "";
    public $outerElementCssStyle = "";
    public $outerElementCssClass = "";
    public $visible = true;
    public $exportable = true;
    public $innerElementAttributes = "";
    public $outerElementAttributes = "";

    /**
     * Column constructor.
     * @param string|null $fieldName
     * @param string|null $label
     * @param bool $visible
     * @param bool $exportable
     * @param string|null $href
     * @param string|null $target
     * @param string|null $innerElementCssStyle
     * @param string|null $innerElementCssClass
     * @param string|null $outerElementCssStyle
     * @param string|null $outerElementCssClass
     * @param string|null $innerElementAttributes
     * @param string|null $outerElementAttributes
     */
    public function __construct(?string $fieldName = null, ?string $label = null, bool $visible = true, bool $exportable = true, ?string $href = null, ?string $target = null, ?string $innerElementCssStyle = null, ?string $innerElementCssClass = null, ?string $outerElementCssStyle = null, ?string $outerElementCssClass = null, string $innerElementAttributes = null, string $outerElementAttributes = null)
    {
        $this->fieldName = $fieldName;
        $this->label = $label;
        $this->href = $href;
        $this->target = $target;
        $this->innerElementCssStyle = $innerElementCssStyle;
        $this->innerElementCssClass = $innerElementCssClass;
        $this->outerElementCssStyle = $outerElementCssStyle;
        $this->outerElementCssClass = $outerElementCssClass;
        $this->visible = $visible;
        $this->exportable = $exportable;
        $this->innerElementAttributes = $innerElementAttributes;
        $this->outerElementAttributes = $outerElementAttributes;
    }


    /**
     *
     * INSERT INTO `grid` (`id`, `grid_name`, `title`, `params_list`, `expected_params_count`, `sql_query`, `settings`, `rows_per_page`, `created_by`, `created_on`, `updated_by`, `updated_on`, `column_list`) VALUES
     * (1, 'test', 'My First Grid', NULL, 0, 'SELECT  g.grupid as id , g.grupid as label , g.g_grandtotal as page_file , g.g_b as is_default , g.g_b as is_visible , FROM_UNIXTIME(g.g_dataregjistrimit, \'%Y-%m-%d\') as test FROM asm.grup g', '{\"actionButtons\":[{\"label\":\"Edit\",\"href\":\"?modulus=[modulus]&action=[action]&id={id}&edit=1\",\"icon\":null},{\"label\":\"Goog List\",\"href\":\"http://google.com\",\"icon\":\"fa fa-list\"}], \"allowExport\":true}', 10, NULL, NULL, NULL, NULL, '[{\"fieldName\":\"id\",\"label\":\"Id\",\"format\":\"text\",\"href\":\"?module=routing_table&action={label}&view={id}&\",\"innerElementCssStyle\":\"\",\"innerElementCssClass\":\"\",\"outerElementCssStyle\":\"\",\"outerElementCssClass\":\"\",\"visible\":true,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"},{\"fieldName\":\"label\",\"label\":\"Label\",\"format\":\"text\",\"href\":\"\",\"innerElementCssStyle\":\"color:red;\",\"innerElementCssClass\":\"badge\",\"outerElementCssStyle\":\"\",\"outerElementCssClass\":\"\",\"visible\":true,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"},{\"fieldName\":\"page_file\",\"label\":\"Page File\",\"format\":\"text\",\"href\":\"\",\"innerElementCssStyle\":\"\",\"innerElementCssClass\":\"\",\"outerElementCssStyle\":\"font-weight:bold;\",\"outerElementCssClass\":\"label label-danger\",\"visible\":true,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"},{\"fieldName\":\"is_default\",\"label\":\"Is Default Page\",\"format\":\"text\",\"href\":\"\",\"innerElementCssStyle\":\"\",\"innerElementCssClass\":\"\",\"outerElementCssStyle\":\"font-weight:bold;\",\"outerElementCssClass\":\"label label-danger\",\"visible\":false,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"},{\"fieldName\":\"is_visible\",\"label\":\"Is Visible Page\",\"format\":\"text\",\"href\":\"\",\"innerElementCssStyle\":\"\",\"innerElementCssClass\":\"\",\"outerElementCssStyle\":\"font-weight:bold;\",\"outerElementCssClass\":\"label label-danger\",\"visible\":true,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"},{\"fieldName\":\"test\",\"label\":\"Date field\",\"format\":\"text\",\"href\":\"\",\"innerElementCssStyle\":\"\",\"innerElementCssClass\":\"\",\"outerElementCssStyle\":\"\",\"outerElementCssClass\":\"\",\"visible\":true,\"exportable\":true,\"innerElementAttributes\":\"\",\"outerElementAttributes\":\"\"}]');
     *
     */


    /**
     * @param string $json_string
     * @return Column
     */
    public static function createFromJsonString(string $json_string)
    {
        $settings = json_decode($json_string, true);
        $object = new self($settings['fieldName']);

        foreach ($settings as $_property => $_value) {
            $object->setPropertyValue($_property, $_value);
        }
        return $object;
    }

    /**
     * @param array $settings
     * @return Column
     */
    public static function createFromAssocArray(array $settings)
    {
        $object = new self($settings['fieldName']);
        foreach ($settings as $_property => $_value) {
            $object->setPropertyValue($_property, $_value);
        }
        return $object;
    }

    public function setPropertyValue(string $property, string $value)
    {
        if (property_exists(self::class, $property)) {
            $this->$property = $value;
        }
    }

    /**
     * @return int
     */
    public function getIndex(): int
    {
        return $this->index;
    }

    /**
     * @param int $index
     * @return Column
     */
    public function setIndex(int $index): Column
    {
        $this->index = $index;
        return $this;
    }

    /**
     * @return string
     */
    public function getFieldName(): string
    {
        return $this->fieldName;
    }

    /**
     * @param string $fieldName
     * @return Column
     */
    public function setFieldName(string $fieldName): Column
    {
        $this->fieldName = $fieldName;
        return $this;
    }

    /**
     * @return string
     */
    public function getFormat(): string
    {
        return $this->format;
    }

    /**
     * @param string $format
     * @return Column
     */
    public function setFormat(string $format): Column
    {
        $this->format = $format;
        return $this;
    }

    /**
     * @return string
     */
    public function getHref(): string
    {
        return $this->href;
    }

    /**
     * @param string $href
     * @return Column
     */
    public function setHref(string $href): Column
    {
        $this->href = $href;
        return $this;
    }

    /**
     * @return string
     */
    public function getTarget(): string
    {
        return $this->target;
    }

    /**
     * @param string $target
     * @return Column
     */
    public function setTarget(string $target): Column
    {
        $this->target = $target;
        return $this;
    }


    /**
     * @return string
     */
    public function getInnerElementCssStyle(): string
    {
        return $this->innerElementCssStyle;
    }

    /**
     * @param string $innerElementCssStyle
     * @return Column
     */
    public function setInnerElementCssStyle(string $innerElementCssStyle): Column
    {
        $this->innerElementCssStyle = $innerElementCssStyle;
        return $this;
    }

    /**
     * @return string
     */
    public function getInnerElementCssClass(): string
    {
        return $this->innerElementCssClass;
    }

    /**
     * @param string $innerElementCssClass
     * @return Column
     */
    public function setInnerElementCssClass(string $innerElementCssClass): Column
    {
        $this->innerElementCssClass = $innerElementCssClass;
        return $this;
    }

    /**
     * @return string
     */
    public function getOuterElementCssStyle(): string
    {
        return $this->outerElementCssStyle;
    }

    /**
     * @param string $outerElementCssStyle
     * @return Column
     */
    public function setOuterElementCssStyle(string $outerElementCssStyle): Column
    {
        $this->outerElementCssStyle = $outerElementCssStyle;
        return $this;
    }

    /**
     * @return string
     */
    public function getOuterElementCssClass(): string
    {
        return $this->outerElementCssClass;
    }

    /**
     * @param string $outerElementCssClass
     * @return Column
     */
    public function setOuterElementCssClass(string $outerElementCssClass): Column
    {
        $this->outerElementCssClass = $outerElementCssClass;
        return $this;
    }

    /**
     * @return bool
     */
    public function isVisible(): bool
    {
        return $this->visible;
    }

    /**
     * @param bool $visible
     * @return Column
     */
    public function setVisible(bool $visible): Column
    {
        $this->visible = $visible;
        return $this;
    }

    /**
     * @return bool
     */
    public function isExportable(): bool
    {
        return $this->exportable;
    }

    /**
     * @param bool $exportable
     * @return Column
     */
    public function setExportable(bool $exportable): Column
    {
        $this->exportable = $exportable;
        return $this;
    }

    /**
     * @return string
     */
    public function getInnerElementAttributes(): string
    {
        return $this->innerElementAttributes;
    }

    /**
     * @param string $innerElementAttributes
     * @return Column
     */
    public function setInnerElementAttributes(string $innerElementAttributes): Column
    {
        $this->innerElementAttributes = $innerElementAttributes;
        return $this;
    }

    /**
     * @return string
     */
    public function getOuterElementAttributes(): string
    {
        return $this->outerElementAttributes;
    }

    /**
     * @param string $outerElementAttributes
     * @return Column
     */
    public function setOuterElementAttributes(string $outerElementAttributes): Column
    {
        $this->outerElementAttributes = $outerElementAttributes;
        return $this;
    }

    /**
     * @return string
     */
    public function getLabel(): string
    {
        return $this->label;
    }

    /**
     * @param string $label
     * @return Column
     */
    public function setLabel(string $label): Column
    {
        $this->label = $label;
        return $this;
    }


}