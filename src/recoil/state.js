import { atom } from 'recoil';

// 초기 api데이터
export const photosState = atom({
  key: 'photosState',
  default: [],
});

// 초기 typeId
export const labelsState = atom({
  key: 'labelsState',
  default: {
    typeId1: null,
    typeId2: null,
    typeId3: null,
    typeId4: null,
  },
});

// typeId의 의한 query문
export const querysState = atom({
  key: 'querysState',
  default: '',
});

// 초기 페이지 넘버
export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

// 디테일 모달 on off 상태
export const DetailModalState = atom({
  key: 'DetailModalState',
  default: false,
});

// 디테일페이지를 불러오기 위한 현재 불러올 데이터의 id값
export const currentDetailIdState = atom({
  key: 'currentDetailIdState',
  default: null,
});

// 라벨 typeId의 의한 title들의 배열
export const labelsInfoState = atom({
  key: 'labelsInfoState',
  default: [],
});
