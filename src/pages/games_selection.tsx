import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {fontSizes, spacing, topBarButtonWidth, topBarColor} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {VerticalSpacing} from '../components/spacing';
import {useGames} from '../lib/stores/games_store';
import {SelectableGame} from '../components/selectable_game';

export const GamesSelection: React.FC = () => {
  const [app] = useApp();
  const [games] = useGames();

  const handleAddGamePress = (): void => {
    setApp({...app, currentPage: 'selection_coinche'});
  };

  const scrollViewContent: JSX.Element[] = [];
  if (games) {
    let firstPlayer = true;
    games.forEach((game) => {
      if (firstPlayer) {
        firstPlayer = false;
      } else {
        scrollViewContent.push(<VerticalSpacing key={'spacing_game_' + game.id} height={spacing} />);
      }
      scrollViewContent.push(<SelectableGame game={game} key={game.id} />);
    });
  }
  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            text="Retour"
            icon="arrow-left"
            onPress={() => setApp({...app, currentPage: 'accueil'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>Parties</Titre>}
      />
      <WrapperAdd>
        <CustomButton
          text="Démarrer une nouvelle partie"
          size="large"
          icon="cards-playing-heart-multiple-outline"
          onPress={() => handleAddGamePress()}
        />
      </WrapperAdd>
      <VerticalSpacing key={'spacing_game_scrollView'} height={spacing} />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {scrollViewContent}
      </StyledScrollView>
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

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-top: 0;
`;
