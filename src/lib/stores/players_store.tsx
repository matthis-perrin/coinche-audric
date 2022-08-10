import {createPersistentDataStore} from '../data_store';
import {initialName, initialEmoji} from '../constants';

export interface Player {
  id: number;
  name: string;
  emoji: string;
}

const playerDataStore = createPersistentDataStore<Player[]>('players', []);
export const getPlayers = playerDataStore.getData;
export const setPlayers = playerDataStore.setData;
export const usePlayers = playerDataStore.useData;

export const setPlayer = (player: Player): void => {
  setPlayers([...getPlayers(), player]);
};

export const setPlayerName = (text: string, player: Player): void => {
  const current_players = getPlayers();
  const new_players: Player[] = [];
  for (const p of current_players) {
    if (p.id === player.id) {
      const copy_p = {...p};
      copy_p.name = text;
      new_players.push(copy_p);
    } else {
      new_players.push(p);
    }
  }
  setPlayers(new_players);
};

export const delPlayer = (player: Player): void => {
  const last_players = getPlayers();
  const new_players: Player[] = [];
  for (const p of last_players) {
    if (p.id !== player.id) {
      new_players.push(p);
    }
  }
  setPlayers(new_players);
};

export const setPlayerEmoji = (text: string, player: Player): void => {
  const current_players = getPlayers();
  const new_players: Player[] = [];
  for (const p of current_players) {
    if (p.id === player.id) {
      const copy_p = {...p};
      copy_p.emoji = text;
      new_players.push(copy_p);
    } else {
      new_players.push(p);
    }
  }
  setPlayers(new_players);
};

export const addPlayer = (): void => {
  const newPlayer: Player = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    name: initialName,
    emoji: initialEmoji,
  };
  setPlayer(newPlayer);
};
