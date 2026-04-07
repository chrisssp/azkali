import type { Feature1Data } from './types';

export const fetchFeature1Data = async (): Promise<Feature1Data> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            id: '1',
            title: 'Item Uno',
            description: 'Esta es la descripción del primer item de ejemplo',
            status: 'active',
            createdAt: '2026-04-01T10:00:00Z',
          },
          {
            id: '2',
            title: 'Item Dos',
            description: 'Segunda tarea pendiente de completar',
            status: 'pending',
            createdAt: '2026-04-02T14:30:00Z',
          },
          {
            id: '3',
            title: 'Item Tres',
            description: 'Tarea completada exitosamente',
            status: 'completed',
            createdAt: '2026-04-03T09:15:00Z',
          },
          {
            id: '4',
            title: 'Item Cuatro',
            description: 'Cuarto elemento en estado activo',
            status: 'active',
            createdAt: '2026-04-04T16:45:00Z',
          },
        ],
        total: 4,
      });
    }, 1500);
  });
};
