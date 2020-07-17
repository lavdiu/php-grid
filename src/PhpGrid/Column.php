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
    public $cellContentCssStyle = "";
    public $cellContentCssClass = "";
    public $cellCssStyle = "";
    public $cellCssClass = "";
    public $visible = true;
    public $exportable = true;
    public $cellContentAttributes = "";
    public $cellAttributes = "";

    /**
     * Column constructor.
     * @param string $fieldName
     * @param string $label
     * @param bool $visible
     * @param bool $exportable
     * @param string $href
     * @param string $target
     * @param string $cellContentCssStyle
     * @param string $cellContentCssClass
     * @param string $cellCssStyle
     * @param string $cellCssClass
     * @param string $cellContentAttributes
     * @param string $cellAttributes
     */
    public function __construct(?string $fieldName = null, ?string $label = null, bool $visible = true, bool $exportable = true, ?string $href = null, ?string $target = null, ?string $cellContentCssStyle = null, ?string $cellContentCssClass = null, ?string $cellCssStyle = null, ?string $cellCssClass = null, string $cellContentAttributes = null, string $cellAttributes = null)
    {
        $this->fieldName = $fieldName;
        $this->label = $label;
        $this->href = $href;
        $this->target = $target;
        $this->cellContentCssStyle = $cellContentCssStyle;
        $this->cellContentCssClass = $cellContentCssClass;
        $this->cellCssStyle = $cellCssStyle;
        $this->cellCssClass = $cellCssClass;
        $this->visible = $visible;
        $this->exportable = $exportable;
        $this->cellContentAttributes = $cellContentAttributes;
        $this->cellAttributes = $cellAttributes;
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
    public function getCellContentCssStyle(): string
    {
        return $this->cellContentCssStyle;
    }

    /**
     * @param string $cellContentCssStyle
     * @return Column
     */
    public function setCellContentCssStyle(string $cellContentCssStyle): Column
    {
        $this->cellContentCssStyle = $cellContentCssStyle;
        return $this;
    }

    /**
     * @return string
     */
    public function getCellContentCssClass(): string
    {
        return $this->cellContentCssClass;
    }

    /**
     * @param string $cellContentCssClass
     * @return Column
     */
    public function setCellContentCssClass(string $cellContentCssClass): Column
    {
        $this->cellContentCssClass = $cellContentCssClass;
        return $this;
    }

    /**
     * @return string
     */
    public function getOuterElementCssStyle(): string
    {
        return $this->cellCssStyle;
    }

    /**
     * @param string $cellCssStyle
     * @return Column
     */
    public function setCellCssStyle(string $cellCssStyle): Column
    {
        $this->cellCssStyle = $cellCssStyle;
        return $this;
    }

    /**
     * @return string
     */
    public function getCellCssClass(): string
    {
        return $this->cellCssClass;
    }

    /**
     * @param string $cellCssClass
     * @return Column
     */
    public function setCellCssClass(string $cellCssClass): Column
    {
        $this->cellCssClass = $cellCssClass;
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
    public function getCellContentAttributes(): string
    {
        return $this->cellContentAttributes;
    }

    /**
     * @param string $cellContentAttributes
     * @return Column
     */
    public function setCellContentAttributes(string $cellContentAttributes): Column
    {
        $this->cellContentAttributes = $cellContentAttributes;
        return $this;
    }

    /**
     * @return string
     */
    public function getCellAttributes(): string
    {
        return $this->cellAttributes;
    }

    /**
     * @param string $cellAttributes
     * @return Column
     */
    public function setCellAttributes(string $cellAttributes): Column
    {
        $this->cellAttributes = $cellAttributes;
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