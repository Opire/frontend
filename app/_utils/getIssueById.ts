import { redirect } from 'next/navigation';
import { API_ROUTES } from '../../constants';
import { IssuePrimitive } from '../_core/_primitives/IssuePrimitive';
import { serverCustomFetch } from './serverCustomFetch';

export async function getIssueById({ id }: { id: string }): Promise<IssuePrimitive> {
  try {
    const response = await serverCustomFetch(API_ROUTES.ISSUES.BY_ID(id));

    return response.json();
  } catch (error) {
     
    console.error(error);
    redirect('/');
  }
}
