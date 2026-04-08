import { supabase } from '@/config/supabase';
import type { Reward } from './types';

/**
 * Fetch disponible rewards from rewards_catalog
 */
export const fetchRewardsData = async (): Promise<{ rewards: Reward[]; total: number }> => {
  try {
    // For now, return mock data since user auth is not required
    // When auth is integrated, replace with real Supabase query
    const mockRewards: Reward[] = [
      {
        id: '1',
        title: '5% Descuento en Elektra',
        description: '¡Felicidades! 5% en tu próxima compra en la tienda Elektra. Válido por 30 días.',
        cost: 200,
        category: 'shopping',
      },
      {
        id: '2',
        title: '10% Cashback en Venta Online',
        description: '¡Obtén 10% de cashback en tu próxima compra online. Se transferirá a tu cuenta en 24 horas.',
        cost: 500,
        category: 'cashback',
      },
      {
        id: '3',
        title: '500 Pesos en tu Cuenta',
        description: '¡Recibe 500 pesos directamente en tu cuenta de ahorros. Sin requisitos adicionales.',
        cost: 300,
        category: 'transfer',
      },
    ];

    return {
      rewards: mockRewards,
      total: mockRewards.length,
    };
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};

/**
 * Claim a reward by creating a redemption record
 */
export const claimReward = async (rewardId: string, userId: string = ''): Promise<{ success: boolean; message: string }> => {
  try {
    // For now, return mock success since user auth is not fully integrated
    // When auth is integrated, uncomment the Supabase logic below

    return {
      success: true,
      message: 'Recompensa canjeada exitosamente. Verifica tu cuenta en 24 horas.',
    };

    /* TODO: Uncomment when user auth is integrated
    if (!userId) {
      return {
        success: false,
        message: 'Usuario no autenticado. Por favor, inicia sesión.',
      };
    }

    // Obtener el reward para saber su costo
    const { data: rewardData, error: rewardError } = await supabase
      .from('rewards_catalog')
      .select('token_cost, name')
      .eq('id', rewardId)
      .single();

    if (rewardError) throw rewardError;

    const tokenCost = rewardData.token_cost;
    const rewardName = rewardData.name;

    // Verificar que el usuario tenga suficientes tokens
    const { data: tokenData, error: tokenError } = await supabase
      .from('tokens')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (tokenError) throw tokenError;

    if ((tokenData?.balance || 0) < tokenCost) {
      return {
        success: false,
        message: 'No tienes suficientes tokens para este canje.',
      };
    }

    // Crear redemption record
    const { error: redemptionError } = await supabase
      .from('redemptions')
      .insert({
        user_id: userId,
        reward_id: rewardId,
        tokens_spent: tokenCost,
        status: 'pending',
      });

    if (redemptionError) throw redemptionError;

    // Crear transacción de redeem
    const { error: txError } = await supabase
      .from('token_transactions')
      .insert({
        user_id: userId,
        reason: `Canje: ${rewardName}`,
        amount: tokenCost,
        type: 'redeem',
      });

    if (txError) throw txError;

    return {
      success: true,
      message: 'Recompensa canjeada exitosamente. Verifica tu cuenta en 24 horas.',
    };
    */
  } catch (error) {
    console.error('Error claiming reward:', error);
    throw error;
  }
};

/**
 * Helper: Map reward_type from DB to RewardCategory
 */
function mapRewardTypeToCategory(rewardType: string): 'shopping' | 'cashback' | 'transfer' | 'discount' {
  switch (rewardType.toLowerCase()) {
    case 'physical':
      return 'shopping';
    case 'virtual':
      return 'cashback';
    case 'financial':
      return 'transfer';
    default:
      return 'discount';
  }
}
