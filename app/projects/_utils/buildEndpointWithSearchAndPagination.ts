export function buildEndpointWithSearchAndPagination(
    baseURL: string,
    options: {
        page: number;
        itemsPerPage: number;
        search?: string;
    },
) {
    const { page, itemsPerPage, search } = options;

    let url = `${baseURL}?page=${page}&itemsPerPage=${itemsPerPage}`;

    if (!search) {
        return url;
    }

    return `${url}&search=${search} `;
}