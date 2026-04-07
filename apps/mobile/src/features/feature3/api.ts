import type { Feature3Data } from './types';

export const fetchFeature3Data = async (): Promise<Feature3Data[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'Widget 1' },
        { id: '2', title: 'Widget 2' },
      ]);
    }, 1500);
  });
};
