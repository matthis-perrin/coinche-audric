import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {appBackgroundColor, topBarBackgroundColor} from './lib/theme';

export const App: React.FC = () => (
  <SafeAreaProvider>
    <AppWithProvider />
    <StatusBar barStyle="light-content" />
  </SafeAreaProvider>
);
App.displayName = 'App';

const AppWithProvider: React.FC = () => {
  return (
    <AppWrapper>
      <AppContainer>
        <Text>Test!!</Text>
      </AppContainer>
    </AppWrapper>
  );
};
AppWithProvider.displayName = 'AppWithProvider';

const AppWrapper = styled.View`
  background-color: ${topBarBackgroundColor};
`;

const AppContainer = styled.View`
  height: 100%;
  background-color: ${appBackgroundColor};
`;
