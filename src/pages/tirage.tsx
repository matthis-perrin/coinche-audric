import React, {Fragment} from 'react';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {fontSizes, spacing, topBarColor, topBarButtonWidth} from '../lib/theme';
import {useApp, setApp} from '../lib/stores';

export const Tirage: React.FC = () => {
  const [app] = useApp();
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
            text="Edition"
            icon="account-edit-outline"
            onPress={() => setApp({...app, currentPage: 'edition'})}
            width={topBarButtonWidth}
          />
        }
      />
      <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <BottomBar />
      </StyledScrollView>
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

const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
  margin: ${spacing}px;
  margin-bottom: 0;
`;
