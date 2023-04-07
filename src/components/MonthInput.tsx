import "../assets/js/modernizr.js";
import React from "react";

declare const Modernizr: any;

export const MonthInput = React.forwardRef((props: {
    min: string, max: string, value: string,
    onChange: (value: string) => void
}, ref) => {
    const monthInput = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => {
        return {
            checkValidity: () => {
                if (monthInput.current === null) {
                    return false;
                }
                return monthInput.current.checkValidity();
            }
        };
    }, []);

    if (Modernizr.inputtypes.month) {
        return <input type="month" id="issueMonth" name="issueMonth"
            ref={monthInput}
            required min={props.min} max={props.max} value={props.value}
            onChange={e => props.onChange(e.currentTarget.value)}
            className="p-1 font-sans text-base w-full box-border border-solid border rounded-md invalid:border-pink-500 invalid:text-pink-600" />
    } else {
        // TODO: implement fallback
        return <div>Month input type not supported</div>;
    }
});
