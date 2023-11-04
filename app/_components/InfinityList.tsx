import { GridCol, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { FC, Ref, useEffect } from "react";

/**
 * We may have to memo this component so the icons doesn't "flash" when we load another page
 */

export function InfinityList<T extends { id: string }>({
    items,
    isLoading,
    loadNextPage,
    ItemComponent,
    ItemSkeletonComponent
}: {
    items: T[];
    isLoading: boolean;
    loadNextPage: () => void;
    ItemComponent: FC<{
        data: T;
        inputRef?: Ref<HTMLDivElement> | undefined;
    }>
    ItemSkeletonComponent: FC<{}>
}) {
    const { entry, ref } = useIntersection<HTMLDivElement>()
    const isIntersecting = entry?.isIntersecting ?? false;

    useEffect(() => {
        if (isIntersecting) {
            loadNextPage()
        }
    }, [isIntersecting])

    return (
        <>
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                    gap: '24px',
                }}
            >
                {items.map((data, index) => (
                    <ItemComponent
                        key={data.id}
                        {...{
                            data,
                            inputRef: index === items.length - 15 ? ref : undefined
                        }}
                    />
                ))}

                {/* {isLoading && new Array(12).fill(0).map(() => (
                <GridCol span={4} key={`${Id.generate().value}-skeleton-grid-cell`}>
                    <ItemSkeletonComponent />
                </GridCol>
            ))} */}

                {isLoading && <Loader size='xl' m='20px auto' />}
            </section>

            {!isLoading && items.length === 0 && <Title order={1}>Nothing found...</Title>}
        </>
    );
}

