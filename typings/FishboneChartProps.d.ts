/**
 * This file was generated from FishboneChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface FishboneChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    effect: DynamicValue<string>;
    causes: ListValue;
    rootCause: ListAttributeValue<string>;
    subCause?: ListAttributeValue<string>;
    order?: ListAttributeValue<Big>;
    dynamicClass?: ListExpressionValue<string>;
    onClickEffect?: ActionValue;
    onClickCause?: ListActionValue;
}

export interface FishboneChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    effect: string;
    causes: {} | { caption: string } | { type: string } | null;
    rootCause: string;
    subCause: string;
    order: string;
    dynamicClass: string;
    onClickEffect: {} | null;
    onClickCause: {} | null;
}
