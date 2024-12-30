import { ReactElement, createElement } from "react";
import { Fishbone } from "./components/Fishbone";
import { FishboneChartPreviewProps } from "../typings/FishboneChartProps";

export function preview(props: FishboneChartPreviewProps): ReactElement {
    return <Fishbone name={""} class={props.class} style={props.styleObject} defect={props.defect} bones={[]} />;
}

export function getPreviewCss(): string {
    return require("./ui/FishboneChart.scss");
}
