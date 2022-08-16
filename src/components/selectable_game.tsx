import styled from 'styled-components/native';
import {delGame, Game} from '../lib/stores/games_store';
import {borderRadius, buttonHeight, fontSizes, pastilleBackgroundColor, spacing} from '../lib/theme';
import {CustomButton} from './custom_buttons';

interface SelectableGameProps {
  game: Game;
}

export const SelectableGame: React.FC<SelectableGameProps> = (props) => {
  const onPressDeletePlayer = (game: Game): void => {
    delGame(game);
  };
  return (
    <GlobalWrapper>
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
      <ButtonWrapper>
        <CustomButton
          iconSizeRatio={1.2}
          icon="trash-can-outline"
          size="medium"
          onPress={() => onPressDeletePlayer(props.game)}
        />
      </ButtonWrapper>
    </GlobalWrapper>
  );
};

SelectableGame.displayName = 'SelectableGame';

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
  background-color: green;
`;
const Team1EmojiPlayer1 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  background-color: yellow;
`;
const Team1EmojiPlayer2 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  background-color: blue;
`;

//______________ TEAM2 ______________
const Team2Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
  background-color: gray;
`;
const Team2EmojiPlayer1 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  background-color: purple;
`;
const Team2EmojiPlayer2 = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  background-color: pink;
`;
