import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface ItemWithId {
    id: string;
}

export const useGetFilteredById = <T extends ItemWithId>(items: T[]) => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const filteredItems = useMemo(() => {
        if (id) {
            return items.filter(item => item.id === id)
        }

        return items;
    }, [id, items]);

    return filteredItems;
};
