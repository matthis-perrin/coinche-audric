import {createPersistentDataStore} from '../data_store';
import {Player} from './players_store';

export interface Round {
  id: number;
  taker_team_index?: number;
  annonce: number;
  coinche: boolean;
  surcoinche: boolean;
  successful: '?' | 'oui' | 'non';
}

export interface Game {
  id: number;
  teams: Team[];
  rounds: Round[];
}

export interface Team {
  id: number;
  players: Player[];
}

const gameDataStore = createPersistentDataStore<Game[]>('games', []);
export const getGames = gameDataStore.getData;
export const setGames = gameDataStore.setData;
export const useGames = gameDataStore.useData;

export const setGame = (game: Game): void => {
  setGames([...getGames(), game]);
};

export const getNewGame = (teams: Team[]): Game => {
  const newGame: Game = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    teams: teams,
    rounds: [],
  };
  return newGame;
};

export const delGame = (game: Game): void => {
  const last_games = getGames();
  const new_games: Game[] = [];
  for (const p of last_games) {
    if (p.id !== game.id) {
      new_games.push(p);
    }
  }
  setGames(new_games);
};

export const delRound = (gameId: number | undefined): void => {
  if (gameId) {
    const current_games = getGames();
    const current_game = getGameWithId(gameId)[0];
    const new_games: Game[] = [];
    for (const g of current_games) {
      if (g.id === current_game.id) {
        const copy_g = {...g};
        copy_g.rounds.pop();
        new_games.push(copy_g);
      } else {
        new_games.push(g);
      }
    }
    setGames(new_games);
  }
};

export const addRound = (round: Round | undefined, gameId: number | undefined): void => {
  if (round && gameId) {
    const current_games = getGames();
    const current_game = getGameWithId(gameId)[0];
    const new_games: Game[] = [];
    for (const g of current_games) {
      if (g.id === current_game.id) {
        const copy_g = {...g};
        copy_g.rounds.push(round);
        new_games.push(copy_g);
      } else {
        new_games.push(g);
      }
    }
    setGames(new_games);
  }
};

export const getInitialRound = (gameId?: number): Round | undefined => {
  if (!gameId) {
    return;
  }
  const new_round: Round = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    coinche: false,
    surcoinche: false,
    successful: '?',
    annonce: 0,
  };
  return new_round;
};

export const getGameWithId = (id: number): Game[] => {
  return getGames().filter((g) => g.id === id);
};
