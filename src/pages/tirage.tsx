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
import {VerticalSpacing} from '../components/spacing';
import {LayoutAnimation} from 'react-native';

export const Tirage: React.FC = () => {
  const [app] = useApp();
  const [teams, setTeams] = useState(getRandomTeams(app.numberOfTeams));

  const handlePressTirage = (): void => {
    LayoutAnimation.easeInEaseOut();
    setTeams(getRandomTeams(app.numberOfTeams));
  };

  const scrollViewContent: JSX.Element[] = [];
  let index = 1;
  teams.forEach((team, i) => {
    if (i !== 0) {
      scrollViewContent.push(<VerticalSpacing key={`spacing-${team.id}`} height={spacing * 2} />);
    }
    scrollViewContent.push(
      <WrapperTeamText key={team.id}>
        <TeamText>{`Equipe ${[index]}`}</TeamText>
      </WrapperTeamText>
    );
    team.players.forEach((p) => {
      scrollViewContent.push(<VerticalSpacing key={`spacing-${p.id}`} height={spacing} />);
      scrollViewContent.push(
        <PlayerWrapper key={p.id}>
          <PlayerEmoji>{p.emoji}</PlayerEmoji>
          <PlayerText>{p.name}</PlayerText>
        </PlayerWrapper>
      );
    });
    index++;
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

const WrapperTeamText = styled.View`
  flex-grow: 1;
  border-radius: ${borderRadius * 2}px;
  line-height: ${buttonHeight.medium}px;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  padding-left: ${spacing}px;
  padding-right: ${spacing}px;
  background-color: ${primary};
`;

const TeamText = styled.Text`
  flex-shrink: 1;
  line-height: ${buttonHeight.medium}px;
  font-size: ${fontSizes.medium}px;
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
