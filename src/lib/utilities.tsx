import {Player, usePlayers} from './stores';

export const sortPlayer = (): Player[] => {
  const [players] = usePlayers();
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
