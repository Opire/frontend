import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export const useTriggerCallbackOnQueryParamFirstMatch = ({ queryParamKey, callback } : { queryParamKey: string, callback: () => void }) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const queryParam = searchParams.get(queryParamKey);
    const shouldTriggerCallback = !!queryParam && queryParam === 'true';
    
    useEffect(() => {
        if(shouldTriggerCallback) {
            callback();

            // Remove query params without reloading the page
            router.replace(window.location.pathname);      
          }
    }, [shouldTriggerCallback])
}
