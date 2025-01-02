import { ReactElement, createElement } from "react";
import { Fishbone } from "./components/Fishbone";
import { FishboneChartPreviewProps } from "../typings/FishboneChartProps";
import { ObjectItem } from "mendix";

export function preview(props: FishboneChartPreviewProps): ReactElement {
    const hasSubCause = props.subCause && props.subCause.trim() !== "";
    return (
        <Fishbone
            name={""}
            class={props.class}
            style={props.styleObject}
            effect={props.effect && props.effect.trim() !== "" ? props.effect : "Select effect"}
            causes={[
                {
                    obj: { id: "1" } as ObjectItem,
                    rootCause:
                        props.rootCause && props.rootCause.trim() !== "" ? `{${props.rootCause}}` : "Select root cause",
                    subCauses: hasSubCause
                        ? [
                              {
                                  obj: { id: "1" } as ObjectItem,
                                  rootCause: `{${props.subCause}}`,
                                  subCauses: []
                              }
                          ]
                        : []
                },
                {
                    obj: { id: "2" } as ObjectItem,
                    rootCause: "A",
                    subCauses: hasSubCause
                        ? [
                              {
                                  obj: { id: "2" } as ObjectItem,
                                  rootCause: "A1",
                                  subCauses: []
                              }
                          ]
                        : []
                },
                {
                    obj: { id: "3" } as ObjectItem,
                    rootCause: "B",
                    subCauses: hasSubCause
                        ? [
                              {
                                  obj: { id: "3" } as ObjectItem,
                                  rootCause: "B1",
                                  subCauses: []
                              }
                          ]
                        : []
                }
            ]}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/FishboneChart.scss");
}
