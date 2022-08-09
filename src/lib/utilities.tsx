import {Player} from './stores';

export const sortPlayerByName = (players: Player[]): Player[] => {
  const sortedPlayer = players.slice();
  sortedPlayer.sort((p1, p2) => {
    if (p1.name === `Nouveau joueur`) {
      return -1;
    } else if (p2.name === `Nouveau joueur`) {
      return 1;
    } else {
      return p1.name.localeCompare(p2.name);
    }
  });
  return sortedPlayer;
};

export const sortPlayerWithSelected = (players: Player[], selectedPlayersId: number[]): Player[] => {
  const notSelectedPlayers = players.filter((p) => !selectedPlayersId.includes(p.id));
  const selectedPlayers = players.filter((p) => selectedPlayersId.includes(p.id));
  const sortedSelectedPlayers = selectedPlayers.sort((p1, p2) => p1.name.localeCompare(p2.name));
  const sortedNotSelectedPlayers = notSelectedPlayers.sort((p1, p2) => p1.name.localeCompare(p2.name));

  const newPlayers = [...sortedSelectedPlayers, ...sortedNotSelectedPlayers];
  return newPlayers;
};
