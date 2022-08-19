import {Fragment, useRef} from 'react';
import {Alert, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {HorizontalSpacing, VerticalSpacing} from '../components/spacing';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {delRound, getGameWithId, useGames} from '../lib/stores/games_store';
import {
  darkgray,
  red,
  green,
  borderRadius,
  buttonHeight,
  fontSizes,
  pastilleBackgroundColor,
  spacing,
  topBarButtonWidth,
  topBarColor,
  pLight,
  gray,
  white,
  black,
  primary,
  pVeryLight,
  borderColorGame,
} from '../lib/theme';
import {getScoreWithId, getscoreWithRound} from '../lib/utilities';

export const Game: React.FC = () => {
  //______________ STORE & STATE ______________
  const [app] = useApp();
  const [games] = useGames();
  const scrollViewRef = useRef<ScrollView | null>();

  //______________ FUNCTIONS ______________
  const handlePressAnnuler = (): void => {
    Alert.alert('Confirmation', `Voulez-vous supprimer la dernière mène ?`, [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          delRound(app.currentGameId);
        },
        style: 'destructive',
      },
    ]);
  };
  //______________ INIT ______________
  if (!app.currentGameId || !getGameWithId(app.currentGameId) || getGameWithId(app.currentGameId).length === 0) {
    return <Fragment></Fragment>;
  }
  const scrollViewContent: JSX.Element[] = [];
  const game = getGameWithId(app.currentGameId);
  let i = 0;
  const current_score = [0, 0];
  if (game[0]) {
    game[0].rounds.forEach((r) => {
      const current_round_score = getscoreWithRound(r);
      current_score[0] = current_score[0] + current_round_score[0];
      current_score[1] = current_score[1] + current_round_score[1];
      scrollViewContent.push(
        <WrapperLineScore key={r.id}>
          <LineScoreTotal0
            key={'LineScoreTotal0' + r.id}
            style={{
              backgroundColor: i % 2 === 0 ? pVeryLight : white,
              fontWeight: current_score[0] > current_score[1] ? '600' : '300',
            }}
          >
            {current_score[0].toLocaleString()}
          </LineScoreTotal0>
          <LineScore0 key={'LineScore0' + r.id} style={{backgroundColor: i % 2 === 0 ? pVeryLight : white}}>
            {current_round_score[0] > 0 ? `+ ${current_round_score[0]}` : `-`}
          </LineScore0>
          <LineIndexMene key={'index' + r.id} style={{backgroundColor: i % 2 === 0 ? pVeryLight : white}}>
            {i + 1}
          </LineIndexMene>
          <LineScore1 key={'LineScore1' + r.id} style={{backgroundColor: i % 2 === 0 ? pVeryLight : white}}>
            {current_round_score[1] > 0 ? `+ ${current_round_score[1]}` : `-`}
          </LineScore1>
          <LineScoreTotal1
            key={'LineScoreTotal1' + r.id}
            style={{
              backgroundColor: i % 2 === 0 ? pVeryLight : white,
              fontWeight: current_score[1] > current_score[0] ? '600' : '300',
            }}
          >
            {current_score[1].toLocaleString()}
          </LineScoreTotal1>
        </WrapperLineScore>
      );
      i++;
    });
  }

  //______________ HTML ______________
  return (
    <GlobalWrapper>
      <TopBar
        left={
          <CustomButton
            text="Retour"
            icon="arrow-left"
            onPress={() => setApp({...app, currentPage: 'games_selection'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>Partie</Titre>}
        right={
          <CustomButton
            text="Annuler"
            icon="backspace-outline"
            onPress={handlePressAnnuler}
            width={topBarButtonWidth}
            disabled={getGameWithId(app.currentGameId)[0].rounds.length > 0 ? false : true}
          />
        }
      />
      <WrapperContent>
        <LineTeamsWrapper>
          <TeamsWrapper>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
          </TeamsWrapper>
          <HorizontalSpacing width={spacing} />
          <TeamsWrapper>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
          </TeamsWrapper>
        </LineTeamsWrapper>
        <LineScoresWrapper>
          <ScoresWrapper>
            <ScoreWrapper
              style={{
                fontWeight: getScoreWithId(app.currentGameId)[0] > getScoreWithId(app.currentGameId)[1] ? '600' : '300',
              }}
            >
              {getScoreWithId(app.currentGameId)[0].toLocaleString()}
            </ScoreWrapper>
          </ScoresWrapper>
          <HorizontalSpacing width={spacing} />
          <ScoresWrapper>
            <ScoreWrapper
              style={{
                fontWeight: getScoreWithId(app.currentGameId)[1] > getScoreWithId(app.currentGameId)[0] ? '600' : '300',
              }}
            >
              {getScoreWithId(app.currentGameId)[1].toLocaleString()}
            </ScoreWrapper>
          </ScoresWrapper>
        </LineScoresWrapper>
        <VerticalSpacing height={spacing} />
        <StyledScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
        >
          {scrollViewContent}
        </StyledScrollView>
      </WrapperContent>
      <WrapperAdd>
        <CustomButton
          text="Ajouter une mène"
          size="large"
          icon="plus-circle-outline"
          onPress={() => setApp({...app, currentPage: 'round'})}
        />
      </WrapperAdd>
      <BottomBar />
    </GlobalWrapper>
  );
};

Game.displayName = 'Game';

//______________ CSS ______________

//______________ TOPBAR ______________
const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
`;

//______________ WRAPPER ______________
const GlobalWrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const WrapperContent = styled.View`
  display: flex;
  flex-direction: column;
  height: 0;
  flex-grow: 1;
  background-color: ${gray};
  border-radius: ${borderRadius * 2}px;
  margin: ${spacing}px;
  margin-top: 0;
  padding: ${spacing}px;
  overflow: hidden;
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

//______________ TEAM ______________
const LineTeamsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${gray};
`;
const TeamsWrapper = styled.View`
  flex-direction: column;
  background-color: ${white};
  align-items: center;
  flex-grow: 1;
  border-top-style: solid;
  border-top-color: ${borderColorGame};
  border-top-width: 1px;
  border-right-style: solid;
  border-right-color: ${borderColorGame};
  border-right-width: 1px;
  border-left-style: solid;
  border-left-color: ${borderColorGame};
  border-left-width: 1px;
`;

const TeamWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const TeamEmojiPlayer = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

//______________ SCORE ______________
const LineScoresWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${gray};
`;
const ScoresWrapper = styled.View`
  flex-direction: column;
  background-color: ${white};
  align-items: center;
  width: 0;
  flex-grow: 1;
  border-bottom-style: solid;
  border-bottom-color: ${borderColorGame};
  border-bottom-width: 1px;
  border-right-style: solid;
  border-right-color: ${borderColorGame};
  border-right-width: 1px;
  border-left-style: solid;
  border-left-color: ${borderColorGame};
  border-left-width: 1px;
`;

const ScoreWrapper = styled.Text`
  font-size: ${fontSizes.xxl}px;
  height: ${buttonHeight.medium}px;
  flex-grow: 1;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  color: ${black};
`;

//______________ DETAIL SCORE ______________
const StyledScrollView = styled.ScrollView`
  background-color: white;
  border: solid 1px ${borderColorGame};
  flex-grow: 1;
`;

const WrapperLineScore = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
`;

const LineScore0 = styled.Text`
  width: 0;
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: right;
  line-height: ${buttonHeight.medium}px;
  padding-right: ${spacing * 2}px;
  color: ${pLight};
`;

const LineScoreTotal0 = styled.Text`
  width: 0;
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: left;
  line-height: ${buttonHeight.medium}px;
  padding-left: ${spacing * 2}px;
  color: ${black};
`;

const LineScore1 = styled.Text`
  width: 0;
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: left;
  line-height: ${buttonHeight.medium}px;
  padding-left: ${spacing * 2}px;
  color: ${pLight};
`;

const LineScoreTotal1 = styled.Text`
  width: 0;
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: right;
  line-height: ${buttonHeight.medium}px;
  padding-right: ${spacing * 2}px;
  color: ${black};
`;

const LineIndexMene = styled.Text`
  width: 0;
  flex-shrink: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: right;
  line-height: ${buttonHeight.medium}px;
  padding-right: ${spacing * 2}px;
  color: ${darkgray};
`;
