import { Chip, Container, Group, Popover, Radio, Space } from '@mantine/core';
import React, { FC, useState } from 'react';

export type RewardFilterUserTrying = 'SOMEBODY' | 'NOBODY' | 'BOTH';

const values: { [key in RewardFilterUserTrying]: RewardFilterUserTrying } = {
  BOTH: 'BOTH',
  NOBODY: 'NOBODY',
  SOMEBODY: 'SOMEBODY',
};

interface UsersTryingFilterProp {
  value: RewardFilterUserTrying;
  onApply: (usersTrying: RewardFilterUserTrying) => void;
}

export const UsersTryingFilter: FC<UsersTryingFilterProp> = ({ value, onApply }) => {
  const [filterValue, setFilterValue] = useState(value);
  const isFiltering = value !== 'BOTH';

  const chipTitle = () => {
    if (!isFiltering) {
      return 'Users trying';
    }

    const translation: Record<RewardFilterUserTrying, string> = {
      BOTH: 'Users trying',
      NOBODY: 'Nobody is trying',
      SOMEBODY: 'Someone is trying',
    };

    return translation[value];
  };

  function onLocalApply(usersTrying: RewardFilterUserTrying) {
    onApply(usersTrying);
    setFilterValue(usersTrying);
  }

  return (
    <Popover
      trapFocus
      withArrow
      shadow="md"
      arrowPosition="side"
      arrowOffset={16}
      arrowSize={12}
      offset={16}
    >
      <Popover.Target>
        <Chip checked={isFiltering}>{chipTitle()}</Chip>
      </Popover.Target>

      <Popover.Dropdown style={{ width: 'auto' }}>
        <Container>
          <Space h="xs" />

          <Radio.Group
            value={filterValue}
            onChange={value => onLocalApply(value as RewardFilterUserTrying)}
            name="usersTrying"
            label="Select if the issue is being tried by someone"
            description="This will hide/show issues based on the number of users currently trying"
          >
            <Space h="lg" />
            <Group mt="xs" gap="xl">
              <Radio value={values.BOTH} label="All" />
              <Radio value={values.NOBODY} label="Nobody is trying" />
              <Radio value={values.SOMEBODY} label="Someone is trying" />
            </Group>
          </Radio.Group>

          <Space h="lg" />
        </Container>
      </Popover.Dropdown>
    </Popover>
  );
};
