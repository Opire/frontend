import { Metadata } from 'next';
import { redirectToHomeIfNotLogged } from '../../../_utils/redirectToHomeIfNotLogged';
import { DashboardProgrammerTipsView } from './view';

export const metadata: Metadata = {
  title: 'Opire',
};

export default async function Page() {
  await redirectToHomeIfNotLogged();

  return (
    <>
      <DashboardProgrammerTipsView />
    </>
  );
}
