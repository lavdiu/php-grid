<?php

namespace PhpGrid;

/**
 * Class Column
 * @package Lavdiu\PhpGrid
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
     * @param string $fieldName
     * @param string $label
     * @param bool $visible
     * @param bool $exportable
     * @param string $href
     * @param string $target
     * @param string $innerElementCssStyle
     * @param string $innerElementCssClass
     * @param string $outerElementCssStyle
     * @param string $outerElementCssClass
     * @param string $innerElementAttributes
     * @param string $outerElementAttributes
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