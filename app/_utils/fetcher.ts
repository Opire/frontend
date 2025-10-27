import { clientCustomFetch } from './clientCustomFetch';

export const fetcher = <T>(url: string) =>
  clientCustomFetch(url).then(res => res.json() as Promise<T>);
