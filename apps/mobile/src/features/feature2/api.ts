import type { Feature2Item } from './types';

export const fetchFeature2Items = async (): Promise<Feature2Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Item A', category: 'Categoría 1', value: 100 },
        { id: '2', name: 'Item B', category: 'Categoría 2', value: 200 },
      ]);
    }, 1500);
  });
};
