import { Metadata } from 'next';
import { DetailedIssueView } from './view';
import { getIssueById } from '../../_utils/getIssueById';
import { PricePrimitive } from '../../_core/_primitives/PricePrimitive';
import { formatPrice } from '../../_utils/formatPrice';
import { getUserAuth } from '../../_utils/getUserAuth';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  try {
    const issue = await getIssueById({
      id,
    });

    const totalPrice: PricePrimitive = issue.rewards.reduce(
      (acc, el) => {
        acc.value += el.price.value;

        return acc;
      },
      { unit: 'USD_CENT', value: 0 }
    );

    return {
      title: `Opire - Issue <${issue.title}>`,
      openGraph: {
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_URL}/issues/${issue.id}`,
        title: `${formatPrice(totalPrice)} bounty: ${issue.title}`,
        description: `Earn up to ${formatPrice(totalPrice)} with Opire by solving this issue in ${issue.project.organization.name}/${issue.project.name}`,
        images: `${process.env.NEXT_PUBLIC_URL}/api/issues/${issue.id}/og?time=${Date.now()}`,
      },
      twitter: {
        creator: '@opire_dev',
        creatorId: '1745861018234814464',
        site: '@opire_dev',
        siteId: '1745861018234814464',
        title: `${formatPrice(totalPrice)} bounty: ${issue.title}`,
        description: `Earn up to ${formatPrice(totalPrice)} with Opire by solving this issue in ${issue.project.organization.name}/${issue.project.name}`,
        images: `${process.env.NEXT_PUBLIC_URL}/api/issues/${issue.id}/og?time=${Date.now()}`,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      title: 'Opire - Issue',
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const issue = await getIssueById({
    id,
  });

  const userAuth = await getUserAuth();

  return <DetailedIssueView issue={issue} userAuth={userAuth} />;
}
