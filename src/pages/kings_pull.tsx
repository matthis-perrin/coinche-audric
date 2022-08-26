import {Fragment, useState} from 'react';
import styled from 'styled-components/native';
import {BottomBar} from '../components/bottom_bar';
import {CustomButton} from '../components/custom_buttons';
import {TopBar} from '../components/top_bar';
import {setApp, useApp} from '../lib/stores/app_store';
import {fontSizes, spacing, topBarButtonWidth, topBarColor} from '../lib/theme';

interface Card {
  value: '7' | '8' | '9' | '10' | 'V' | 'D' | 'R' | 'As' | 'J';
  symbol: 'coeur' | 'carreau' | 'trèfle' | 'pique' | 'J';
  img: NodeRequire;
}

export const KingsPull: React.FC = () => {
  //______________ STORE & STATE ______________
  const cards: Card[] = [
    {value: '7', symbol: 'coeur', img: require('../../assets/7_coeur.png')},
    {value: '8', symbol: 'coeur', img: require('../../assets/8_coeur.png')},
    {value: '9', symbol: 'coeur', img: require('../../assets/9_coeur.png')},
    {value: '10', symbol: 'coeur', img: require('../../assets/10_coeur.png')},
    {value: 'V', symbol: 'coeur', img: require('../../assets/V_coeur.png')},
    {value: 'D', symbol: 'coeur', img: require('../../assets/D_coeur.png')},
    {value: 'R', symbol: 'coeur', img: require('../../assets/R_coeur.png')},
    {value: 'As', symbol: 'coeur', img: require('../../assets/As_coeur.png')},
    {value: '7', symbol: 'carreau', img: require('../../assets/7_carreau.png')},
    {value: '8', symbol: 'carreau', img: require('../../assets/8_carreau.png')},
    {value: '9', symbol: 'carreau', img: require('../../assets/9_carreau.png')},
    {value: '10', symbol: 'carreau', img: require('../../assets/10_carreau.png')},
    {value: 'V', symbol: 'carreau', img: require('../../assets/V_carreau.png')},
    {value: 'D', symbol: 'carreau', img: require('../../assets/D_carreau.png')},
    {value: 'R', symbol: 'carreau', img: require('../../assets/R_carreau.png')},
    {value: 'As', symbol: 'carreau', img: require('../../assets/As_carreau.png')},
    {value: '7', symbol: 'trèfle', img: require('../../assets/7_trèfle.png')},
    {value: '8', symbol: 'trèfle', img: require('../../assets/8_trèfle.png')},
    {value: '9', symbol: 'trèfle', img: require('../../assets/9_trèfle.png')},
    {value: '10', symbol: 'trèfle', img: require('../../assets/10_trèfle.png')},
    {value: 'V', symbol: 'trèfle', img: require('../../assets/V_trèfle.png')},
    {value: 'D', symbol: 'trèfle', img: require('../../assets/D_trèfle.png')},
    {value: 'R', symbol: 'trèfle', img: require('../../assets/R_trèfle.png')},
    {value: 'As', symbol: 'trèfle', img: require('../../assets/As_trèfle.png')},
    {value: '7', symbol: 'pique', img: require('../../assets/7_pique.png')},
    {value: '8', symbol: 'pique', img: require('../../assets/8_pique.png')},
    {value: '9', symbol: 'pique', img: require('../../assets/9_pique.png')},
    {value: '10', symbol: 'pique', img: require('../../assets/10_pique.png')},
    {value: 'V', symbol: 'pique', img: require('../../assets/V_pique.png')},
    {value: 'D', symbol: 'pique', img: require('../../assets/D_pique.png')},
    {value: 'R', symbol: 'pique', img: require('../../assets/R_pique.png')},
    {value: 'As', symbol: 'pique', img: require('../../assets/As_pique.png')},
  ];
  const card: Card = {value: 'J', symbol: 'J', img: require('../../assets/Joker.png')};
  const [app] = useApp();
  const [currentCards, setCurrentCards] = useState(cards);
  const [currentCard, setCurrentCard] = useState(card);

  //______________ FUNCTIONS ______________
  const handlePressTirage = (): void => {
    const selectedIndex = Math.floor(Math.random() * (currentCards.length - 1)) + 1;
    const current_card = currentCards.find((c, i) => i === selectedIndex);
    if (current_card) {
      setCurrentCard(current_card);
    }
    setCurrentCards(currentCards.filter((c, i) => i !== selectedIndex));
  };

  //______________ HTML ______________
  return (
    <Fragment>
      <TopBar
        middle={<Titre>{`Tirage`}</Titre>}
        left={
          <CustomButton
            text="Retour"
            icon="arrow-left"
            onPress={() => setApp({...app, currentPage: 'accueil'})}
            width={topBarButtonWidth}
          />
        }
      />
      <WrapperCard>
        <CardDisplay source={currentCard.img} />
      </WrapperCard>
      <WrapperBottomButton>
        <CustomButton icon="cards" size="large" onPress={() => handlePressTirage()} />
      </WrapperBottomButton>
      <BottomBar />
    </Fragment>
  );
};

KingsPull.displayName = 'KingsPull';

//______________ CSS ______________
const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
  color: ${topBarColor};
  margin-right: ${topBarButtonWidth}px;
`;

const WrapperBottomButton = styled.View`
  align-items: center;
  margin: ${spacing}px;
  margin-top: 0;
`;

const WrapperCard = styled.View`
  display: flex;
  align-items: center;
  margin: ${spacing}px;
  margin-top: 0;
`;

const CardDisplay = styled.Image`
  width: 250px;
  height: 363px;
`;
