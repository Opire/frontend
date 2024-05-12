'use client'

import { Button, Center, Text } from "@mantine/core";
import { IconBrandPaypal } from "@tabler/icons-react";
import Script from "next/script";
import { FC, useEffect } from "react";
import querystring from "querystring";

interface PaypalSettingProps {
    hasPaypalConfigured: boolean;
}

declare global {
    var paypal: any;
}

export const PaypalPersonalAccountSetting: FC<PaypalSettingProps> = ({
    hasPaypalConfigured,
}) => {

    async function connectPayPalAccount() {
        // https://www.sandbox.paypal.com/signin/authorize?flowEntry=static&client_id=CLIENT-ID&scope=LIST-OF-SCOPES&redirect_uri=RETURN-URL

        // process.env.NEXT_PUBLIC_PAYPAL_URL

        const scopes = 'email';

        const redirect_uri = 'http://localhost:3001/auth/paypal';
        // const redirect_uri = 'https://zc85xbrb-3001.uks1.devtunnels.ms/auth/paypal';
        // const redirect_uri = 'https://app.opire.dev/auth/paypal';
        // await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_URL}/signin/authorize?flowEntry=static&client_id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect_uri}`);

        console.log('LETS CALL PAYPAL')
        const params = querystring.stringify({
            flowEntry: 'static',
            client_id: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            scopes,
            redirect_uri,
        });
        console.log({ params })

        await fetch(`${process.env.NEXT_PUBLIC_PAYPAL_URL}/signin/authorize?${params}`);
        console.log('PAYPAL CALL FINISH')

    }

    if (hasPaypalConfigured) {
        return (
            <Button
                size="lg"
                variant="gradient"
                disabled={true}
                w='80%'
            >
                <IconBrandPaypal />
                <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                    PayPal account already connected
                </Text>
            </Button>
        )
    }

    return (
        <Center>
            <Button
                radius='2rem'
                size="lg"
                variant="gradient"
                disabled={false}
                onClick={connectPayPalAccount}
            >
                <IconBrandPaypal style={{ marginRight: '8px' }} />
                <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                    Connect with PayPal
                </Text>
            </Button>
        </Center>

    )

    // return (
    //     <div>
    //         <Script src='https://www.paypalobjects.com/js/external/api.js'
    //             onReady={() => {
    //                 paypal.use(['login'], function (login: any) {
    //                     login.render({
    //                         "appid": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
    //                         "authend": "sandbox",
    //                         // "scopes": "email https://uri.paypal.com/services/paypalattributes",
    //                         "scopes": "email",
    //                         "containerid": "lippButton",
    //                         "responseType": "code",
    //                         "locale": "en-us",
    //                         "buttonType": "CWP",
    //                         "buttonShape": "pill",
    //                         "buttonSize": "lg",
    //                         "fullPage": "false",
    //                         "returnurl": `${process.env.NEXT_PUBLIC_URL}/auth/paypal`
    //                     })
    //                 })
    //             }}
    //         />
    //         <span id='lippButton'></span>
    //     </div>
    // );
}


// https://www.sandbox.paypal.com/signin/authorize?flowEntry=lipp_button&client_id=AV0aB4VwtR0h3t4NThk5CUurXzltFRBxwtePxUWZ3yne3VqzhieRTf_Y0chczcHkLUBigDVsDZLTFr3a&response_type=code&scope=email&redirect_uri=http%253A%252F%252Flocalhost%253A3001%252Fauth%252Fpaypal&nonce=72524415&newUI=Y&size=lg&buttonType=CWP