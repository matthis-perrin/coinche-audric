import {Fragment} from 'react';
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
      <WrapperScore>
        <WrapperScoreTeam1>
          <Team1Wrapper>
            <Team1EmojiPlayer1>{getGameWithId(app.currentGameId)[0].teams[0].players[0].emoji}</Team1EmojiPlayer1>
            <Team1EmojiPlayer2>{getGameWithId(app.currentGameId)[0].teams[0].players[1].emoji}</Team1EmojiPlayer2>
          </Team1Wrapper>
        </WrapperScoreTeam1>
        <HorizontalSpacing
          key={'spacing_game_score1'}
          width={spacing}
          style={{borderRightColor: black, borderRightWidth: 1}}
        />
        <HorizontalSpacing key={'spacing_game_score2'} width={spacing} />
        <WrapperScoreTeam2>
          <Team2Wrapper>
            <Team2EmojiPlayer1>{getGameWithId(app.currentGameId)[0].teams[1].players[0].emoji}</Team2EmojiPlayer1>
            <Team2EmojiPlayer2>{getGameWithId(app.currentGameId)[0].teams[1].players[1].emoji}</Team2EmojiPlayer2>
          </Team2Wrapper>
        </WrapperScoreTeam2>
      </WrapperScore>
      <VerticalSpacing key={'spacing_game_score'} height={spacing} />
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
  background-color: red;
`;

const WrapperScore = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 ${spacing}px;
  padding: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

//______________ TEAM1 ______________
const WrapperScoreTeam1 = styled.View`
  flex-direction: column;
  background-color: green;
  align-items: center;
  flex-grow: 1;
`;

const Team1Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
  background-color: purple;
`;
const Team1EmojiPlayer1 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;
const Team1EmojiPlayer2 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

//______________ TEAM2 ______________
const WrapperScoreTeam2 = styled.View`
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background-color: yellow;
`;

const Team2Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
  background-color: pink;
`;
const Team2EmojiPlayer1 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;
const Team2EmojiPlayer2 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;
