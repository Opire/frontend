import { Metadata } from 'next';
import { AuthGithubView } from './view';

export const metadata: Metadata = {
  title: 'Opire - GitHub',
};

export default function Page() {
  return <AuthGithubView />;
}
