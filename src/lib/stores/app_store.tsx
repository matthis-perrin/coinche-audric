import {createDataStore} from '../data_store';
import {Game} from './games_store';

interface App {
  currentPage: 'accueil' | 'tirage' | 'edition' | 'selection' | 'games_selection' | 'game' | 'round';
  numberOfTeams: number;
  currentGameId?: number;
}

const appStore = createDataStore<App>({currentPage: 'accueil', numberOfTeams: 2});
export const useApp = appStore.useData;
export const setApp = appStore.setData;
