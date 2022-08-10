import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  LayoutChangeEvent,
  LayoutRectangle,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import {Categories, EmojiSelector} from '../components/emoji_picker';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {VerticalSpacing} from '../components/spacing';
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
import {useApp, setApp} from '../lib/stores/app_store';
import {getSortedPlayers, sortPlayerByName} from '../lib/utilities';
import {initialName} from '../lib/constants';
import {
  addPlayer,
  delPlayer,
  getPlayers,
  Player,
  setPlayerEmoji,
  setPlayers,
  usePlayers,
} from '../lib/stores/players_store';

export const Edition: React.FC = () => {
  const [app] = useApp();
  const [players] = usePlayers();
  let localPlayers: Player[] = [];
  const [emojiPickerPlayer, setEmojiPickerPlayer] = useState<Player>();

  const scrollViewRef = useRef<ScrollView | null>();
  const scrollViewLayout = useRef<LayoutRectangle | null>();
  const scrollViewContentSize = useRef(0);
  const inputByPlayer = useRef(new Map<number, TextInput>());
  const layoutByPlayer = useRef(new Map<number, LayoutRectangle>());
  const [contentOffset, setContentOffset] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardVisible(true);
      localPlayers = [...getPlayers()];
      const keyboardHeight = e.endCoordinates.height;
      if (!scrollViewLayout.current) {
        return;
      }
      for (const [playerId, input] of inputByPlayer.current.entries()) {
        const inputLayout = layoutByPlayer.current.get(playerId);
        if (!inputLayout) {
          continue;
        }
        if (input.isFocused()) {
          const visibleScrollViewHeight = scrollViewLayout.current.height - keyboardHeight;
          const idealInputPosition = (visibleScrollViewHeight - inputLayout.height) / 2;
          const targetScroll = inputLayout.y - idealInputPosition;
          const maxScroll = scrollViewContentSize.current - scrollViewLayout.current.height;
          const scrollAgainAfterRelayout = targetScroll > maxScroll;
          LayoutAnimation.configureNext(
            LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing], LayoutAnimation.Properties.opacity),
            () => {
              if (scrollAgainAfterRelayout) {
                scrollViewRef.current?.scrollTo({x: 0, y: targetScroll, animated: true});
              }
            }
          );
          setContentOffset(keyboardHeight);
          scrollViewRef.current?.scrollTo({x: 0, y: targetScroll, animated: true});
        }
      }
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
      setKeyboardVisible(false);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(250, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity)
      );
      setContentOffset(0);
      setPlayers(localPlayers);
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const onPressAddPlayer = (): void => {
    addPlayer();
  };

  const onPressDeletePlayer = (p: Player): void => {
    if (p.name !== initialName) {
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
    const current_players = getPlayers();
    for (const p of current_players) {
      if (p.id === player.id) {
        const copy_p = {...p};
        copy_p.name = text;
        localPlayers.push(copy_p);
      } else {
        localPlayers.push(p);
      }
    }
  };

  const scrollViewContent: JSX.Element[] = [];
  let firstPlayer = true;
  getSortedPlayers().forEach((p) => {
    if (firstPlayer) {
      firstPlayer = false;
    } else {
      scrollViewContent.push(<VerticalSpacing key={p.id * p.id} height={spacing} />);
    }
    scrollViewContent.push(
      <PlayerWrapper
        key={p.id}
        onLayout={(e: LayoutChangeEvent) => {
          layoutByPlayer.current.set(p.id, e.nativeEvent.layout);
        }}
      >
        <PlayerEmoji onPress={() => handlePlayerEmojiPress(p)}>{p.emoji}</PlayerEmoji>
        <TextInputPlayer
          ref={(ref: TextInput | null) => {
            if (ref === null) {
              inputByPlayer.current.delete(p.id);
            } else {
              inputByPlayer.current.set(p.id, ref);
            }
          }}
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
      </PlayerWrapper>
    );
  });

  return (
    <Fragment>
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
        <WrapperAdd>
          <CustomButton icon="account-plus" text="Ajouter joueur" onPress={onPressAddPlayer} size="large" />
        </WrapperAdd>
        <ScrollView
          ref={(ref) => (scrollViewRef.current = ref)}
          onLayout={(e: LayoutChangeEvent) => {
            if (contentOffset === 0) {
              scrollViewLayout.current = e.nativeEvent.layout;
            }
          }}
          onContentSizeChange={(width: number, height: number) => {
            scrollViewContentSize.current = height;
          }}
          style={{marginBottom: contentOffset, flexGrow: 1}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {scrollViewContent}
          <BottomBar />
        </ScrollView>
      </Fragment>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <OverlayView style={{display: isKeyboardVisible ? 'flex' : 'none'}}></OverlayView>
      </TouchableWithoutFeedback>
      {emojiPickerPlayer ? (
        <EmojiWrapper>
          <EmojiSelector
            theme="#007AFF"
            columns={8}
            placeholder="Recherche..."
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

const WrapperAdd = styled.View`
  margin: ${spacing}px;
  margin-top: 0;
  background-color: transparent;
`;

const PlayerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  margin: 0px ${spacing}px;
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
  border-radius: ${borderRadius}px;
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

const OverlayView = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: transparent;
`;
