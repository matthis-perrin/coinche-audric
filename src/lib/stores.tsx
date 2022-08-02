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
  console.log('setPlayer');
  const players = getPlayers();
  players.push(player);
  setPlayers(players);
};

export const delPlayer = (player: Player): void => {
  setPlayers(getPlayers().filter((p) => p.id !== player.id));
};

export const setPlayerIcon = (text: String, player: Player): void => {
  setPlayers(getPlayers().map((p) => (p.id === player.id ? {...p, failDesign: text} : p)));
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
