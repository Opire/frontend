import { Button, Chip, Container, Group, Modal, MultiSelect, Space, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { FC, useState } from 'react';
import { ProgrammingLanguageType } from '../../../_core/_types/ProgrammingLanguageType';
import { ProgrammingLanguage } from '../../../_core/_vos/ProgrammingLanguage';
import { DEFAULT_REWARD_FILTERS } from './Filters';

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
        setFilterValue(programminglanguage);
        closeModal();
    }

    return (
        <div style={{ position: 'relative' }}>
            <Chip checked={isFiltering} onClick={toggleModal}>
                {chipTitle()}
            </Chip>

            <Modal
                withCloseButton={true}
                opened={isModalOpen}
                onClose={closeModal}
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
                fullScreen={isMobile}
            >
                <Container h={'25rem'} m={10}>
                    <MultiSelect
                        data={ProgrammingLanguage.ValidValues}
                        label="Programming language"
                        placeholder="Pick as many as you like"
                        searchable
                        nothingFoundMessage="Nothing found ;("
                        value={filterValue}
                        onChange={(values) => setFilterValue(values as ProgrammingLanguageType[])}

                    />

                    <Space h='xl' />
                    <Space h='xl' />
                </Container>

                <Group justify='space-between'>
                    <Button color='red' variant='outline' onClick={() => onLocalApply(DEFAULT_REWARD_FILTERS.programmingLanguages)}>
                        Clear
                    </Button>

                    <Button onClick={() => onLocalApply(filterValue)}>
                        Apply
                    </Button>
                </Group>
            </Modal>
        </div>
    );
};
