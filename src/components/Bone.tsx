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
        [props.onClickBone]
    );

    const rootCause = useMemo(
        () =>
            props.onClickBone !== undefined ? (
                <button
                    className="btn mx-button btn-primary rootcause"
                    onClick={() => handleOnClickBone(props.bone)}
                    tabIndex={props.tabIndex || 0}
                >
                    {props.bone.rootCause}
                </button>
            ) : (
                <div className="rootcause blue">{props.bone.rootCause}</div>
            ),
        [props.bone.rootCause, props.onClickBone, handleOnClickBone]
    );

    const subBones = useMemo(
        () =>
            props.bone.subCauses
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(iBone =>
                    props.onClickBone !== undefined ? (
                        <button
                            className="btn mx-button btn-default stat"
                            onClick={() => handleOnClickBone(iBone)}
                            tabIndex={props.tabIndex || 0}
                        >
                            {iBone.rootCause}
                        </button>
                    ) : (
                        <div className="stat">{iBone.rootCause}</div>
                    )
                ),
        [props.bone.subCauses, props.onClickBone, handleOnClickBone]
    );

    return (
        <div
            className={classNames("cause", { top: props.top === true }, { bottom: props.top === false })}
            style={{ gridRow: props.top ? 1 : 3, gridColumn: props.column }}
        >
            {rootCause}
            <div className="subcause">{subBones}</div>
        </div>
    );
}
