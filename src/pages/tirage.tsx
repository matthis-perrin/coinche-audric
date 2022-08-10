import React, {Fragment, useState} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {fontSizes, spacing, topBarColor, topBarButtonWidth} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {getRandomTeams} from '../lib/utilities';
import {SelectablePlayer} from '../components/selectable_player';

export const Tirage: React.FC = () => {
  const [app] = useApp();
  const [teams, setTeams] = useState(getRandomTeams());

  const handlePressTirage = (): void => {
    setTeams(getRandomTeams());
  };

  const scrollViewContent: JSX.Element[] = [];
  teams.forEach((team) => {
    scrollViewContent.push(<WrapperTeamText>{`Equipe ${[team.id]}`}</WrapperTeamText>);
    team.players.forEach((p) => {
      scrollViewContent.push(<SelectablePlayer player={p} key={p.id}></SelectablePlayer>);
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

const WrapperTeamText = styled.Text`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-top: 0;
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
