import {createPersistentDataStore} from '../data_store';
import {Team} from '../utilities';

export interface Round {
  id: number;
  taker_team_id: number;
  annonce: 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 250 | 500;
  coinche: boolean;
  surcoinche: boolean;
  successful: boolean;
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

export const addRound = (
  game: Game,
  taker_team_id: number,
  annonce: 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 250 | 500,
  coinche: boolean,
  surcoinche: boolean,
  successful: boolean
): void => {
  const newRound: Round = {
    id: game.rounds.length,
    taker_team_id: taker_team_id,
    annonce: annonce,
    coinche: coinche,
    surcoinche: surcoinche,
    successful: successful,
  };
  game.rounds.push(newRound);
  setGame(game);
};

export const delRound = (game: Game): void => {
  game.rounds.pop();
  setGame(game);
};
