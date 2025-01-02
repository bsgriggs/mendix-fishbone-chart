import classNames from "classnames";
import { CSSProperties, ReactElement, createElement, useMemo } from "react";
import IBone from "../../typings/Bone";
import { Bone } from "./Bone";

export interface FishboneProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;

    defect: string | undefined;

    bones: IBone[];

    onClickBone?: (bone: IBone) => void;
    onClickDefect?: () => void;
}

export function Fishbone(props: FishboneProps): ReactElement {
    const numberOfColumns = useMemo(() => Math.round(props.bones.length / 2), [props.bones]);

    return (
        <div
            id={props.name}
            className={classNames("fishbone-container", props.class)}
            style={{ ...props.style, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr) .75fr` }}
            tabIndex={props.tabIndex}
        >
            <div className="defect" style={{ gridColumn: numberOfColumns + 1 }}>
                {props.onClickDefect !== undefined ? (
                    <button
                        className="btn mx-button btn-default btn-block defect-text"
                        onClick={() => {
                            if (props.onClickDefect !== undefined) {
                                props.onClickDefect();
                            }
                        }}
                        tabIndex={props.tabIndex || 0}
                    >
                        {props.defect}
                    </button>
                ) : (
                    <div className="defect-text">{props.defect}</div>
                )}
            </div>
            <div className="line" style={{ gridColumnStart: 1, gridColumnEnd: numberOfColumns + 2 }} />

            {props.bones
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((iBone, index) => (
                    <Bone
                        key={iBone.obj.id}
                        bone={iBone}
                        top={index % 2 === 0}
                        column={Math.ceil((numberOfColumns * 2 - index) / 2)}
                        onClickBone={props.onClickBone}
                    />
                ))}
        </div>
    );
}
