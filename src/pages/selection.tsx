import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {
  fontSizes,
  spacing,
  topBarColor,
  topBarButtonWidth,
  pastilleBackgroundColor,
  buttonHeight,
  pastilleSelectdBackgroundColor,
} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {VerticalSpacing} from '../components/spacing';
import {TouchableWithoutFeedback} from 'react-native';
import {getPlayersSelectedId, handlePlayerPress, usePlayersSelectedId} from '../lib/stores/selected_players_store.tsx';
import {getSortedNotSelectedPlayers, getSortedSelectedPlayers} from '../lib/utilities';
import {SelectablePlayer} from '../components/selectable_player';
import {usePlayers} from '../lib/stores/players_store';

export const Selection: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  const [PlayersSelectedId] = usePlayersSelectedId();

  const handlePressTirage = () => void {};
  const scrollViewContent: JSX.Element[] = [];
  let firstPlayer = true;
  getSortedSelectedPlayers().forEach((p) => {
    if (firstPlayer) {
      firstPlayer = false;
    } else {
      scrollViewContent.push(<VerticalSpacing key={p.id * p.id} height={spacing} />);
    }
    scrollViewContent.push(<SelectablePlayer player={p} key={p.id}></SelectablePlayer>);
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
    scrollViewContent.push(<SelectablePlayer player={p} key={p.id}></SelectablePlayer>);
  });

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
        middle={<Titre>{`Sélection`}</Titre>}
        right={
          <CustomButton
            text="Edition"
            icon="account-edit-outline"
            onPress={() => setApp({...app, currentPage: 'edition'})}
            width={topBarButtonWidth}
          />
        }
      />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {scrollViewContent}
      </StyledScrollView>
      <WrapperBottomButton>
        <CustomButton
          text="Tirage au sort des équipes"
          icon="dice-3"
          size="large"
          onPress={() => handlePressTirage()}
        />
      </WrapperBottomButton>
      <BottomBar />
    </Fragment>
  );
};
Selection.displayName = 'Selection';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
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
