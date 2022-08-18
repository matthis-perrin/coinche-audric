import {Fragment} from 'react';
import {Button, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {HorizontalSpacing, VerticalSpacing} from '../components/spacing';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {
  black,
  borderRadius,
  buttonHeight,
  fontSizes,
  pastilleBackgroundColor,
  spacing,
  topBarButtonWidth,
  topBarColor,
} from '../lib/theme';
import {getGameWithId} from '../lib/utilities';

export const Game: React.FC = () => {
  //______________ STORE & STATE ______________
  const [app] = useApp();

  //______________ FUNCTIONS ______________
  const handleAddRoundPress = (): void => {};

  //______________ INIT ______________
  if (!app.currentGameId) {
    return <Fragment></Fragment>;
  }

  const score1 = 10000080;
  const score2 = 900;

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
      />
      <WrapperContent>
        <WrapperScore>
          <WrapperScoreTeam>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
            <TeamScore style={{fontWeight: score1 > score2 ? '600' : '300'}}>{score1.toLocaleString()}</TeamScore>
          </WrapperScoreTeam>
          <Sep />
          <WrapperScoreTeam>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
            <TeamScore style={{fontWeight: score1 < score2 ? '600' : '300'}}>{score2.toLocaleString()}</TeamScore>
          </WrapperScoreTeam>
        </WrapperScore>
        <DetailScoreScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {[...new Array(40)].map(() => (
            <ScoreLine>
              <ScoreLineSide>
                <Text>0</Text>
              </ScoreLineSide>
              <Sep />
              <ScoreLineSide>
                <Text>90</Text>
              </ScoreLineSide>
            </ScoreLine>
          ))}
        </DetailScoreScrollView>
      </WrapperContent>
      <WrapperAdd>
        <CustomButton
          text="Ajouter une mène"
          size="large"
          icon="plus-circle-outline"
          onPress={() => handleAddRoundPress()}
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
  margin-right: ${topBarButtonWidth}px;
`;

//______________ WRAPPER ______________
const GlobalWrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const WrapperScore = styled.View`
  flex-direction: row;
  background-color: ${pastilleBackgroundColor};
`;

//______________ TEAM ______________
const WrapperScoreTeam = styled.View`
  flex-direction: column;
  background-color: green;
  align-items: center;
  width: 0;
  flex-grow: 1;
`;

const TeamWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
  background-color: purple;
`;
const TeamEmojiPlayer = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

//

const DetailScoreScrollView = styled.ScrollView`
  background-color: orange;
  flex-grow: 1;
`;

const ScoreLine = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white;
`;

const ScoreLineSide = styled.View`
  padding: ${spacing}px;
  width: 0;
  flex-grow: 1;
`;

const Sep = styled.View`
  flex-shrink: 0;
  flex-grow: 0;
  width: 1px;
  background-color: black;
  margin: 0 ${spacing}px;
`;

const WrapperContent = styled.View`
  display: flex;
  flex-direction: column;
  height: 0;
  flex-grow: 1;
  background-color: blue;
  border-radius: ${borderRadius * 2};
  margin: ${spacing}px;
  margin-top: 0;
  padding: ${spacing}px;
  overflow: hidden; /* Overflow = dépassement ; hidden = caché ; Permet de cacher tout ce qui dépasse, notament ce qui va par dessus les border radius */
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

const TeamScore = styled.Text``;
