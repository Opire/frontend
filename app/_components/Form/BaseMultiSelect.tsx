import { useState } from "react";
import { MultiSelect } from "@mantine/core";

export function BaseMultiSelect<T> ({
    label,
    options,
    value,
    onChange,
    required,
    validator,
}: {
    label: string;
    options: T[];
    value: T[];
    onChange: (value: T[]) => void;
    required?: boolean;
    validator: (value: T[], required: boolean | undefined) => string | null;
}) {
    const [error, setError] = useState<string | null>(null);

    const onLocalChange = (newValues: T[]) => {
        onChange(newValues);

        if (newValues.length === 0) {
            return;
        }

        updateErrorState(newValues);
    };

    const updateErrorState = (value: T[]) => {
        const error = validator(value, required);
        setError(error);
    };

    return (
        <MultiSelect
            data={options as string[]}
            label={label}
            required={required}
            onChange={(el) => onLocalChange(el as T[])}
            value={value as string[]}
            error={error}
            searchable={true}
        />
    );
}
