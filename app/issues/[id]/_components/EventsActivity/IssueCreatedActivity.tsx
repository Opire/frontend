import { Text, Timeline } from '@mantine/core';
import { FC } from 'react';
import { IssuePrimitive } from '../../../../_core/_primitives/IssuePrimitive';
import { BaseEventPrimitives } from '../../../../_core/_primitives/BaseEventPrimitives';
import { IconPlus } from '@tabler/icons-react';
import { getRelativeTime } from '../../../../_utils/getRelativeTime';

interface IssueCreatedActivityProps {
  event: BaseEventPrimitives;
  issue: IssuePrimitive;
}

export const IssueCreatedActivity: FC<IssueCreatedActivityProps> = ({ event }) => (
  <Timeline.Item title="Issue added to Opire" bullet={<IconPlus size="sm" />}>
    <Text size="xs" mt={4}>
      {getRelativeTime(new Date(event.occurredOn))}
    </Text>
  </Timeline.Item>
);
