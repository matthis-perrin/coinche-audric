import {createDataStore} from '../data_store';
import {Game} from './games_store';

interface App {
  currentPage:
    | 'accueil'
    | 'tirage'
    | 'edition'
    | 'selection'
    | 'games_selection'
    | 'game'
    | 'round'
    | 'selection_coinche'
    | 'kings_pull';
  numberOfTeams: number;
  currentGameId?: number;
  initial_taker_team_index?: number;
}

const appStore = createDataStore<App>({currentPage: 'accueil', numberOfTeams: 2});
export const useApp = appStore.useData;
export const setApp = appStore.setData;
