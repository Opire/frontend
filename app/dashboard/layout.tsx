import { MainLayout } from '../_components/Layouts/MainLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <div
        style={{
          padding: '24px 8px',
        }}
      >
        {children}
      </div>
    </MainLayout>
  );
}
