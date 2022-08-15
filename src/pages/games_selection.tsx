import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {clearPersistentDataStore} from '../lib/data_store';
import {fontSizes, spacing, topBarButtonWidth, topBarColor} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {VerticalSpacing} from '../components/spacing';
import {getRandomTeams} from '../lib/utilities';
import {addGame, useGames} from '../lib/stores/games_store';

export const GamesSelection: React.FC = () => {
  const [app] = useApp();
  const [games] = useGames();
  console.log(games);

  const handleAddGamePress = (): void => {
    addGame(getRandomTeams(2));
  };

  const handledelGamePress = (): void => {
    clearPersistentDataStore('games');
  };

  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            text="Accueil"
            icon="home"
            onPress={() => setApp({...app, currentPage: 'accueil'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>Parties</Titre>}
      />
      <WrapperAdd>
        <CustomButton
          text="Ajouter une partie"
          size="large"
          icon="cards-playing-heart-multiple-outline"
          onPress={() => handleAddGamePress()}
        />
      </WrapperAdd>
      <VerticalSpacing key={'Spacing_1'} height={spacing} />
      <WrapperAdd>
        <CustomButton
          text="Supprimer les parties"
          size="large"
          icon="delete-forever"
          onPress={() => handledelGamePress()}
        />
      </WrapperAdd>
      <BottomBar />
    </Fragment>
  );
};
GamesSelection.displayName = 'GamesSelection';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
  margin-right: ${topBarButtonWidth}px;
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;
