import { Box, Card, Skeleton, Timeline } from "@mantine/core";
import { useGetActivityFromIssue } from "../../../../hooks/useGetActivityFromIssue";
import { IssuePrimitive } from "../../../_core/_primitives/IssuePrimitive";
import { FC } from "react";
import { EVENT_NAMES } from "../../../_core/_types/EventNames";
import { BaseEventPrimitives } from "../../../_core/_primitives/BaseEventPrimitives";
import { IssueCreatedActivity } from "./EventsActivity/IssueCreatedActivity";
import { NewRewardAddedActivity } from "./EventsActivity/NewRewardAddedActivity";
import { UserTryingActivity } from "./EventsActivity/UserTryingActivity";
import { UserClaimedActivity } from "./EventsActivity/UserClaimedActivity";
import { RewardSetAsPaidActivity } from "./EventsActivity/RewardSetAsPaidActivity";

interface IssueActivityProps {
    issue: IssuePrimitive;
}


export const IssueActivity: FC<IssueActivityProps> = ({ issue }) => {
    const { activity, isLoading } = useGetActivityFromIssue({ issueId: issue.id });

    if (isLoading) {
        return (
            <Card withBorder shadow="md" radius='md' h={'100%'}>
                <Skeleton height={'70vh'} radius="xl" />
            </Card>
        )
    }

    return (
        <Card withBorder shadow="md" radius='md' h={'100%'} mih={'50vh'}>
            <Timeline active={1} bulletSize={24} lineWidth={2}>
                {activity.map(event => {
                    const component = activityMaperComponent[event.eventName];

                    if (!component) {
                        return undefined;
                    }

                    return component({ event, issue })
                })}
            </Timeline>
        </Card>
    );
};

const activityMaperComponent: Partial<Record<EVENT_NAMES, ({ event, issue }: { event: BaseEventPrimitives, issue: IssuePrimitive }) => JSX.Element>> = {
    [EVENT_NAMES.IssueCreated]: (params) => <IssueCreatedActivity {...params} />,
    [EVENT_NAMES.NewRewardAddedToIssue]: (params) => <NewRewardAddedActivity {...params} />,
    [EVENT_NAMES.UserTryingIssue]: (params) => <UserTryingActivity {...params} />,
    [EVENT_NAMES.UserClaimedIssue]: (params) => <UserClaimedActivity {...params} />,
    [EVENT_NAMES.RewardsSetAsPaid]: (params) => <RewardSetAsPaidActivity {...params} />,
}