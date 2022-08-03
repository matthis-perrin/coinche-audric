import {createDataStore, createPersistentDataStore} from './data_store';

interface App {
  currentPage: 'accueil' | 'tirage' | 'edition';
}

export interface Player {
  id: number;
  name: string;
  icon: string;
}

const playerDataStore = createPersistentDataStore<Player[]>('players', []);
export const getPlayers = playerDataStore.getData;
export const setPlayers = playerDataStore.setData;
export const usePlayers = playerDataStore.useData;

const appStore = createDataStore<App>({currentPage: 'accueil'});
export const useApp = appStore.useData;
export const setApp = appStore.setData;

export const setPlayer = (player: Player): void => {
  setPlayers([...getPlayers(), player]);
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
  // setPlayers(getPlayers().filter((p) => p.id !== player.id));
};

export const setPlayerIcon = (text: string, player: Player): void => {
  const current_players = getPlayers();
  const new_players: Player[] = [];
  for (const p of current_players) {
    if (p.id === player.id) {
      const copy_p = {...p};
      copy_p.icon = text;
      new_players.push(copy_p);
    } else {
      new_players.push(p);
    }
  }
  setPlayers(new_players);
  // setPlayers(getPlayers().map((p) => (p.id === player.id ? {...p, icon: text} : p)));
};

export const addPlayer = (): void => {
  const newPlayer: Player = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    id: Math.round(Math.random() * 1000000),
    name: `Nouveau joueur`,
    icon: '💣',
  };
  setPlayer(newPlayer);
};
