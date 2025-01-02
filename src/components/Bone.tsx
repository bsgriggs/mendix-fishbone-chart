import classNames from "classnames";
import { ReactElement, createElement, useMemo, useCallback } from "react";
import IBone from "../../typings/Bone";

export interface BoneProps {
    top: boolean;
    column: number;
    bone: IBone;

    tabIndex?: number;
    onClickBone?: (bone: IBone) => void;
}

export function Bone(props: BoneProps): ReactElement {
    const handleOnClickBone = useCallback(
        (bone: IBone) => {
            if (props.onClickBone !== undefined) {
                props.onClickBone(bone);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onClickBone]
    );

    const rootCause = useMemo(
        () =>
            props.onClickBone !== undefined ? (
                <button
                    className={classNames("btn mx-button btn-primary rootcause", props.bone.dynamicClass)}
                    onClick={() => handleOnClickBone(props.bone)}
                    tabIndex={props.tabIndex || 0}
                >
                    {props.bone.rootCause}
                </button>
            ) : (
                <div className={classNames("rootcause blue", props.bone.dynamicClass)}>{props.bone.rootCause}</div>
            ),
        [props.bone, props.onClickBone, handleOnClickBone, props.tabIndex]
    );

    const subBones = useMemo(
        () =>
            props.bone.subCauses
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(iBone =>
                    props.onClickBone !== undefined ? (
                        <button
                            className={classNames("btn mx-button btn-default stat", props.bone.dynamicClass)}
                            onClick={() => handleOnClickBone(iBone)}
                            tabIndex={props.tabIndex || 0}
                        >
                            {iBone.rootCause}
                        </button>
                    ) : (
                        <div className={classNames("stat", props.bone.dynamicClass)}>{iBone.rootCause}</div>
                    )
                ),
        [props.bone.subCauses, props.bone.dynamicClass, props.onClickBone, handleOnClickBone, props.tabIndex]
    );

    return (
        <div
            className={classNames(
                `cause bone-col-${props.column}`,
                { top: props.top === true },
                { bottom: props.top === false },
                props.bone.dynamicClass
            )}
            style={{ gridRow: props.top ? 1 : 3, gridColumn: props.column }}
        >
            {rootCause}
            <div className="subcause">{subBones}</div>
        </div>
    );
}
