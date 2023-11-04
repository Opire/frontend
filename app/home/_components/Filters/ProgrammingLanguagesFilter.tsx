import { Button, Chip, Container, Modal, MultiSelect, Space, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { FC, useState } from 'react';
import { ProgrammingLanguageType } from '../../../_core/_types/ProgrammingLanguageType';
import { ProgrammingLanguage } from '../../../_core/_vos/ProgrammingLanguage';

interface ProgrammingLanguagesFilterProp {
    value: ProgrammingLanguageType[]
    onApply: (programmingLanguages: ProgrammingLanguageType[]) => void
}

export const ProgrammingLanguagesFilter: FC<ProgrammingLanguagesFilterProp> = ({
    value,
    onApply
}) => {
    const [filterValue, setFilterValue] = useState([...value]);

    const isFiltering = value.length > 0;

    const theme = useMantineTheme();
    const isMobile = useMediaQuery("(max-width: 50em)");
    const [isModalOpen, { close: closeModal, toggle: toggleModal }] = useDisclosure();

    const chipTitle = () => {
        if (!isFiltering) {
            return 'Programming languages'
        }

        return `${value.join(', ')}`;
    }

    function onLocalApply(programminglanguage: ProgrammingLanguageType[]) {
        onApply(programminglanguage);
        closeModal();
    }

    function toggleProgrammingLanguageFromFilter(programmingLanguage: ProgrammingLanguageType) {
        setFilterValue((oldFilterValue) => {
            const wasIncluded = oldFilterValue.includes(programmingLanguage);

            if (wasIncluded) {
                return oldFilterValue.filter(old => old !== programmingLanguage);
            }

            return [...oldFilterValue, programmingLanguage];
        })
    }

    return (
        <div style={{ position: 'relative' }}>
            <Chip checked={isFiltering} onClick={toggleModal}>
                {chipTitle()}
            </Chip>

            <Modal
                withCloseButton={false}
                opened={isModalOpen}
                onClose={closeModal}
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
                fullScreen={isMobile}
            >
                <Container h={'400px'} m={10}>
                    <Space h='xl' />
                    <Space h='xl' />

                    <MultiSelect
                        data={ProgrammingLanguage.ValidValues}
                        label="Programming language"
                        placeholder="Pick as many as you like"
                        searchable
                        nothingFoundMessage="Nothing found ;("
                        value={filterValue}
                        onChange={(values) => setFilterValue(values as ProgrammingLanguageType[])}
                    />

                    {/* {ProgrammingLanguage.ValidValues.map(programmingLanguage => (
                        <>
                            <Checkbox
                                key={programmingLanguage}
                                icon={CheckboxIcon}
                                label={programmingLanguage}
                                checked={filterValue.includes(programmingLanguage)}
                                onChange={() => toggleProgrammingLanguageFromFilter(programmingLanguage)}
                            />
                            <Space h='xs' />
                        </>
                    ))} */}

                    <Space h='xl' />
                    <Space h='xl' />
                </Container>

                <Button onClick={() => onLocalApply(filterValue)}>
                    Apply
                </Button>
            </Modal>
        </div>
    );
};
