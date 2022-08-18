import {Game, getGames, Round} from './stores/games_store';
import {getPlayers, Player} from './stores/players_store';
import {getPlayersSelectedId} from './stores/selected_players_store.tsx';

export interface Team {
  id: number;
  players: Player[];
}

export const getRandomTeams = (numberOfTeams: number): Team[] => {
  const teams: Team[] = [];
  for (let index = 0; index < numberOfTeams; index++) {
    const team: Team = {id: index, players: []};
    teams.push(team);
  }
  let localSelectedPlayers = getSortedSelectedPlayers();
  while (localSelectedPlayers.length > 0) {
    const randomPlayer = localSelectedPlayers[Math.floor(Math.random() * localSelectedPlayers.length)];
    teams.sort((t1, t2) => t1.players.length - t2.players.length);
    teams[0].players.push(randomPlayer);
    localSelectedPlayers = localSelectedPlayers.filter((p) => p.id !== randomPlayer.id);
  }
  return teams;
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

export const getGameWithId = (id: number): Game[] => {
  return getGames().filter((g) => g.id === id);
};

export const getScoreWithId = (id: number): number[] => {
  const scores: number[] = [0, 0];
  const game = getGames().filter((g) => g.id === id);
  game[0].rounds.forEach((r) => {
    const current_score = getscoreWithRound(r);
    scores[0] = scores[0] + current_score[0];
    scores[1] = scores[1] + current_score[1];
  });
  return scores;
};

export const getscoreWithRound = (r: Round): number[] => {
  const scores: number[] = [0, 0];
  if (r.taker_team_index === 0 || r.taker_team_index === 1) {
    let current_score = 0;
    if (r.successful === 'oui') {
      if (r.coinche) {
        current_score = r.annonce * 2;
      } else if (r.surcoinche) {
        current_score = r.annonce * 4;
      } else {
        current_score = r.annonce;
      }
      scores[r.taker_team_index] = current_score;
    } else if (r.successful === 'non') {
      if (r.coinche) {
        if (r.annonce <= 160) {
          current_score = 160 * 2;
        } else {
          current_score = r.annonce * 2;
        }
      } else if (r.surcoinche) {
        if (r.annonce <= 160) {
          current_score = 160 * 4;
        } else {
          current_score = r.annonce * 4;
        }
      } else {
        if (r.annonce <= 160) {
          current_score = 160;
        } else {
          current_score = r.annonce;
        }
      }
      const index = r.taker_team_index === 0 ? 1 : 0;
      scores[index] = current_score;
    }
  }
  return scores;
};
