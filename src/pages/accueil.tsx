import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {fontSizes, spacing, topBarColor} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';
import {resetPlayersSelected} from '../lib/stores/selected_players_store.tsx';
import {VerticalSpacing} from '../components/spacing';

export const Accueil: React.FC = () => {
  const [app] = useApp();
  resetPlayersSelected();
  return (
    <Fragment>
      <TopBar middle={<Titre>Accueil</Titre>} />
      <WrapperAdd>
        <CustomButton
          text="Configuration des joueurs"
          size="large"
          icon="account-edit-outline"
          onPress={() => setApp({...app, currentPage: 'edition'})}
        />
      </WrapperAdd>
      <VerticalSpacing height={spacing} />
      <WrapperAdd>
        <CustomButton
          text="Tirer des équipes au hasard"
          size="large"
          icon="dice-3"
          onPress={() => setApp({...app, currentPage: 'selection'})}
        />
      </WrapperAdd>
      <VerticalSpacing height={spacing} />
      <WrapperAdd>
        <CustomButton
          text="Coinche"
          size="large"
          icon="cards-playing-heart-multiple-outline"
          onPress={() => setApp({...app, currentPage: 'games_selection'})}
        />
      </WrapperAdd>
      <VerticalSpacing height={spacing} />
      <WrapperAdd>
        <CustomButton text="Tirer les rois" size="large" onPress={() => setApp({...app, currentPage: 'kings_pull'})} />
      </WrapperAdd>
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <BottomBar />
      </StyledScrollView>
    </Fragment>
  );
};
Accueil.displayName = 'Accueil';

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-bottom: 0;
`;
