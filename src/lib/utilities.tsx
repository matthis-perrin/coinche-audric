import {getPlayers, Player} from './stores/players_store';
import {getPlayersSelectedId} from './stores/selected_players_store.tsx';

interface Team {
  id: number;
  players: Player[];
}

export const getRandomTeams = (): Team[] => {
  const team1: Team = {id: 1, players: []};
  const team2: Team = {id: 2, players: []};
  let localSelectedPlayers = getSortedSelectedPlayers();
  while (localSelectedPlayers.length > 0) {
    const randomPlayer = localSelectedPlayers[Math.floor(Math.random() * localSelectedPlayers.length)];
    if (team1.players.length <= team2.players.length) {
      team1.players.push(randomPlayer);
    } else {
      team2.players.push(randomPlayer);
    }
    localSelectedPlayers = localSelectedPlayers.filter((p) => p.id !== randomPlayer.id);
  }
  return [team1, team2];
};

export const getSortedNotSelectedPlayers = (): Player[] => {
  const notSelectedPlayers = getPlayers().filter((p) => !getPlayersSelectedId().includes(p.id));
  return sortPlayerByName(notSelectedPlayers);
};

export const getSortedSelectedPlayers = (): Player[] => {
  const selectedPlayers = getPlayers().filter((p) => getPlayersSelectedId().includes(p.id));
  return sortPlayerByName(selectedPlayers);
};

export const getSortedPlayers = (): Player[] => {
  return sortPlayerByName(getPlayers(), 'Nouveau joueur');
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
