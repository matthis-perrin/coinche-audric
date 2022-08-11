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
  borderRadius,
  pastilleBackgroundColor,
  inputBackgroundColor,
  buttonHeight,
  pLight,
  secondary,
  white,
  primary,
  black,
} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {getRandomTeams} from '../lib/utilities';
import {SelectablePlayer} from '../components/selectable_player';
import {VerticalSpacing} from '../components/spacing';

export const Tirage: React.FC = () => {
  const [app] = useApp();
  const [teams, setTeams] = useState(getRandomTeams());

  const handlePressTirage = (): void => {
    setTeams(getRandomTeams());
  };

  const scrollViewContent: JSX.Element[] = [];
  let first_team = true;
  teams.forEach((team) => {
    if (first_team) {
      first_team = false;
    } else {
      scrollViewContent.push(<VerticalSpacing key={team.id} height={spacing * 2} />);
    }
    scrollViewContent.push(<WrapperTeamText>{`Equipe ${[team.id]}`}</WrapperTeamText>);
    team.players.forEach((p) => {
      scrollViewContent.push(<VerticalSpacing key={p.id * p.id} height={spacing} />);
      scrollViewContent.push(
        <PlayerWrapper>
          <PlayerEmoji>{p.emoji}</PlayerEmoji>
          <PlayerText>{p.name}</PlayerText>
        </PlayerWrapper>
      );
    });
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
        middle={<Titre>{`Tirage`}</Titre>}
        right={
          <CustomButton
            text="Selection"
            icon="account-check-outline"
            onPress={() => setApp({...app, currentPage: 'selection'})}
            width={topBarButtonWidth}
          />
        }
      />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {scrollViewContent}
      </StyledScrollView>
      <WrapperBottomButton>
        <CustomButton text="Relancer le tirage" icon="dice-3" size="large" onPress={() => handlePressTirage()} />
      </WrapperBottomButton>
      <BottomBar />
    </Fragment>
  );
};
Tirage.displayName = 'Tirage';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
`;

const PlayerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

const PlayerEmoji = styled.Text`
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

const PlayerText = styled.Text`
  flex-grow: 1;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: left;
  line-height: ${buttonHeight.medium}px;
`;

const WrapperTeamText = styled.Text`
  flex-grow: 1;
  line-height: ${buttonHeight.medium}px;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  padding-left: ${spacing}px;
  background-color: ${black};
  color: ${white};
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
