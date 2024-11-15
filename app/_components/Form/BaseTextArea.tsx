import { FC, useState } from "react";
import { Textarea } from "@mantine/core";

export const BaseTextArea: FC<{
    validator: (value?: string, required?: boolean) => string | null;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    minRows?: number
    maximumCharsLength?: number
}> = ({
    validator,
    value,
    onChange,
    label = "",
    placeholder = "",
    required = false,
    minRows = 1,
    maximumCharsLength = undefined,
}) => {
    const [error, setError] = useState<string | null>(null);

    const onLocalChange = (newValue: string) => {
        onChange(newValue);
        updateErrorState(newValue);
    };

    const updateErrorState = (value: string) => {
        const error = validator(value, required);
        setError(error);
    };

    return (
        <Textarea
            onBlur={() => updateErrorState(value)}
            required={required}
            label={label}
            placeholder={placeholder}
            value={value}
            autosize
            minRows={minRows}
            onChange={(value) => onLocalChange(value.currentTarget.value)}
            error={error}
            rightSection={maximumCharsLength && <MaximumChars length={value.length} maximumLength={maximumCharsLength} />}
            rightSectionWidth='80px'
            rightSectionProps={{
                style: {
                    alignItems: "flex-end",
                },
            }}
        />
    );
};

export const MaximumChars: FC<{
    length: number,
    maximumLength: number;
}> = ({
    length,
    maximumLength,
}) => (
    <span>
        {`${length}/${maximumLength}`}
    </span>
);
