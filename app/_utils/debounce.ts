
type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(func: F, delay: number): (...args: Parameters<F>) => void {
    let timeoutId: NodeJS.Timeout;

    return function debounced(...args: Parameters<F>): void {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export function prepareDebounceFunction<R = void>(
    callback: (...args: any[]) => R,
    delay: number,
): [(...args: any[]) => Promise<R>, () => void] {
    let timer: NodeJS.Timeout;

    function debouncedFunction(...args: any[]): Promise<R> {
        return new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resolve(callback(...args));
            }, delay);
        });
    }

    const stopExecution = () => clearTimeout(timer);

    return [debouncedFunction, stopExecution];
}