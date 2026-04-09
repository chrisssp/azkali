import type { RedeemedKali } from './types';

export const fetchRedeemedKalis = async (): Promise<{ items: RedeemedKali[]; totalKalis: number }> => {
  try {
    const mockItems: RedeemedKali[] = [
      {
        id: '1',
        merchant: 'Elektra',
        merchantCategory: 'retail',
        amountSpent: 2499,
        kalisEarned: 12.50,
        cardType: 'tarjeta_azteca',
        redeemedAt: '2026-04-08T14:23:00Z',
      },
      {
        id: '2',
        merchant: 'Totalplay',
        merchantCategory: 'telecom',
        amountSpent: 499,
        kalisEarned: 1.25,
        cardType: 'guardadito_go',
        redeemedAt: '2026-04-06T10:15:00Z',
      },
      {
        id: '3',
        merchant: 'Banco Azteca',
        merchantCategory: 'banking',
        amountSpent: 1000,
        kalisEarned: 8.00,
        cardType: 'tarjeta_vas',
        redeemedAt: '2026-04-03T09:00:00Z',
      },
      {
        id: '4',
        merchant: 'Italika',
        merchantCategory: 'retail',
        amountSpent: 5800,
        kalisEarned: 69.60,
        cardType: 'oro_garantizada',
        redeemedAt: '2026-03-29T16:45:00Z',
      },
      {
        id: '5',
        merchant: 'Elektra',
        merchantCategory: 'retail',
        amountSpent: 899,
        kalisEarned: 1.80,
        cardType: 'debito_guardadito',
        redeemedAt: '2026-03-25T11:30:00Z',
      },
      {
        id: '6',
        merchant: 'Coppel',
        merchantCategory: 'retail',
        amountSpent: 350,
        kalisEarned: 0.88,
        cardType: 'guardadito_go',
        redeemedAt: '2026-03-20T13:00:00Z',
      },
    ];

    const totalKalis = mockItems.reduce((acc, item) => acc + item.kalisEarned, 0);

    return { items: mockItems, totalKalis };
  } catch (error) {
    console.error('Error fetching redeemed kalis:', error);
    throw error;
  }
};
