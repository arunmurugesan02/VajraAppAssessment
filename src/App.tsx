// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { colors } from './styles/colors';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primaryDark}
      />
      <AppNavigator />
    </>
  );
};

export default App;
