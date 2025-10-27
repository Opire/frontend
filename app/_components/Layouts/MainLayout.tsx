import { FC } from 'react';
import { getUserAuth } from '../../_utils/getUserAuth';
import { MainLayoutClient } from './MainLayoutClient';

interface MainLayoutProps {
  headerContent?: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = async props => {
  const userAuth = await getUserAuth();

  return <MainLayoutClient {...props} userAuth={userAuth} />;
};
