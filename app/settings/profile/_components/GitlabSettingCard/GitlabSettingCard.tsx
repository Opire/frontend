'use client'

import { Avatar, Card, Grid, Stack, Text, GridCol } from "@mantine/core";
import { IconBrandGitlab } from "@tabler/icons";
import { FC } from "react";
import { UserPlatformInfoDTO } from "../../../../_core/_dtos/UserPlatformInfoDTO";
import { openGitlabExternalLoginPage } from "../../../../_components/User/GitLabLoginButton";

interface GitlabSettingCardProps {
    gitlabAccount: UserPlatformInfoDTO | null;
}

export const GitlabSettingCard: FC<GitlabSettingCardProps> = ({
    gitlabAccount,
}) => {
    return (
        <Card
            withBorder
            onClick={() => {
                if (gitlabAccount) {
                    return
                }

                openGitlabExternalLoginPage()
            }}
            style={{
                width: '300px',
                cursor: gitlabAccount ? 'default' : 'pointer',
                borderColor: gitlabAccount ? 'teal' : 'gray'
            }}
        >
            <Grid>
                <GridCol span={4} >
                    <IconBrandGitlab width={'100%'} height={'100%'} color={gitlabAccount ? 'teal' : 'gray'} />
                </GridCol>
                <GridCol span={'auto'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {gitlabAccount &&
                        <Stack justify={'center'} align="center">
                            <Avatar src={gitlabAccount.avatarURL} />
                            <Text>
                                {gitlabAccount.username}
                            </Text>
                        </Stack>
                    }
                </GridCol>
            </Grid>
        </Card>
    )
}
