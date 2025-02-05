import { ChangeEvent, FC } from "react";

interface InputProps {
    type: "text" | "number" | "email" | "password";
    label: string;
    value: string | number;
    name: string;
    placeholder: string;
    error: boolean;
    disabled?: boolean;
    labelClassName: string;
    inputClassName: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
    type,
    label,
    value,
    name,
    placeholder,
    error,
    disabled,
    labelClassName,
    inputClassName,
    onChange,
}) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={label} className={labelClassName}>
                {label}
            </label>
            <input
                className={inputClassName}
                type={type}
                id={label}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <p className="error">Input filed can't be empty!</p>}
        </div>
    );
};

export default Input;
