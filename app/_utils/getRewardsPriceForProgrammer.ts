import { IssueByProgrammerDTO } from "../_core/_dtos/IssueByProgrammerDTO";
import { UserAuthDTO } from "../_core/_dtos/UserAuthDTO";

// TODO: be careful we are adding assuming that are the same currency
export function getRewardsPriceForProgrammer({ issue, userAuth }: { issue: IssueByProgrammerDTO, userAuth: UserAuthDTO }): number {
    const totalIssueRewardPrice = issue.rewards.filter(reward => reward.rewardedUserId === userAuth.userId).reduce((acc, reward) => {
        return acc + reward.price.value
    }, 0);

    return totalIssueRewardPrice;

}