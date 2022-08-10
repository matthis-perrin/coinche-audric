import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {fontSizes, spacing, topBarColor} from '../lib/theme';
import {useApp, setApp} from '../lib/stores/app_store';

export const Accueil: React.FC = () => {
  const [app] = useApp();
  return (
    <Fragment>
      <TopBar middle={<Titre>Accueil</Titre>} />
      <WrapperAdd>
        <CustomButton
          text="Tirage des équipes"
          size="large"
          icon="dice-3"
          onPress={() => setApp({...app, currentPage: 'tirage'})}
        />
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
