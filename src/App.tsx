import React from 'react';
import { GlobalStateProvider, useGlobalState } from './context/GlobalStateContext';
import { Layout } from './components/common/Layout';
import { RestaurantPortal } from './components/restaurant/RestaurantPortal';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { AdminPortal } from './components/admin/AdminPortal';

const AppContent: React.FC = () => {
  const { activeRole } = useGlobalState();

  return (
    <Layout>
      {activeRole === 'restaurant' && <RestaurantPortal />}
      {activeRole === 'customer' && <CustomerPortal />}
      {activeRole === 'admin' && <AdminPortal />}
    </Layout>
  );
};

function App() {
  return (
    <GlobalStateProvider>
      <AppContent />
    </GlobalStateProvider>
  );
}

export default App;
