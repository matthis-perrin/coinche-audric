import React, {Fragment} from 'react';
import {Alert, Keyboard} from 'react-native';
import styled from 'styled-components/native';

import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
// import {clearPersistentDataStore} from '../lib/data_store';
import {
  fontSizes,
  spacing,
  topBarColor,
  topBarButtonWidth,
  borderRadius,
  buttonHeight,
  inputBackgroundColor,
  pastilleBackgroundColor,
} from '../lib/theme';
import {useApp, setApp, addPlayer, usePlayers, Player, delPlayer, setPlayerIcon} from '../lib/stores';

export const Edition: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  const onPressAddPlayer = (): void => {
    addPlayer();
  };
  const onPressDeletePlayer = (player: Player): void => {
    delPlayer(player);
  };
  const onIconChange = (text: string, player: Player): void => {
    setPlayerIcon([...text].slice(-1)[0] ?? '💣', player);
    Keyboard.dismiss();
  };
  const onTextChange = (text: string, player: Player): void => {
    player.name = text;
  };
  const sortedPlayer = players.slice();
  sortedPlayer.sort((p1, p2) => p1.name.localeCompare(p2.name));
  const scrollViewContent: JSX.Element[] = [];
  sortedPlayer.forEach((p) =>
    scrollViewContent.push(
      <PlayerWrapper key={p.id}>
        <TextInputFailDesign
          caretHidden
          selectTextOnFocus
          onChangeText={(text: string) => onIconChange(text, p)}
          defaultValue={p.icon}
        />
        <TextInputPlayer
          selectTextOnFocus
          onChangeText={(text: string) => onTextChange(text, p)}
          defaultValue={p.name}
        />
        <CustomButton icon="backspace-outline" onPress={() => onPressDeletePlayer(p)} />
      </PlayerWrapper>
    )
  );
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
        middle={<Titre>{`Edition`}</Titre>}
        right={
          <CustomButton
            text="Tirage"
            icon="dice-3"
            onPress={() => setApp({...app, currentPage: 'tirage'})}
            width={topBarButtonWidth}
          />
        }
      />
      <StyledScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {scrollViewContent}
      </StyledScrollView>
      <WrapperAdd>
        <CustomButton icon="account-plus" text="Ajouter joueur" onPress={onPressAddPlayer} size="large" />
      </WrapperAdd>
      <BottomBar />
    </Fragment>
  );
};
Edition.displayName = 'Edition';

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

const WrapperAdd = styled.View`
  margin: ${spacing}px;
  margin-bottom: 0;
  background-color: transparent;
`;

const PlayerWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  margin: 0px ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

const TextInputPlayer = styled.TextInput`
  flex-grow: 1;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
  padding-left: ${spacing}px;
  margin: 0 ${spacing / 2}px;
`;

const TextInputFailDesign = styled.TextInput`
  text-align: center;
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
`;

const WrapperSwap = styled.View`
  align-items: center;
  margin: ${-spacing / 2}px 0;
  z-index: 2;
`;
