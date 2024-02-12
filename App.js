import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNav from './src/app/navigation/StackNav';
import { AuthProvider } from './src/app/hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
    </AuthProvider>
  );
};
export default App;





