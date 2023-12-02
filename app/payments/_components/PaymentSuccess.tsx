'use client'

import { Center, Space, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'

const durationInSeconds = 5;

export function PaymentSuccess(): JSX.Element {
    const [renderConfetti, setRenderConfetti] = useState(false);
    const [counter, setCounter] = useState(durationInSeconds);

    useEffect(() => {
        setRenderConfetti(true);
    }, [counter])

    useEffect(() => {
        if (counter <= 0) {
            return;
        }

        const timer = setTimeout(() => setCounter(counter - 1), 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [counter])

    useEffect(() => {
        const timer = setTimeout(() => window.close(), durationInSeconds * 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [])

    if (!renderConfetti) {
        return <></>;
    }

    return (
        <>
            <Confetti
                recycle={false}
                numberOfPieces={500}
                tweenDuration={500}
                confettiSource={{
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2.5,
                    w: 10,
                    h: 10,
                }}
                wind={0}
                gravity={0.1}
                initialVelocityX={15}
                initialVelocityY={20}
            />

            <Space h='20%' />

            <Center>
                <Text variant='gradient' style={{ textAlign: 'center', fontSize: "4rem", fontWeight: "bold" }}>
                    Congrats!
                </Text>
            </Center>

            <Center>
                <Text variant='gradient' style={{ textAlign: 'center', fontSize: "3rem", fontWeight: "bold" }}>
                    Payment completed successfully
                </Text>
            </Center>

            <Center>
                <Text style={{ textAlign: 'center', fontSize: "1rem" }}>
                    This window will automaticaly close in {counter}s
                </Text>
            </Center>
        </>
    )
}