'use client'

import { Avatar, Card, Grid, Stack, Text, GridCol } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import { FC } from "react";
import { UserPlatformInfoDTO } from "../../../../_core/_dtos/UserPlatformInfoDTO";
import { openGithubExternalLoginPage } from "../../../../_components/User/GitHubLoginButton";

interface GithubSettingCardProps {
    githubAccount: UserPlatformInfoDTO | null;
}

export const GithubSettingCard: FC<GithubSettingCardProps> = ({
    githubAccount,
}) => {
    return (
        <Card
            withBorder
            onClick={() => {
                if (githubAccount) {
                    return
                }

                openGithubExternalLoginPage()
            }}
            style={{
                width: '300px',
                cursor: githubAccount ? 'default' : 'pointer',
                borderColor: githubAccount ? 'teal' : 'gray'
            }}
        >
            <Grid>
                <GridCol span={4} >
                    <IconBrandGithub width={'100%'} height={'100%'} color={githubAccount ? 'teal' : 'gray'} />
                </GridCol>
                <GridCol span={'auto'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {githubAccount &&
                        <Stack justify={'center'} align="center">
                            <Avatar src={githubAccount.avatarURL} />
                            <Text>
                                {githubAccount.username}
                            </Text>
                        </Stack>
                    }
                </GridCol>
            </Grid>
        </Card>
    )
}
