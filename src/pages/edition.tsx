import React, {Fragment, useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {Categories, EmojiSelector} from '../components/emoji_picker';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {VerticalSpacing} from '../components/spacing';
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
  appBackgroundColor,
} from '../lib/theme';
import {useApp, setApp, addPlayer, usePlayers, Player, delPlayer, setPlayerEmoji} from '../lib/stores';

export const Edition: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  const [emojiPickerPlayer, setEmojiPickerPlayer] = useState<Player | undefined>();

  const onPressAddPlayer = (): void => {
    addPlayer();
  };

  const onPressDeletePlayer = (p: Player): void => {
    if (p.name !== `Nouveau joueur`) {
      Alert.alert('Confirmation', `Voulez-vous supprimer ${p.name} ?`, [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            delPlayer(p);
          },
          style: 'destructive',
        },
      ]);
    } else {
      delPlayer(p);
    }
  };

  const handlePlayerEmojiSelected = (player: Player, emoji: string): void => {
    setPlayerEmoji(emoji, player);
    setEmojiPickerPlayer(undefined);
  };

  const handlePlayerEmojiPress = (player: Player): void => {
    setEmojiPickerPlayer(player);
  };

  const onTextChange = (text: string, player: Player): void => {
    player.name = text;
  };

  const sortedPlayer = players.slice();
  sortedPlayer.sort((p1, p2) => {
    if (p1.name === `Nouveau joueur`) {
      return 1;
    } else if (p2.name === `Nouveau joueur`) {
      return -1;
    } else {
      return p1.name.localeCompare(p2.name);
    }
  });

  const scrollViewContent: JSX.Element[] = [];
  sortedPlayer.forEach((p) =>
    scrollViewContent.push(
      <PlayerWrapper key={p.id}>
        <PlayerEmoji onPress={() => handlePlayerEmojiPress(p)}>{p.emoji}</PlayerEmoji>
        <TextInputPlayer
          selectTextOnFocus
          onChangeText={(text: string) => onTextChange(text, p)}
          defaultValue={p.name}
        />
        <CustomButton
          iconSizeRatio={1.2}
          icon="trash-can-outline"
          size="medium"
          onPress={() => onPressDeletePlayer(p)}
        />
      </PlayerWrapper>,
      <VerticalSpacing height={spacing} />
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
      {emojiPickerPlayer ? (
        <EmojiWrapper>
          <EmojiSelector
            theme="#007AFF"
            columns={6}
            placeholder="Search..."
            showSearchBar={false}
            showHistory={false}
            showTabs={false}
            showSectionTitles={false}
            category={Categories.all}
            onEmojiSelected={(emoji) => handlePlayerEmojiSelected(emojiPickerPlayer, emoji)}
          />
        </EmojiWrapper>
      ) : (
        <Fragment />
      )}
      <WrapperAdd>
        <CustomButton icon="account-plus" text="Ajouter joueur" onPress={onPressAddPlayer} size="large" />
      </WrapperAdd>
      <BottomBar />
    </Fragment>
  );
};
Edition.displayName = 'Edition';

const PlayerEmoji = styled.Text`
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  border-radius: ${borderRadius}px;
`;

const EmojiWrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${appBackgroundColor};
  padding: 40px 0 0 0;
`;

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
