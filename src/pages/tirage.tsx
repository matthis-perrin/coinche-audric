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
  borderRadius,
  inputBackgroundColor,
  buttonHeight,
  pastilleSelectdBackgroundColor,
  white,
} from '../lib/theme';
import {useApp, setApp, handlePlayerPress, usePlayersSelected, getPlayersSelected} from '../lib/stores';
import {VerticalSpacing} from '../components/spacing';
import {sortPlayer} from '../lib/utilities';
import {TouchableWithoutFeedback} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const Tirage: React.FC = () => {
  const [app] = useApp();
  const [playersSelected] = usePlayersSelected();

  const handlePressTirage = () => void {};
  const scrollViewContent: JSX.Element[] = [];
  let firstPlayer = true;
  sortPlayer().forEach((p) => {
    if (firstPlayer) {
      firstPlayer = false;
    } else {
      scrollViewContent.push(<VerticalSpacing height={spacing} />);
    }
    scrollViewContent.push(
      <TouchableWithoutFeedback onPress={() => handlePlayerPress(p)}>
        <PlayerWrapper>
          <PlayerEmoji>{p.emoji}</PlayerEmoji>
          <PlayerText>{p.name}</PlayerText>
          <WrapperIconCheck>
            <MaterialCommunityIcons
              key="icon"
              name="check-circle"
              size={25}
              color={
                getPlayersSelected().some((p1) => p1.id === p.id)
                  ? pastilleSelectdBackgroundColor
                  : pastilleBackgroundColor
              }
            />
          </WrapperIconCheck>
        </PlayerWrapper>
      </TouchableWithoutFeedback>
    );
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
  margin-top: 0;
`;

const WrapperBottomButton = styled.View`
  margin: ${spacing}px;
  margin-top: 0;
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

const WrapperIconCheck = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  background-color: ${inputBackgroundColor};
`;
