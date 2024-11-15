"use client";

import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { usePopulateToURL } from "../../../hooks/usePopulateToURL";
import { BaseInputText } from "../../_components/Form/BaseInputText";

const urlKey = "search";

export function SearchInput() {
    const { populateParamToURL, searchParams } = usePopulateToURL();
    const [search, setSearch] = useState(searchParams.get(urlKey) ?? "");
    const [debouncedSearch] = useDebouncedValue(search, 275);

    useEffect(() => {
        populateParamToURL(urlKey, debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    return (
        <BaseInputText
            leftSection={<IconSearch />}
            placeholder="Search issues"
            value={search}
            radius="xl"
            onChange={(value) => {
                setSearch(value);
            }}
            required={false}
        />
    );
}
