import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {useApp} from './lib/stores/app_store';
import {Accueil} from './pages/accueil';
import {Selection} from './pages/selection';
import {Edition} from './pages/edition';
import {appBackgroundColor, topBarBackgroundColor} from './lib/theme';
import {Tirage} from './pages/tirage';
import {GamesSelection} from './pages/games_selection';
import {Round} from './pages/round';
import {Game} from './pages/game';
import {SelectionCoinche} from './pages/selection_coinche';
import {useGames} from './lib/stores/games_store';
import {usePlayers} from './lib/stores/players_store';

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
  } else if (app.currentPage === 'selection') {
    content = <Selection />;
  } else if (app.currentPage === 'edition') {
    content = <Edition />;
  } else if (app.currentPage === 'tirage') {
    content = <Tirage />;
  } else if (app.currentPage === 'games_selection') {
    content = <GamesSelection />;
  } else if (app.currentPage === 'game') {
    content = <Game />;
  } else if (app.currentPage === 'round') {
    content = <Round />;
  } else if (app.currentPage === 'selection_coinche') {
    content = <SelectionCoinche />;
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
