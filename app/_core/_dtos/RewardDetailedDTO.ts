import { RewardPrimitive } from "../_primitives/RewardPrimitive";
import { UserPrimitive } from "../_primitives/UserPrimitive";
import { PriceDTO } from "./PriceDTO";

type RewardDTOPropsToOmit = 'price';

// TODO: we need it?
export interface RewardDetailedDTO extends Omit<RewardPrimitive, RewardDTOPropsToOmit> {
    price: {
        programmerReward: PriceDTO,
        opireFee: PriceDTO,
        paymentFee: PriceDTO,
        eSignFee: PriceDTO,
        totalPrice: PriceDTO,
    },
    enrolledProgrammers: UserPrimitive[]
}
