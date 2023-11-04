import { notifications } from "@mantine/notifications";
import { generalNotification } from "./generalNotification";
import crypto from "crypto";

export async function generalLoadingNotification({
    titleOnStart,
    titleOnEnd,
    titleOnError,
    messageOnStart = "",
    messageOnEnd = "",
    messageOnError = "",
    actionToNotify,
}: {
    titleOnStart: string;
    titleOnEnd: string;
    titleOnError: string;
    messageOnStart?: string;
    messageOnEnd?: string;
    messageOnError?: string;
    actionToNotify: () => Promise<void>;
}): Promise<void> {
    const randomIdOperation = crypto.randomUUID();

    generalNotification({
        title: titleOnStart,
        message: messageOnStart,
        id: randomIdOperation,
    });

    try {
        await actionToNotify();
        notifications.update({
            id: randomIdOperation,
            loading: false,
            title: titleOnEnd,
            message: messageOnEnd,
            autoClose: 6000,
            withCloseButton: true,
        });
    } catch (error) {
        notifications.update({
            id: randomIdOperation,
            loading: false,
            color: "red",
            title: titleOnError,
            message: !!messageOnError
                ? messageOnError
                : (error as any)?.message ?? "",
            autoClose: false,
            withCloseButton: true,
        });
    }
}
