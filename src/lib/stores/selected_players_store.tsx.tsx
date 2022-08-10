import {createPersistentDataStore} from '../data_store';
import {Player} from './players_store';

const playerSelectedIdDataStore = createPersistentDataStore<number[]>('players_selected', []);
export const getPlayersSelectedId = playerSelectedIdDataStore.getData;
export const setPlayersSelectedId = playerSelectedIdDataStore.setData;
export const usePlayersSelectedId = playerSelectedIdDataStore.useData;

export const handlePlayerPress = (player: Player): void => {
  if (getPlayersSelectedId().some((id) => id === player.id)) {
    delPlayerSelected(player);
  } else {
    setPlayerSelected(player);
  }
};

export const setPlayerSelected = (player: Player): void => {
  setPlayersSelectedId([...getPlayersSelectedId(), player.id]);
};

export const delPlayerSelected = (player: Player): void => {
  setPlayersSelectedId(getPlayersSelectedId().filter((id) => id !== player.id));
};
