/**
 * This file was generated from FishboneChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, ListValue, ListActionValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface FishboneChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    causes: ListValue;
    rootCause: ListExpressionValue<string>;
    subCause?: ListExpressionValue<string>;
    order?: ListExpressionValue<Big>;
    effect: DynamicValue<string>;
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
    causes: {} | { caption: string } | { type: string } | null;
    rootCause: string;
    subCause: string;
    order: string;
    effect: string;
    dynamicClass: string;
    onClickEffect: {} | null;
    onClickCause: {} | null;
}
