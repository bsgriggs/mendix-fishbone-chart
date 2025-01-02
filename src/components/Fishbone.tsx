import classNames from "classnames";
import { CSSProperties, ReactElement, createElement, useMemo } from "react";
import ICause from "../../typings/Cause";
import { Cause } from "./Cause";

export interface FishboneProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;

    effect: string | undefined;

    causes: ICause[];

    onClickCause?: (cause: ICause) => void;
    onClickEffect?: () => void;
}

export function Fishbone(props: FishboneProps): ReactElement {
    const numberOfColumns = useMemo(() => Math.round(props.causes.length / 2), [props.causes]);

    return (
        <div
            id={props.name}
            className={classNames("fishbone-container", props.class)}
            style={{ ...props.style, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr) .75fr` }}
            tabIndex={props.tabIndex}
        >
            <div className="effect" style={{ gridColumn: numberOfColumns + 1 }}>
                {props.onClickEffect !== undefined ? (
                    <button
                        className="btn mx-button btn-default btn-block effect-text"
                        onClick={() => {
                            if (props.onClickEffect !== undefined) {
                                props.onClickEffect();
                            }
                        }}
                        tabIndex={props.tabIndex || 0}
                    >
                        {props.effect}
                    </button>
                ) : (
                    <div className="effect-text">{props.effect}</div>
                )}
            </div>
            <div className="line" style={{ gridColumnStart: 1, gridColumnEnd: numberOfColumns + 2 }} />

            {props.causes
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((cause, index) => (
                    <Cause
                        key={cause.obj.id}
                        cause={cause}
                        top={index % 2 === 0}
                        column={Math.ceil((numberOfColumns * 2 - index) / 2)}
                        onClickCause={props.onClickCause}
                    />
                ))}
        </div>
    );
}
