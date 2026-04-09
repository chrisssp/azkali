import type { ClaimedReward, RedeemedReward, Reward } from './types';

export const fetchRedeemedRewards = async (): Promise<{ items: RedeemedReward[]; totalTokens: number }> => {
  try {
    const mockItems: RedeemedReward[] = [
      {
        id: '1',
        merchant: 'Elektra',
        merchantCategory: 'retail',
        amountSpent: 2499,
        tokensEarned: 12.50,
        cardType: 'tarjeta_azteca',
        redeemedAt: '2026-04-08T14:23:00Z',
      },
      {
        id: '2',
        merchant: 'Totalplay',
        merchantCategory: 'telecom',
        amountSpent: 499,
        tokensEarned: 1.25,
        cardType: 'guardadito_go',
        redeemedAt: '2026-04-06T10:15:00Z',
      },
      {
        id: '3',
        merchant: 'Banco Azteca',
        merchantCategory: 'banking',
        amountSpent: 1000,
        tokensEarned: 8.00,
        cardType: 'tarjeta_vas',
        redeemedAt: '2026-04-03T09:00:00Z',
      },
      {
        id: '4',
        merchant: 'Italika',
        merchantCategory: 'retail',
        amountSpent: 5800,
        tokensEarned: 69.60,
        cardType: 'oro_garantizada',
        redeemedAt: '2026-03-29T16:45:00Z',
      },
      {
        id: '5',
        merchant: 'Elektra',
        merchantCategory: 'retail',
        amountSpent: 899,
        tokensEarned: 1.80,
        cardType: 'debito_guardadito',
        redeemedAt: '2026-03-25T11:30:00Z',
      },
      {
        id: '6',
        merchant: 'Coppel',
        merchantCategory: 'retail',
        amountSpent: 350,
        tokensEarned: 0.88,
        cardType: 'guardadito_go',
        redeemedAt: '2026-03-20T13:00:00Z',
      },
    ];

    const totalTokens = mockItems.reduce((acc, item) => acc + item.tokensEarned, 0);

    return { items: mockItems, totalTokens };
  } catch (error) {
    console.error('Error fetching redeemed rewards:', error);
    throw error;
  }
};

export const fetchAvailableRewards = async (): Promise<Reward[]> => {
  const mockRewards: Reward[] = [
    {
      id: 'r1',
      title: '5% Descuento en Elektra',
      description: '¡Felicidades! 5% en tu próxima compra en la tienda Elektra. Válido por 30 días.',
      category: 'shopping',
      cost: 200,
    },
    {
      id: 'r2',
      title: '10% Cashback en Venta Online',
      description: '¡Obtén 10% de cashback en tu próxima compra online. Se transferirá a tu cuenta en 24 horas.',
      category: 'cashback',
      cost: 500,
    },
    {
      id: 'r3',
      title: '8% Cashback en Banco Azteca',
      description: 'Obtén 8% de cashback en tus compras con Tarjeta Azteca durante los próximos 7 días. Máximo $120 MXN de beneficio.',
      category: 'cashback',
      cost: 1000,
    },
    {
      id: 'r4',
      title: '20% de Descuento en Totalplay',
      description: '20% de descuento en tu próximo pago mensual de Totalplay. Aplica automáticamente en tu siguiente facturación.',
      category: 'discount',
      cost: 750,
    },
    {
      id: 'r5',
      title: '15% de Descuento en Italika',
      description: 'Obtén 15% de descuento en accesorios y refacciones Italika. Válido por 15 días.',
      category: 'shopping',
      cost: 350,
    },
  ];

  return mockRewards;
};

export const fetchClaimedRewards = async (): Promise<ClaimedReward[]> => {
  const mockClaimed: ClaimedReward[] = [
    {
      id: 'cr1',
      claimedAt: '2026-04-07T11:00:00Z',
      reward: {
        id: 'r1',
        title: '5% Descuento en Elektra',
        description: '¡Felicidades! 5% en tu próxima compra en la tienda Elektra. Válido por 30 días.',
        category: 'shopping',
        cost: 200,
      },
    },
    {
      id: 'cr2',
      claimedAt: '2026-04-02T09:30:00Z',
      reward: {
        id: 'r2',
        title: '10% Cashback en Venta Online',
        description: '¡Obtén 10% de cashback en tu próxima compra online. Se transferirá a tu cuenta en 24 horas.',
        category: 'cashback',
        cost: 500,
      },
    },
    {
      id: 'cr3',
      claimedAt: '2026-03-28T16:15:00Z',
      reward: {
        id: 'r5',
        title: '15% de Descuento en Italika',
        description: 'Obtén 15% de descuento en accesorios y refacciones Italika. Válido por 15 días.',
        category: 'shopping',
        cost: 350,
      },
    },
    {
      id: 'cr4',
      claimedAt: '2026-03-15T14:00:00Z',
      reward: {
        id: 'r4',
        title: '20% de Descuento en Totalplay',
        description: '20% de descuento en tu próximo pago mensual de Totalplay. Aplica automáticamente en tu siguiente facturación.',
        category: 'discount',
        cost: 750,
      },
    },
    {
      id: 'cr5',
      claimedAt: '2026-03-05T10:45:00Z',
      reward: {
        id: 'r3',
        title: '8% Cashback en Banco Azteca',
        description: 'Obtén 8% de cashback en tus compras con Tarjeta Azteca durante los próximos 7 días. Máximo $120 MXN de beneficio.',
        category: 'cashback',
        cost: 1000,
      },
    },
  ];

  return mockClaimed;
};
