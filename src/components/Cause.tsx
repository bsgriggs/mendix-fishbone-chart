import classNames from "classnames";
import { ReactElement, createElement, useMemo, useCallback } from "react";
import ICause from "../../typings/Cause";

export interface CauseProps {
    top: boolean;
    column: number;
    cause: ICause;

    tabIndex?: number;
    onClickCause?: (cause: ICause) => void;
}

export function Cause(props: CauseProps): ReactElement {
    const handleOnClickCause = useCallback(
        (cause: ICause) => {
            if (props.onClickCause !== undefined) {
                props.onClickCause(cause);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.onClickCause]
    );

    const rootCause = useMemo(
        () =>
            props.onClickCause !== undefined ? (
                <button
                    className={classNames("btn mx-button btn-primary rootcause", props.cause.dynamicClass)}
                    onClick={() => handleOnClickCause(props.cause)}
                    tabIndex={props.tabIndex || 0}
                >
                    {props.cause.rootCause}
                </button>
            ) : (
                <div className={classNames("rootcause blue", props.cause.dynamicClass)}>{props.cause.rootCause}</div>
            ),
        [props.cause, props.onClickCause, handleOnClickCause, props.tabIndex]
    );

    const subcauses = useMemo(
        () =>
            props.cause.subCauses
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(iCause =>
                    props.onClickCause !== undefined ? (
                        <button
                            className={classNames("btn mx-button btn-default stat", props.cause.dynamicClass)}
                            onClick={() => handleOnClickCause(iCause)}
                            tabIndex={props.tabIndex || 0}
                        >
                            {iCause.rootCause}
                        </button>
                    ) : (
                        <div className={classNames("stat", props.cause.dynamicClass)}>{iCause.rootCause}</div>
                    )
                ),
        [props.cause.subCauses, props.cause.dynamicClass, props.onClickCause, handleOnClickCause, props.tabIndex]
    );

    return (
        <div
            className={classNames(
                `cause cause-col-${props.column}`,
                { top: props.top === true },
                { bottom: props.top === false },
                props.cause.dynamicClass
            )}
            style={{ gridRow: props.top ? 1 : 3, gridColumn: props.column }}
        >
            {rootCause}
            <div className="subcause">{subcauses}</div>
        </div>
    );
}
