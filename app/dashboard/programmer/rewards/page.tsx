import { Metadata } from 'next';
import { redirectToHomeIfNotLogged } from '../../../_utils/redirectToHomeIfNotLogged';
import { DashboardProgrammerRewardsView } from './view';

export const metadata: Metadata = {
  title: 'Opire',
};

export default async function Page() {
  await redirectToHomeIfNotLogged();

  return (
    <>
      <DashboardProgrammerRewardsView />
    </>
  );
}
