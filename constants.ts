export const API_ROUTES = {
    REWARDS: {
        CREATED_BY_ME: () => `/rewards/createdByMe`,
        ALL: () => `/rewards`,
    },
    AUTH: {
        GITHUB: (code: string) => `/auth/github/${code}`,
        GITLAB: (code: string) => `/auth/gitlab/${code}`,
        BITBUCKET: (code: string) => `/auth/bitbucket/${code}`,
        LOGOUT: () => `/auth/logout`,
    },
    PAYMENTS: {
        CAPTURE: () => `/payments/capture`,
        LINK_TO_PAY_TIP: (tipId: string) => `/payments/tips/${tipId}`,
        LINK_TO_PAY_REWARDS_FOR_ISSUE: (issueId: string) => `/payments/rewards/${issueId}`,
        STRIPE_LINK_ACCOUNT: () => `/payments/stripe/linkAccount`
    },
    USERS: {
        SETTINGS: () => `/users/settings`,
    },
    TIPS: {
        CREATED_BY_ME: () => `/tips/createdByMe`,
        RECEIVED_BY_ME: () => `/tips/programmer`, // TODO: Change endpoint, do all route
    }
}