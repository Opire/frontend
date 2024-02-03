import { RewardPrimitive } from "../_primitives/RewardPrimitive";
import { UserPrimitive } from "../_primitives/UserPrimitive";
import { PricePrimitive } from "../_primitives/PricePrimitive";

type RewardDTOPropsToOmit = 'price';

// TODO: we need it?
export interface RewardDetailedDTO extends Omit<RewardPrimitive, RewardDTOPropsToOmit> {
    price: {
        programmerReward: PricePrimitive,
        opireFee: PricePrimitive,
        paymentFee: PricePrimitive,
        eSignFee: PricePrimitive,
        totalPrice: PricePrimitive,
    },
    enrolledProgrammers: UserPrimitive[]
}
