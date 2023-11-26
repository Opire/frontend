import { Button, Chip, Container, Group, NumberInput, Popover, RangeSlider, Space } from '@mantine/core';
import React, { FC, useState } from 'react';
import { DEFAULT_REWARD_FILTERS } from './Filters';
import { useMediaQuery } from '@mantine/hooks';

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


    const isMobile = useMediaQuery("(max-width: 50em)");


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

    function clear() {
        setFilterValue({ min: DEFAULT_REWARD_FILTERS.price.min, max: DEFAULT_REWARD_FILTERS.price.max || maxPriceValue })
        onApply(DEFAULT_REWARD_FILTERS.price.min, DEFAULT_REWARD_FILTERS.price.max)
    }


    return (
        <Popover trapFocus position="bottom-start" withArrow shadow="md" arrowPosition="side" arrowOffset={16} arrowSize={12} offset={16}>
            <Popover.Target>
                <Chip checked={isFiltering}>
                    {chipTitle()}
                </Chip>
            </Popover.Target>

            <Popover.Dropdown style={{ width: 'auto' }}>
                <Container>
                    <Group justify='space-between'>
                        <NumberInput
                            size={isMobile ? 'xs' : 'md'}
                            maw={isMobile ? '100px' : '200px'}
                            label="Min price"
                            value={filterValue.min === maxPriceValue ? '' : filterValue.min}
                            onChange={(value) => setFilterValue({ min: +value, max: filterValue.max })}
                            placeholder=""
                            min={DEFAULT_REWARD_FILTERS.price.min}
                            max={filterValue.max}
                        />
                        <NumberInput
                            size={isMobile ? 'xs' : 'md'}
                            maw={isMobile ? '100px' : '200px'}
                            label="Max price"
                            value={filterValue.max === maxPriceValue ? '' : filterValue.max}
                            onChange={(value) => setFilterValue({ min: filterValue.min, max: +value > maxPriceValue ? maxPriceValue : +value })}
                            placeholder=""
                            min={filterValue.min}
                            max={DEFAULT_REWARD_FILTERS.price.max ?? maxPriceValue}
                        />
                    </Group>

                    <Space h='lg' />
                    <RangeSlider
                        defaultValue={[filterValue.min, filterValue.max]}
                        value={[filterValue.min, filterValue.max]}
                        min={0}
                        max={maxPriceValue}
                        onChange={(value) => setFilterValue({ min: value[0], max: value[1] })}
                        onChangeEnd={(value) => onApply(value[0], value[1] === maxPriceValue ? null : value[1])}
                        marks={marks}
                        label={null}
                    />
                    <Space h='lg' />


                    <Space h='xl' />
                    <Group justify='space-between'>
                        <Button color='red' variant='outline' onClick={clear}>
                            Clear
                        </Button>
                    </Group>
                </Container>

            </Popover.Dropdown>

        </Popover>
    );
};

