import React from "react";
import "../assets/js/modernizr.js";
import { parseYearMonth } from "../utils/date.js";

declare const Modernizr: any;

export const _MonthInput = React.forwardRef((props: {
    min: string, max: string, value: string,
    onChange: (value: string) => void
}, ref) => {
    const minDate = parseYearMonth(props.min);
    const maxDate = parseYearMonth(props.max);

    const [month, setMonth] = React.useState(props.value.substring(5, 7));
    const [year, setYear] = React.useState(props.value.substring(0, 4));
    const [valid, setValid] = React.useState(true);

    const setValue = (year: string, month: string) => {
        setYear(year);
        setMonth(month);

        const value = year + "-" + month;
        const valueDate = parseYearMonth(value);
        const validity = valueDate >= minDate && valueDate <= maxDate;
        setValid(validity);

        if (value !== props.value) {
            props.onChange(value);
        }
    }

    React.useImperativeHandle(ref, () => {
        return {
            checkValidity: () => {
                return valid;
            }
        };
    }, [valid]);

    const yearOptions = [] as JSX.Element[];
    for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
        yearOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return <div>
        <select name="month" value={month} onChange={e => setValue(year, e.target.value)}
            className="font-sans text-base box-border border-solid border invalid:border-pink-500 invalid:text-pink-600">
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">Mar</option>
            <option value="04">Apr</option>
            <option value="05">May</option>
            <option value="06">Jun</option>
            <option value="07">Jul</option>
            <option value="08">Aug</option>
            <option value="09">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
        </select>
        <select name="year" value={year} onChange={e => setValue(e.target.value, month)}
            className="font-sans text-base box-border border-solid border invalid:border-pink-500 invalid:text-pink-600">
            {yearOptions}
        </select>
        {valid || <div className="text-xs text-pink-500">
            Must be between {props.min} and {props.max}.
        </div>
        }
    </div>
});

export const MonthInput = React.forwardRef((props: {
    min: string, max: string, value: string,
    onChange: (value: string) => void
}, ref) => {
    const monthInput = React.useRef<HTMLInputElement>(null);
    const customInput = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => {
        return {
            checkValidity: () => {
                if (monthInput.current !== null) {
                    return monthInput.current.checkValidity();;
                }
                if (customInput.current !== null) {
                    return customInput.current.checkValidity();
                }
                return false;
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
        return <_MonthInput {...props} ref={customInput} />;
    }
});
