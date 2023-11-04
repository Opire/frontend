import { notifications } from "@mantine/notifications";
import crypto from "crypto";

export async function errorNotification({
    id = crypto.randomUUID(),
    title,
    message = "",
}: {
    id?: string;
    title: string;
    message?: string;
}): Promise<void> {
    notifications.show({
        id,
        loading: false,
        title,
        message,
        autoClose: false,
        withCloseButton: true,
        color: "red",
    });
}
