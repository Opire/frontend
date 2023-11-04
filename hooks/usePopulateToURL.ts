import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function usePopulateToURL(): {
    populateParamToURL(key: string, value: string): void,
    populateMultipleParamToURL(params: { key: string, value: string }[]): void,
    searchParams: ReadonlyURLSearchParams
} {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    function createQueryString(newParams: { key: string, value: string }[]) {
        const params = new URLSearchParams(searchParams)

        newParams.forEach(newParam => {
            if (newParam.value === '') {
                params.delete(newParam.key)
                return
            }

            params.set(newParam.key, newParam.value)
        })

        params.sort()
        return params.toString()
    }

    function populateParamToURL(key: string, value: string) {
        populateMultipleParamToURL([
            { key, value }
        ])
    }

    function populateMultipleParamToURL(params: { key: string, value: string }[]) {
        const queryString = createQueryString(params)
        router.replace(`${pathname}?${queryString}`)
    }

    return {
        populateParamToURL,
        populateMultipleParamToURL,
        searchParams
    }
}
