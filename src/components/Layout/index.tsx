import React from 'react';
import TopSection from './TopSection';
import BottomSection from './BottomSection';

interface LayoutProps {
  name: string
}

const Layout: React.FC<LayoutProps> = ({ name, children }) => {
  return (
    <main className="layout-root">
      <TopSection name={name} />
      <BottomSection>{children}</BottomSection>
    </main>
  );
};

export default Layout;
