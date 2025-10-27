import { redirect } from 'next/navigation';
import { API_ROUTES } from '../../constants';
import { ChallengeDTO } from '../_core/_primitives/ChallengePrimitive';
import { serverCustomFetch } from './serverCustomFetch';

export async function getChallengeById({ id }: { id: string }): Promise<ChallengeDTO> {
  try {
    const response = await serverCustomFetch(API_ROUTES.CHALLENGES.BY_ID(id));

    return response.json();
  } catch (error) {
     
    console.error(error);
    redirect('/');
  }
}
