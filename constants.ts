export const API_ROUTES = {
    ACTIVITY: {
        BY_ISSUE_ID: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/activity/issues/${id}`,
    },
    REWARDS: {
        CREATED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/rewards/created`,
        TRYING_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/rewards/trying`,
        ALL: () => `${process.env.NEXT_PUBLIC_API_URL}/rewards`,
        CREATE_FROM_ISSUE_URL: () => `${process.env.NEXT_PUBLIC_API_URL}/rewards/fromIssueURL`,
        DELETE_ALL_FROM_CREATOR: () => `${process.env.NEXT_PUBLIC_API_URL}/rewards/all`,
    },
    ISSUES: {
        CLAIM_FROM_ISSUE_URL: () => `${process.env.NEXT_PUBLIC_API_URL}/issues/claim/fromIssueURL`,
        BY_ID: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/issues/${id}`,
    },
    CHALLENGES: {
        BY_ID: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
        TEMPLATES: () => `${process.env.NEXT_PUBLIC_API_URL}/challenges/templates`,
        CREATE: () => `${process.env.NEXT_PUBLIC_API_URL}/challenges`,
        EDIT_DRAFT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
        PUBLISH_DRAFT: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}/publish`,
        CREATED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/challenges/created`,
        CHECK_DRAFT_PRIZES: () => `${process.env.NEXT_PUBLIC_API_URL}/challenges/draft/prizes/are-valid`, 
        ALL: () => `${process.env.NEXT_PUBLIC_API_URL}/challenges`, 
        PARTICIPATE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}/participate`,
        CAN_CURRENT_USER_PARTICIPATE: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}/participate/is-allowed`,
        ALLOW_NEW_PARTICIPATIONS: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}/participations/allow`,
        DENY_NEW_PARTICIPATIONS: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}/participations/deny`,
        APPROVE_PARTICIPATION: ({ challengeId, participationId }: { challengeId: string; participationId: string }) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/participations/${participationId}/approve`,
        REJECT_PARTICIPATION: ({ challengeId, participationId }: { challengeId: string; participationId: string }) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/participations/${participationId}/reject`,
        GET_AVAILABLE_PRIZES: (challengeId: string) => `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/prizes/available`,
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
        LINK_TO_PAY_CHALLENGE_PRIZE: (challengeId: string) =>
            `${process.env.NEXT_PUBLIC_API_URL}/payments/challenges/${challengeId}`,
        STRIPE_DISCONNECT_ACCOUNT: () => `${process.env.NEXT_PUBLIC_API_URL}/payments/stripe/disconnect`,
        EXPRESS_ACCOUNT: () => `${process.env.NEXT_PUBLIC_API_URL}/payments/stripe/express-account`,
    },
    USERS: {
        SETTINGS: () => `${process.env.NEXT_PUBLIC_API_URL}/users/settings`,
        BY_ID: (userId: string) => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    },
    TIPS: {
        CREATED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/tips/created`,
        RECEIVED_BY_ME: () =>
            `${process.env.NEXT_PUBLIC_API_URL}/tips/received`, // TODO: Change endpoint, do all route
    },
    PROJECTS: {
        ALL: () => `${process.env.NEXT_PUBLIC_API_URL}/projects`,
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

export const URL_DOCUMENTATION = 'https://docs.opire.dev'