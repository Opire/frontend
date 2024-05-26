module.exports = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    // swcMinify: true,
    // reactStrictMode: true,
    reactStrictMode: false, // This is done to avoid useEffect running twice
    images: {
        remotePatterns: [
            {
                hostname: "*.com",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
            // {
            //     source: '/settings',
            //     destination: '/settings/profile',
            //     permanent: true,
            // },
            {
                source: '/dashboard',
                destination: '/dashboard/creator',
                permanent: true,
            },
            {
                source: '/dashboard/creator',
                destination: '/dashboard/creator/rewards',
                permanent: true,
            },
            {
                source: '/dashboard/programmer',
                destination: '/dashboard/programmer/rewards',
                permanent: true,
            },
        ]
    },
}
