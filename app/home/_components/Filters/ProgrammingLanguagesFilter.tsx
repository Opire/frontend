import { Chip, Container, MultiSelect, Popover, Space } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { FC, useState } from "react";
import { ProgrammingLanguageType } from "../../../_core/_types/ProgrammingLanguageType";
import { ProgrammingLanguage } from "../../../_core/_vos/ProgrammingLanguage";

interface ProgrammingLanguagesFilterProp {
    value: ProgrammingLanguageType[]
    onApply: (programmingLanguages: ProgrammingLanguageType[]) => void
}

export const ProgrammingLanguagesFilter: FC<ProgrammingLanguagesFilterProp> = ({
    value,
    onApply,
}) => {
    const isMobile = useMediaQuery("(max-width: 50em)");

    const [filterValue, setFilterValue] = useState([...value]);
    const isFiltering = value.length > 0;

    const chipTitle = () => {
        if (!isFiltering) {
            return "Programming languages";
        }

        return `${value.join(", ")}`;
    };

    function onLocalApply (programminglanguage: ProgrammingLanguageType[]) {
        onApply(programminglanguage);
        setFilterValue(programminglanguage);
    }

    return (
        <Popover trapFocus withArrow shadow="md" arrowPosition="side" arrowOffset={16} arrowSize={12} offset={16}>
            <Popover.Target>
                <Chip checked={isFiltering}>
                    {chipTitle()}
                </Chip>
            </Popover.Target>

            <Popover.Dropdown style={{ width: "auto" }}>
                <Container>
                    <Space h='lg' />
                    <MultiSelect
                        size={"md"}
                        maw={isMobile ? undefined : "500px"}
                        data={ProgrammingLanguage.ValidValues}
                        label="Programming languages"
                        placeholder="Pick as many as you like"
                        searchable
                        clearable
                        hidePickedOptions
                        nothingFoundMessage="Nothing found 😢"
                        value={filterValue}
                        onChange={(values) => onLocalApply(values as ProgrammingLanguageType[])}
                        comboboxProps={{ withinPortal: false }}
                    />
                    <Space h='lg' />
                </Container>

            </Popover.Dropdown>

        </Popover>
    );
};
