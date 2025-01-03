import { Loader } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { FC, Ref, useEffect } from "react";
import { NothingFound } from "./NothingFound";

/**
 * We may have to memo this component so the icons doesn't "flash" when we load another page
 */
type IndexableType = string | number;

type IndexableKeyof<Interface> = {
    [Key in keyof Interface]: Interface[Key] extends IndexableType | undefined
    ? Key
    : never;
}[keyof Interface];

export function InfinityList<T, TId extends IndexableKeyof<T>>({
    items,
    keyIdentifier,
    isLoading,
    loadNextPage,
    ItemComponent,
}: {
    items: T[];
    keyIdentifier: TId;
    isLoading: boolean;
    loadNextPage: () => void;
    ItemComponent: FC<{
        data: T;
        inputRef?: Ref<HTMLDivElement> | undefined;
    }>
    ItemSkeletonComponent: FC;
}) {
    const { entry, ref } = useIntersection<HTMLDivElement>();
    const isIntersecting = entry?.isIntersecting ?? false;

    useEffect(() => {
        if (isIntersecting) {
            loadNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIntersecting]);

    return (
        <>
            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                    gap: "24px",
                }}
            >
                {items.map((data, index) => (
                    <ItemComponent
                        key={data[keyIdentifier] as string ?? ""}
                        {...{
                            data,
                            inputRef: index === items.length - 15 ? ref : undefined,
                        }}
                    />
                ))}

                {/* {isLoading && new Array(12).fill(0).map(() => (
                <GridCol span={4} key={`${Id.generate().value}-skeleton-grid-cell`}>
                    <ItemSkeletonComponent />
                </GridCol>
            ))} */}

            </section>

            {isLoading && <Loader display='block' size='xl' m='30px auto' />}
            {!isLoading && items.length === 0 && <NothingFound />}
        </>
    );
}
