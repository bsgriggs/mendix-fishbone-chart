import { ReactElement, createElement, useMemo } from "react";
import { Fishbone } from "./components/Fishbone";
import { ValueStatus } from "mendix";
import { FishboneChartContainerProps } from "../typings/FishboneChartProps";

import "./ui/FishboneChart.scss";
import ICause from "../typings/Cause";

export function FishboneChart(props: FishboneChartContainerProps): ReactElement {
    const causes: ICause[] = useMemo(() => {
        const newCauses: ICause[] = [];
        if (props.causes.status === ValueStatus.Available) {
            props.causes.items?.forEach(objItem => {
                const iRootCause = props.rootCause.get(objItem).value;
                const subClause = props.subCause !== undefined ? props.subCause.get(objItem).value : undefined;
                const existingBone = newCauses.find(cause => cause.rootCause === iRootCause);
                if (existingBone) {
                    existingBone.subCauses.push({
                        obj: objItem,
                        rootCause: subClause as string,
                        order: props.order ? Number(props.order.get(objItem).value) : undefined,
                        dynamicClass: props.dynamicClass?.get(objItem).value,
                        subCauses: []
                    });
                } else {
                    newCauses.push({
                        obj: objItem,
                        rootCause: iRootCause as string,
                        order: props.order ? Number(props.order.get(objItem).value) : undefined,
                        dynamicClass: props.dynamicClass?.get(objItem).value,
                        subCauses:
                            subClause !== undefined && subClause.trim() !== ""
                                ? [
                                      {
                                          obj: objItem,
                                          rootCause: subClause as string,
                                          order: props.order ? Number(props.order.get(objItem).value) : undefined,
                                          subCauses: []
                                      }
                                  ]
                                : []
                    });
                }
            });
        }
        return newCauses;
    }, [props.causes, props.dynamicClass, props.order, props.rootCause, props.subCause]);

    return (
        <Fishbone
            name={props.name}
            tabIndex={props.tabIndex}
            class={props.class}
            style={props.style}
            causes={causes}
            effect={props.effect.value}
            onClickCause={
                props.onClickCause ? (bone: ICause) => props.onClickCause?.get(bone.obj).execute() : undefined
            }
            onClickEffect={props.onClickEffect ? () => props.onClickEffect?.execute() : undefined}
        />
    );
}
