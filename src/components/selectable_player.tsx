import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {Player} from '../lib/stores/players_store';

import {
  borderRadius,
  buttonHeight,
  fontSizes,
  inputBackgroundColor,
  pastilleBackgroundColor,
  pastilleSelectdBackgroundColor,
  spacing,
} from '../lib/theme';
import {getPlayersSelectedId, handlePlayerPress} from '../lib/stores/selected_players_store.tsx';

interface SelectablePlayerProps {
  player: Player;
  onSelected: () => void;
}

export const SelectablePlayer: React.FC<SelectablePlayerProps> = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onSelected();
        handlePlayerPress(props.player);
      }}
    >
      <PlayerWrapper>
        <PlayerEmoji>{props.player.emoji}</PlayerEmoji>
        <PlayerText>{props.player.name}</PlayerText>
        <WrapperIconCheck>
          <MaterialCommunityIcons
            key="icon"
            name="check-circle"
            size={buttonHeight.small}
            color={
              getPlayersSelectedId().some((id) => id === props.player.id)
                ? pastilleSelectdBackgroundColor
                : pastilleBackgroundColor
            }
          />
        </WrapperIconCheck>
      </PlayerWrapper>
    </TouchableWithoutFeedback>
  );
};

SelectablePlayer.displayName = 'SelectablePlayer';

const PlayerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing}px;
  border-radius: ${borderRadius * 2}px;
  background-color: ${pastilleBackgroundColor};
`;

const PlayerEmoji = styled.Text`
  flex-shrink: 0;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: center;
  line-height: ${buttonHeight.medium}px;
`;

const PlayerText = styled.Text`
  flex-grow: 1;
  background-color: ${inputBackgroundColor};
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  text-align: left;
  line-height: ${buttonHeight.medium}px;
`;

const WrapperIconCheck = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${fontSizes.medium}px;
  height: ${buttonHeight.medium}px;
  width: ${buttonHeight.medium}px;
  background-color: ${inputBackgroundColor};
`;
