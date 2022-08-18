import {Fragment} from 'react';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {HorizontalSpacing, VerticalSpacing} from '../components/spacing';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {
  darkgray,
  borderRadius,
  buttonHeight,
  fontSizes,
  pastilleBackgroundColor,
  spacing,
  topBarButtonWidth,
  topBarColor,
  pLight,
} from '../lib/theme';
import {getGameWithId} from '../lib/utilities';

export const Game: React.FC = () => {
  //______________ STORE & STATE ______________
  const [app] = useApp();

  //______________ FUNCTIONS ______________

  //______________ INIT ______________
  if (!app.currentGameId) {
    return <Fragment></Fragment>;
  }
  const scrollViewContent: JSX.Element[] = [];

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
        <LineTeamsWrapper>
          <TeamsWrapper>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
          </TeamsWrapper>
          <HorizontalSpacing width={spacing / 2} />
          <TeamsWrapper>
            <TeamWrapper>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[0].emoji}</TeamEmojiPlayer>
              <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[1].emoji}</TeamEmojiPlayer>
            </TeamWrapper>
          </TeamsWrapper>
        </LineTeamsWrapper>
        <VerticalSpacing height={spacing / 2} />
        <LineScoresWrapper>
          <ScoresWrapper>
            <ScoreWrapper>0</ScoreWrapper>
          </ScoresWrapper>
          <HorizontalSpacing width={spacing / 2} />
          <ScoresWrapper>
            <ScoreWrapper>999</ScoreWrapper>
          </ScoresWrapper>
        </LineScoresWrapper>
        <VerticalSpacing height={spacing} />
        <StyledScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
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
  margin-right: ${topBarButtonWidth}px;
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
  background-color: ${pastilleBackgroundColor};
  border-radius: ${borderRadius * 2};
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
  background-color: ${pastilleBackgroundColor};
`;
const TeamsWrapper = styled.View`
  flex-direction: column;
  background-color: ${darkgray};
  align-items: center;
  flex-grow: 1;
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
  background-color: ${pastilleBackgroundColor};
`;
const ScoresWrapper = styled.View`
  flex-direction: column;
  background-color: ${pLight};
  align-items: center;
  width: 0;
  flex-grow: 1;
`;

const ScoreWrapper = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  flex-grow: 1;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  color: white;
`;

//______________ DETAIL SCORE ______________
const StyledScrollView = styled.ScrollView`
  background-color: white;
  flex-grow: 1;
`;
