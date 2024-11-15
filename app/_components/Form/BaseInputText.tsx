import { FC, useState } from "react";
import { TextInput, TextInputProps } from "@mantine/core";
// import { TextValueObject } from "../../../Core/Shared/Domain/VOs/TextValueObject";
// import { TextHaveInvalidChars } from "../../../Core/Shared/Domain/Exceptions/TextHaveInvalidChars";
// import { TextMustHaveSomeChars } from "../../../Core/Shared/Domain/Exceptions/TextMustHaveSomeChars";

export function validateText (text?: string, required?: boolean) {
    // if (!required && !text) {
    //     return null;
    // }
    //
    // if (required && !text) {
    //     return 'Campo obligatorio';
    // }
    //
    // try {
    //     new TextValueObject(text ?? '');
    // } catch (err) {
    //     if (err instanceof TextHaveInvalidChars) {
    //         return 'Hay caracteres inválidos';
    //     }
    //
    //     if (err instanceof TextMustHaveSomeChars) {
    //         return 'Debe tener texto';
    //     }
    // }

    return null;
}

type TextInputPropsToOmit = "onChange" | "value";
interface BaseInputTextProps extends Omit<TextInputProps, TextInputPropsToOmit> {
    value: string;
    onChange: (value: string) => void;
}

export const BaseInputText: FC<BaseInputTextProps> = ({
    label,
    placeholder,
    value,
    onChange,
    required = false,
    ...rest
}) => {
    const [nameError, setNameError] = useState<string | null>(null);

    const onLocalChange = (newValue: string) => {
        onChange(newValue);
        updateErrorState(newValue);
    };

    const updateErrorState = (value: string) => {
        const error = validateText(value, required);
        setNameError(error);
    };

    return (
        <TextInput
            {...rest}
            onBlur={() => updateErrorState(value)}
            required={required}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(value) => onLocalChange(value.currentTarget.value)}
            error={nameError}
        />
    );
};
