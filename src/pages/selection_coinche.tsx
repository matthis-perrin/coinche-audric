import React, {Fragment, useCallback} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {fontSizes, spacing, topBarColor, topBarButtonWidth} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {VerticalSpacing} from '../components/spacing';
import {usePlayersSelectedId} from '../lib/stores/selected_players_store.tsx';
import {getRandomTeams, getSortedNotSelectedPlayers, getSortedSelectedPlayers} from '../lib/utilities';
import {SelectablePlayer} from '../components/selectable_player';
import {usePlayers} from '../lib/stores/players_store';
import {LayoutAnimation} from 'react-native';
import {getNewGame, setGame} from '../lib/stores/games_store';

export const SelectionCoinche: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  const [PlayersSelectedId] = usePlayersSelectedId();

  const scrollViewContent: JSX.Element[] = [];
  const handleSelected = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
  }, []);
  const handlePressStart = (): void => {
    const new_game = getNewGame(getRandomTeams(2));
    setApp({...app, currentGameId: new_game.id});
    setGame(new_game);
    setApp({...app, currentPage: 'game'});
  };
  let firstPlayer = true;
  getSortedSelectedPlayers().forEach((p) => {
    if (firstPlayer) {
      firstPlayer = false;
    } else {
      scrollViewContent.push(<VerticalSpacing key={p.id * p.id} height={spacing} />);
    }
    scrollViewContent.push(<SelectablePlayer player={p} key={p.id} onSelected={handleSelected}></SelectablePlayer>);
  });
  if (getSortedSelectedPlayers().length > 0) {
    scrollViewContent.push(<VerticalSpacing key={'selected_separator'} height={spacing * 2} />);
  }
  firstPlayer = true;
  getSortedNotSelectedPlayers().forEach((p) => {
    if (firstPlayer) {
      firstPlayer = false;
    } else {
      scrollViewContent.push(<VerticalSpacing key={p.id * p.id} height={spacing} />);
    }
    scrollViewContent.push(<SelectablePlayer player={p} key={p.id} onSelected={handleSelected}></SelectablePlayer>);
  });

  return (
    <Fragment>
      <TopBar
        left={
          <CustomButton
            text="Retour"
            icon="arrow-left"
            onPress={() => setApp({...app, currentPage: 'games_selection'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>{`Sélection`}</Titre>}
      />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {scrollViewContent}
      </StyledScrollView>
      <WrapperBottomButton>
        <CustomButton
          text="Lancer la partie"
          icon="cards-playing"
          size="large"
          onPress={handlePressStart}
          disabled={PlayersSelectedId.length !== 4 ? true : false}
        />
      </WrapperBottomButton>

      <BottomBar />
    </Fragment>
  );
};
SelectionCoinche.displayName = 'SelectionCoinche';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
  margin-right: ${topBarButtonWidth}px;
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-top: 0;
`;

const WrapperBottomButton = styled.View`
  margin: ${spacing}px;
  margin-top: 0;
`;
