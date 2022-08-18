import {createPersistentDataStore} from '../data_store';
import {getGameWithId, Team} from '../utilities';

export interface Round {
  id: number;
  taker_team_index?: number;
  annonce?: 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 250 | 500;
  coinche: boolean;
  surcoinche: boolean;
  successful: '?' | 'oui' | 'non';
}

export interface Game {
  id: number;
  teams: Team[];
  rounds: Round[];
}

const gameDataStore = createPersistentDataStore<Game[]>('games', []);
export const getGames = gameDataStore.getData;
export const setGames = gameDataStore.setData;
export const useGames = gameDataStore.useData;

export const setGame = (game: Game): void => {
  setGames([...getGames(), game]);
};

export const addGame = (teams: Team[]): void => {
  const newGame: Game = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    teams: teams,
    rounds: [],
  };
  setGame(newGame);
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

export const delRound = (game: Game): void => {
  game.rounds.pop();
  setGame(game);
};

export const getInitialRound = (gameId?: number): Round | undefined => {
  if (!gameId) {
    return;
  }
  const currentGame = getGameWithId(gameId)[0];
  const newRound: Round = {
    id: currentGame.rounds.length,
    coinche: false,
    surcoinche: false,
    successful: '?',
  };
  return newRound;
};
