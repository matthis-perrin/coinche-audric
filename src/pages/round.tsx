import {Fragment, useState} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {addRound, getGameWithId, getInitialRound} from '../lib/stores/games_store';
import {
  black,
  borderRadius,
  buttonHeight,
  fontSizes,
  green,
  pastilleBackgroundColor,
  red,
  secondary,
  spacing,
  topBarButtonWidth,
  topBarColor,
  white,
} from '../lib/theme';

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
  };

  const handlePressValue = (value: number): void => {
    if (!round) {
      return;
    }
    if (round.annonce === value) {
      setRound({...round, annonce: 0});
    } else {
      setRound({...round, annonce: value});
    }
  };

  const handlePressSave = (): void => {
    addRound(round, app.currentGameId);
    setApp({...app, currentPage: 'game'});
  };

  const isValidRound = (): boolean => {
    if (round?.annonce && round.taker_team_index !== undefined && round.successful !== '?') {
      return false;
    }
    return true;
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
            onPress={() => setApp({...app, currentPage: 'game'})}
            width={topBarButtonWidth}
          />
        }
        middle={<Titre>Mène</Titre>}
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
          <Question>Quelle est la valeur du contrat ?</Question>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={() => handlePressValue(80)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 80 ? secondary : white}}>
                  <ButtonText>80</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(90)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 90 ? secondary : white}}>
                  <ButtonText>90</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(100)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 100 ? secondary : white}}>
                  <ButtonText>100</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={() => handlePressValue(110)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 110 ? secondary : white}}>
                  <ButtonText>110</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(120)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 120 ? secondary : white}}>
                  <ButtonText>120</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(130)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 130 ? secondary : white}}>
                  <ButtonText>130</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={() => handlePressValue(140)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 140 ? secondary : white}}>
                  <ButtonText>140</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(150)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 150 ? secondary : white}}>
                  <ButtonText>150</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(160)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 160 ? secondary : white}}>
                  <ButtonText>160</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
          </FakeButtons>
          <FakeButtons>
            <TouchableWithoutFeedback onPress={() => handlePressValue(250)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 250 ? secondary : white}}>
                  <ButtonText>CAPOT</ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handlePressValue(500)}>
              <FakeButton>
                <ButtonWrapper style={{backgroundColor: round?.annonce === 500 ? secondary : white}}>
                  <ButtonText>GÉNÉRALE</ButtonText>
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
                <ButtonWrapper style={{backgroundColor: round?.successful === 'oui' ? green : white}}>
                  <ButtonText
                    style={{
                      color: round?.successful === 'oui' ? white : black,
                    }}
                  >
                    REALISÉ
                  </ButtonText>
                </ButtonWrapper>
              </FakeButton>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePressChute}>
              <FakeButton>
                <ButtonWrapper
                  style={{
                    backgroundColor: round?.successful === 'non' ? red : white,
                  }}
                >
                  <ButtonText
                    style={{
                      color: round?.successful === 'non' ? white : black,
                    }}
                  >
                    CHUTÉ
                  </ButtonText>
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
          onPress={handlePressSave}
          disabled={isValidRound()}
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
