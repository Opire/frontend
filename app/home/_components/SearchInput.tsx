"use client";

import { useDebouncedValue } from "@mantine/hooks";
import React, { FC, useEffect, useState } from "react";
import { Search } from "tabler-icons-react";
import { usePopulateToURL } from "../../../hooks/usePopulateToURL";
import { BaseInputText } from "../../_components/Form/BaseInputText";

const urlKey = "search";

export const SearchInput: FC<{}> = () => {
    const { populateParamToURL, searchParams } = usePopulateToURL();
    const [search, setSearch] = useState(searchParams.get(urlKey) ?? "");
    const [debouncedSearch] = useDebouncedValue(search, 275);

    useEffect(() => {
        populateParamToURL(urlKey, debouncedSearch);
    }, [debouncedSearch]);

    return (
        <BaseInputText
            leftSection={<Search />}
            placeholder="Search issues"
            value={search}
            radius="xl"
            onChange={(value) => {
                setSearch(value);
            }}
            required={false}
        />
    );
};
