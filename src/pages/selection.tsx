import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {Fragment, useState} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {
  fontSizes,
  spacing,
  topBarColor,
  topBarButtonWidth,
  primary,
  topBarBackgroundColor,
  white,
  buttonHeight,
  borderRadius,
  secondary,
} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {VerticalSpacing} from '../components/spacing';
import {usePlayersSelectedId} from '../lib/stores/selected_players_store.tsx';
import {getSortedNotSelectedPlayers, getSortedSelectedPlayers} from '../lib/utilities';
import {SelectablePlayer} from '../components/selectable_player';
import {usePlayers} from '../lib/stores/players_store';
import {TouchableOpacity, View} from 'react-native';

export const Selection: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  const [PlayersSelectedId] = usePlayersSelectedId();
  const [numberOfTeams, setnumberOfTeams] = useState(2);

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
      <WrapperNumberOfTeam>
        <TitreNumberOfTeam>Nombre d'équipe</TitreNumberOfTeam>
        <ButtonWrapper>
          <TouchableOpacity
            onPress={() => setApp({...app, currentPage: 'tirage'})}
            activeOpacity={0.7}
            disabled={false}
          >
            <WrapperIcon>
              <MaterialCommunityIcons key="icon" name="minus-circle" size={fontSizes.medium} color={primary} />
            </WrapperIcon>
          </TouchableOpacity>
          <WrapperTextNumberOfTeams>
            <TextNumberOfTeams>2</TextNumberOfTeams>
          </WrapperTextNumberOfTeams>
          <TouchableOpacity
            onPress={() => setApp({...app, currentPage: 'tirage'})}
            activeOpacity={0.7}
            disabled={false}
          >
            <WrapperIcon>
              <MaterialCommunityIcons key="icon" name="plus-circle" size={fontSizes.medium} color={primary} />
            </WrapperIcon>
          </TouchableOpacity>
        </ButtonWrapper>
      </WrapperNumberOfTeam>
      <VerticalSpacing height={spacing} />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {scrollViewContent}
      </StyledScrollView>
      <WrapperBottomButton>
        <CustomButton
          text="Lancer le tirage"
          icon="dice-3"
          size="large"
          onPress={() => setApp({...app, currentPage: 'tirage'})}
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

const WrapperNumberOfTeam = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${primary};
`;

const TitreNumberOfTeam = styled.Text`
  flex-grow: 1;
  line-height: ${buttonHeight.medium}px;
  font-size: ${fontSizes.medium}px;
  margin-left: ${spacing * 2}px;
  color: ${white};
`;

const ButtonWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  padding: ${spacing}px;
`;

const WrapperTextNumberOfTeams = styled.View`
  border-radius: ${borderRadius}px;
  font-size: ${fontSizes.medium}px;
  margin-left: ${spacing}px;
  margin-right: ${spacing}px;
  background-color: ${white};
  width: ${buttonHeight.medium}px;
`;

const TextNumberOfTeams = styled.Text`
  line-height: ${buttonHeight.medium}px;
  text-align: center;
  font-size: ${fontSizes.medium}px;
`;

const WrapperIcon = styled.View`
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius}px;
  background-color: ${secondary};
`;
