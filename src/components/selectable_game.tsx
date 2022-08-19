import {Alert, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {setApp, useApp} from '../lib/stores/app_store';
import {delGame, Game} from '../lib/stores/games_store';
import {black, borderRadius, buttonHeight, fontSizes, pastilleBackgroundColor, spacing} from '../lib/theme';
import {getScoreWithId} from '../lib/utilities';
import {CustomButton} from './custom_buttons';
import {HorizontalSpacing} from './spacing';

interface SelectableGameProps {
  game: Game;
}

export const SelectableGame: React.FC<SelectableGameProps> = (props) => {
  //______________ STORE & STATE ______________
  const [app] = useApp();

  //______________ FONCTIONS ______________
  const onPressDeletePlayer = (): void => {
    Alert.alert('Confirmation', `Voulez-vous supprimer la partie ?`, [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          delGame(props.game);
        },
        style: 'destructive',
      },
    ]);
  };
  const handleGamePress = (): void => {
    setApp({...app, currentGameId: props.game.id, currentPage: 'game'});
  };

  //______________ HTML ______________
  return (
    <GlobalWrapper>
      <TouchableWithoutFeedback
        onPress={() => {
          handleGamePress();
        }}
      >
        <ContentWrapper>
          <TeamWrapper>
            <TeamEmojiPlayer>{props.game.teams[0].players[0].emoji}</TeamEmojiPlayer>
            <TeamEmojiPlayer>{props.game.teams[0].players[1].emoji}</TeamEmojiPlayer>
          </TeamWrapper>
          <ScoresWrapper>
            <ScoreWrapper>{getScoreWithId(props.game.id)[0].toLocaleString()}</ScoreWrapper>
          </ScoresWrapper>
          <HorizontalSpacing width={spacing / 2} />
          <ScoresWrapper>
            <ScoreWrapper>{getScoreWithId(props.game.id)[1].toLocaleString()}</ScoreWrapper>
          </ScoresWrapper>
          <TeamWrapper>
            <TeamEmojiPlayer>{props.game.teams[1].players[0].emoji}</TeamEmojiPlayer>
            <TeamEmojiPlayer>{props.game.teams[1].players[1].emoji}</TeamEmojiPlayer>
          </TeamWrapper>
        </ContentWrapper>
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

const ContentWrapper = styled.View`
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

//______________ TEAM ______________
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
const ScoresWrapper = styled.View`
  flex-direction: column;
  background-color: ${black};
  align-items: center;
  width: 0;
  flex-grow: 1;
`;

const ScoreWrapper = styled.Text`
  font-size: ${fontSizes.large}px;
  height: ${buttonHeight.medium}px;
  flex-grow: 1;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
  color: white;
`;
