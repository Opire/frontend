'use client'

import { Avatar, Card, Grid, Stack, Text, GridCol } from "@mantine/core";
import { IconBrandBitbucket } from "@tabler/icons";
import { FC } from "react";
import { openBitbucketExternalLoginPage } from "../../../../_components/User/BitBucketLoginButton";
import { UserPlatformInfoDTO } from "../../../../_core/_dtos/UserPlatformInfoDTO";

interface BitbucketSettingCardProps {
    bitbucketAccount: UserPlatformInfoDTO | null;
}

export const BitbucketSettingCard: FC<BitbucketSettingCardProps> = ({
    bitbucketAccount,
}) => {
    return (
        <Card
            withBorder
            onClick={() => {
                if (bitbucketAccount) {
                    return
                }

                openBitbucketExternalLoginPage()
            }}
            style={{
                width: '300px',
                cursor: bitbucketAccount ? 'default' : 'pointer',
                borderColor: bitbucketAccount ? 'teal' : 'gray'
            }}
        >
            <Grid>
                <GridCol span={4} >
                    <IconBrandBitbucket width={'100%'} height={'100%'} color={bitbucketAccount ? 'teal' : 'gray'} />
                </GridCol>
                <GridCol span={'auto'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {bitbucketAccount &&
                        <Stack justify={'center'} align="center">
                            <Avatar src={bitbucketAccount.avatarURL} />
                            <Text>
                                {bitbucketAccount.username}
                            </Text>
                        </Stack>
                    }
                </GridCol>
            </Grid>
        </Card>
    )
}
