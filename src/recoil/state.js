import { atom } from 'recoil';

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

// export const CheckedTypeState = selector({
//   key: 'CheckedTypeState',
//   get: ({ get }) => {
//     let query;
//     const types = get(labelsState);
//     const { typeId1, typeId2, typeId3, typeId4 } = types;
//     if (typeId1 !== null) {
//       query = `&labelTypeIds[]=${typeId1}`;
//     } else {
//       query = '';
//     }
//   },
// });
