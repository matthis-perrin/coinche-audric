import {Fragment, useState} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {getInitialRound} from '../lib/stores/games_store';
import {
  borderRadius,
  buttonHeight,
  fontSizes,
  pastilleBackgroundColor,
  secondary,
  spacing,
  topBarButtonWidth,
  topBarColor,
  white,
} from '../lib/theme';
import {getGameWithId} from '../lib/utilities';

export const Round: React.FC = () => {
  //______________ STORE & STATE ______________
  const [app] = useApp();
  const [round, setRound] = useState(getInitialRound(app.currentGameId));

  //______________ FUNCTIONS ______________
  const handlePressTeam = (index_team: number): void => {
    if (!round) {
      return;
    }
    if (round.taker_team_index === index_team) {
      setRound({...round, taker_team_index: undefined});
    } else {
      setRound({...round, taker_team_index: index_team});
    }
  };

  const handlePressCoinche = (): void => {
    if (!round) {
      return;
    }
    setRound({...round, coinche: !round.coinche});
  };

  const handlePressSurcoinche = (): void => {
    if (!round) {
      return;
    }
    setRound({...round, surcoinche: !round.surcoinche});
  };

  const handlePressRealise = (): void => {
    if (!round) {
      return;
    }
    if (round.successful === 'oui') {
      setRound({...round, successful: '?'});
    } else {
      setRound({...round, successful: 'oui'});
    }
  };

  const handlePressChute = (): void => {
    if (!round) {
      return;
    }
    if (round.successful === 'non') {
      setRound({...round, successful: '?'});
    } else {
      setRound({...round, successful: 'non'});
    }
    console.log(round.successful);
  };

  //______________ INIT ______________
  if (!app.currentGameId) {
    return <Fragment></Fragment>;
  }
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
        <Container>
          <Question>Quelle est l’équipe preneuse ?</Question>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={() => handlePressTeam(0)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.taker_team_index === 0 ? secondary : white}}>
                  <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[0].emoji}</TeamEmojiPlayer>
                  <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[0].players[1].emoji}</TeamEmojiPlayer>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressTeam(1)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.taker_team_index === 1 ? secondary : white}}>
                  <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[0].emoji}</TeamEmojiPlayer>
                  <TeamEmojiPlayer>{getGameWithId(app.currentGameId)[0].teams[1].players[1].emoji}</TeamEmojiPlayer>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
        </Container>
        <Container>
          <Question>Le contrat a-t-il été contré ?</Question>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={handlePressCoinche}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.coinche ? secondary : white}}>
                  <ButtonText>COINCHÉ</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePressSurcoinche}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.surcoinche ? secondary : white}}>
                  <ButtonText>SURCOINCHÉ</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
        </Container>
        <Container>
          <Question>Le contrat a-t-il été réalisé ?</Question>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={handlePressRealise}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.successful === 'oui' ? secondary : white}}>
                  <ButtonText>REALISÉ</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePressChute}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.successful === 'non' ? secondary : white}}>
                  <ButtonText>CHUTÉ</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
        </Container>
      </WrapperContent>
      <WrapperAdd>
        <CustomButton
          text="Enregistrer la mène"
          size="large"
          icon="content-save"
          onPress={() => setApp({...app, currentPage: 'round'})}
        />
      </WrapperAdd>
      <BottomBar />
    </GlobalWrapper>
  );
};

Round.displayName = 'Round';

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
`;

const WrapperAdd = styled.View`
  margin: 0 ${spacing}px;
  flex-shrink: 0;
`;

//______________ BLOC SELECTION ______________

const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${pastilleBackgroundColor};
  border-radius: ${borderRadius * 2};
  margin: ${spacing}px;
  margin-top: 0;
  overflow: hidden;
`;

const Question = styled.Text`
  flex-grow: 1;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

const FakeButtons = styled.View`
  display: flex;
  flex-direction: row;
  align-content: center;
  padding-left: ${spacing / 2}px;
  padding-right: ${spacing / 2}px;
`;

const FakeButton = styled.View`
  flex-grow: 1;
  padding-top: 0;
  padding-bottom: ${spacing}px;
  padding-left: ${spacing / 2}px;
  padding-right: ${spacing / 2}px;
`;

const ButtonWrapper = styled.View`
  border-radius: ${borderRadius * 2};
  overflow: hidden;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`;

const TeamEmojiPlayer = styled.Text`
  font-size: ${fontSizes.extraLarge}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

const ButtonText = styled.Text`
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: 0;
  flex-grow: 1;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;
