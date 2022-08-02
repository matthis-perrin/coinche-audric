import {clearPersistentDataStore, createDataStore, createPersistentDataStore} from './data_store';

interface App {
  currentPage: 'accueil' | 'tirage';
}

const appStore = createDataStore<App>({currentPage: 'accueil'});
export const useApp = appStore.useData;
export const setApp = appStore.setData;
