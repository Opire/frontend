import useSWR from 'swr';
import { API_ROUTES } from '../constants';
import { fetcher } from '../app/_utils/fetcher';
import { TipByProgrammerDTO } from '../app/_core/_dtos/TipByProgrammerDTO';

export const useTipsByProgrammer = () => {
  const {
    data: tipsResponse,
    error,
    isValidating,
  } = useSWR(API_ROUTES.TIPS.RECEIVED_BY_ME(), (url: string) => fetcher<TipByProgrammerDTO[]>(url));
  const tips = tipsResponse ?? [];

  return {
    tips,
    error,
    isLoading: isValidating,
  };
};
