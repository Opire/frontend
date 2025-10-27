import { Metadata } from 'next';
import { getChallenges } from '../../_utils/getChallenges';
import { ChallengesView } from './view';

export const metadata: Metadata = {
  title: 'Opire',
};

export default async function Page({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await params;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const challenges = await getChallenges({
    search,
  });

  return <ChallengesView initialChallenges={challenges} search={search} />;
}
