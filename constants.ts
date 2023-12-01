export const API_ROUTES = {
    REWARDS: {
        CREATED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/rewards/created`,
        TRYING_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/rewards/trying`,
        ALL: () => `${process.env.NEXT_PUBLIC_API_URL}/rewards`,
    },
    AUTH: {
        GITHUB: (code: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/auth/github/${code}`,
        GITLAB: (code: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/auth/gitlab/${code}`,
        BITBUCKET: (code: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/auth/bitbucket/${code}`,
        LOGOUT: () => `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    },
    PAYMENTS: {
        CAPTURE: () => `${process.env.NEXT_PUBLIC_API_URL}/payments/capture`,
        LINK_TO_PAY_TIP: (tipId: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/payments/tips/${tipId}`,
        LINK_TO_PAY_REWARDS_FOR_ISSUE: (issueId: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/payments/rewards/${issueId}`,
        STRIPE_LINK_CONFIGURE_ACCOUNT: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/payments/stripe/linkAccount`,
    },
    USERS: {
        SETTINGS: () => `${process.env.NEXT_PUBLIC_API_URL}/users/settings`,
    },
    TIPS: {
        CREATED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/tips/created`,
        RECEIVED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/tips/received`, // TODO: Change endpoint, do all route
    },
};

export const NEXT_SERVER_ROUTES = {
    AUTH: {
        GITHUB: (code: string) =>
            `${process.env.NEXT_PUBLIC_URL}/api/auth/github/${code}`,
        GITLAB: (code: string) =>
            `${process.env.NEXT_PUBLIC_URL}/api/auth/gitlab/${code}`,
        BITBUCKET: (code: string) =>
            `${process.env.NEXT_PUBLIC_URL}/api/auth/bitbucket/${code}`,
        LOGOUT: () => `${process.env.NEXT_PUBLIC_URL}/api/auth/logout`,
    },
};
