import { atom } from 'recoil';

export const photosState = atom({
  key: 'photosState',
  default: [],
});

export const labelsState = atom({
  key: 'labelsState',
  default: {
    typeId1: null,
    typeId2: null,
    typeId3: null,
    typeId4: null,
  },
});

export const querysState = atom({
  key: 'querysState',
  default: '',
});

export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});
