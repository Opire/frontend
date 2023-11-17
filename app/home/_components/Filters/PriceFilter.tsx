import { Button, Chip, Container, Group, Modal, RangeSlider, Space, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { FC, useState } from 'react';
import { DEFAULT_REWARD_FILTERS } from './Filters';

interface PriceFilterProp {
    value: [number, number | null]
    onApply: (min: number, max: number | null) => void
}

const maxPriceValue = 10_001;
export const PriceFilter: FC<PriceFilterProp> = ({
    value,
    onApply
}) => {
    const isFilteringByMin = value[0] > 0;
    const isFilteringByMax = value[1] !== null;
    const isFiltering = isFilteringByMin || isFilteringByMax;

    const [filterValue, setFilterValue] = useState({ min: value[0], max: value[1] || maxPriceValue })

    const theme = useMantineTheme();
    const isMobile = useMediaQuery("(max-width: 50em)");
    const [isModalOpen, { close: closeModal, toggle: toggleModal }] = useDisclosure();

    const marks = [
        { value: 0, label: '0€' },
        { value: maxPriceValue, label: '∞' }
    ];

    const chipTitle = () => {
        if (!isFiltering) {
            return 'Price'
        }

        if (isFilteringByMin && isFilteringByMax) {
            return `${value[0]}€ - ${value[1]}€`;
        }

        if (!isFilteringByMax) {
            return `From ${value[0]}€`
        }

        return `Up to ${value[1]}€`
    }

    function onLocalApply(min: number, max: number | null) {
        onApply(min, max === maxPriceValue ? null : max)
        setFilterValue({ min, max: max || maxPriceValue })
        closeModal()
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
                <Container m={10}>
                    <Space h='xl' />
                    <RangeSlider
                        defaultValue={[filterValue.min, filterValue.max]}
                        min={0}
                        max={maxPriceValue}
                        onChange={(value) => setFilterValue({ min: value[0], max: value[1] })}
                        marks={marks}
                        labelAlwaysOn
                        label={(value) => <div>{value === maxPriceValue ? 'Without limit' : `${value} €`}</div>}
                    />
                    <Space h='xl' />
                    <Space h='xl' />
                </Container>

                <Group justify='space-between'>
                    <Button color='red' variant='outline' onClick={() => onLocalApply(DEFAULT_REWARD_FILTERS.price.min, DEFAULT_REWARD_FILTERS.price.max)}>
                        Clear
                    </Button>

                    <Button onClick={() => onLocalApply(filterValue.min, filterValue.max)}>
                        Apply
                    </Button>
                </Group>
            </Modal>
        </div>
    );
};

