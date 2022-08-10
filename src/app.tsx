import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {useApp} from './lib/stores/app_store';
import {Accueil} from './pages/accueil';
import {Selection} from './pages/selection';
import {Edition} from './pages/edition';
import {appBackgroundColor, topBarBackgroundColor} from './lib/theme';

export const App: React.FC = () => (
  <SafeAreaProvider>
    <AppWithProvider />
    <StatusBar barStyle="light-content" />
  </SafeAreaProvider>
);
App.displayName = 'App';

const AppWithProvider: React.FC = () => {
  const [app] = useApp();

  let content = <Fragment />;
  if (app.currentPage === 'accueil') {
    content = <Accueil />;
  } else if (app.currentPage === 'tirage') {
    content = <Selection />;
  } else if (app.currentPage === 'edition') {
    content = <Edition />;
  }

  return (
    <AppWrapper>
      <AppContainer>{content}</AppContainer>
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
