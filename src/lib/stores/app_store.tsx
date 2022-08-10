import {createDataStore} from '../data_store';

interface App {
  currentPage: 'accueil' | 'tirage' | 'edition';
}

const appStore = createDataStore<App>({currentPage: 'accueil'});
export const useApp = appStore.useData;
export const setApp = appStore.setData;
