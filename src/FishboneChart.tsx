import { ReactElement, createElement, useMemo } from "react";
import { Fishbone } from "./components/Fishbone";
import { ValueStatus } from "mendix";
import { FishboneChartContainerProps } from "../typings/FishboneChartProps";

import "./ui/FishboneChart.scss";
import IBone from "../typings/Bone";

export function FishboneChart(props: FishboneChartContainerProps): ReactElement {
    const bones: IBone[] = useMemo(() => {
        const newBones: IBone[] = [];
        if (props.causes.status === ValueStatus.Available) {
            props.causes.items?.forEach(objItem => {
                const iRootCause = props.rootCause.get(objItem).value;
                const subClause = props.subCause !== undefined ? props.subCause.get(objItem).value : undefined;
                const existingBone = newBones.find(iBone => iBone.rootCause === iRootCause);
                if (existingBone) {
                    existingBone.subCauses.push({
                        obj: objItem,
                        rootCause: subClause as string,
                        order: props.order ? Number(props.order.get(objItem).value) : undefined,
                        dynamicClass: props.dynamicClass?.get(objItem).value,
                        subCauses: []
                    });
                } else {
                    newBones.push({
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
        return newBones;
    }, [props.causes, props.dynamicClass, props.order, props.rootCause, props.subCause]);

    return (
        <Fishbone
            name={props.name}
            tabIndex={props.tabIndex}
            class={props.class}
            style={props.style}
            bones={bones}
            defect={props.defect.value}
            onClickBone={props.onClickBone ? (bone: IBone) => props.onClickBone?.get(bone.obj).execute() : undefined}
            onClickDefect={props.onClickDefect ? () => props.onClickDefect?.execute() : undefined}
        />
    );
}
