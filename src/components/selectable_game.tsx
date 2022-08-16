import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {setApp, useApp} from '../lib/stores/app_store';
import {delGame, Game} from '../lib/stores/games_store';
import {borderRadius, buttonHeight, fontSizes, pastilleBackgroundColor, spacing} from '../lib/theme';
import {CustomButton} from './custom_buttons';

interface SelectableGameProps {
  game: Game;
}

export const SelectableGame: React.FC<SelectableGameProps> = (props) => {
  //______________ STORE & STATE ______________
  const [app] = useApp();

  //______________ FONCTIONS ______________
  const onPressDeletePlayer = (): void => {
    delGame(props.game);
  };
  const handleGamePress = (): void => {
    console.log('handleGamePress2');
    const new_app = {...app};
    new_app.currentGameId = props.game.id;
    new_app.currentPage = 'game';
    setApp(new_app);
  };

  //______________ HTML ______________
  return (
    <GlobalWrapper>
      <TouchableWithoutFeedback
        onPress={() => {
          handleGamePress();
        }}
      >
        <ScoreWrapper>
          <Team1Wrapper>
            <Team1EmojiPlayer1>{props.game.teams[0].players[0].emoji}</Team1EmojiPlayer1>
            <Team1EmojiPlayer2>{props.game.teams[0].players[1].emoji}</Team1EmojiPlayer2>
          </Team1Wrapper>
          <Team2Wrapper>
            <Team2EmojiPlayer1>{props.game.teams[1].players[0].emoji}</Team2EmojiPlayer1>
            <Team2EmojiPlayer2>{props.game.teams[1].players[1].emoji}</Team2EmojiPlayer2>
          </Team2Wrapper>
        </ScoreWrapper>
      </TouchableWithoutFeedback>
      <ButtonWrapper>
        <CustomButton
          iconSizeRatio={1.2}
          icon="trash-can-outline"
          size="medium"
          onPress={() => onPressDeletePlayer()}
        />
      </ButtonWrapper>
    </GlobalWrapper>
  );
};

SelectableGame.displayName = 'SelectableGame';

//______________ CSS ______________

//______________ WRAPPER ______________
const GlobalWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

const ScoreWrapper = styled.View`
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: white;
  margin-right: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
`;

const ButtonWrapper = styled.View`
  flex-shrink: 0;
`;

//______________ TEAM1 ______________
const Team1Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
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
const Team2Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
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
