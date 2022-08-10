import {getPlayers, Player} from './stores/players_store';
import {getPlayersSelectedId} from './stores/selected_players_store.tsx';

export const getSortedNotSelectedPlayers = (): Player[] => {
  const notSelectedPlayers = getPlayers().filter((p) => !getPlayersSelectedId().includes(p.id));
  return sortPlayerByName(notSelectedPlayers);
};

export const getSortedSelectedPlayers = (): Player[] => {
  const selectedPlayers = getPlayers().filter((p) => getPlayersSelectedId().includes(p.id));
  return sortPlayerByName(selectedPlayers);
};

export const getSortedPlayers = (): Player[] => {
  return sortPlayerByName(getPlayers());
};

export const sortPlayerByName = (players: Player[], name_to_exclude?: string): Player[] => {
  const sortedPlayer = players.slice();
  sortedPlayer.sort((p1, p2) => {
    if (p1.name === name_to_exclude) {
      return -1;
    } else if (p2.name === name_to_exclude) {
      return 1;
    } else {
      return p1.name.localeCompare(p2.name);
    }
  });
  return sortedPlayer;
};
