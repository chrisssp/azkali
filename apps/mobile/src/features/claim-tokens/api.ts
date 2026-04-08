import type { ClaimToken } from './types';

/**
 * Fetch pending token claims for the logged-in user
 * For now, returns mock data. Will query token_transactions when auth is integrated.
 */
export const fetchClaimTokensData = async (userId: string = ''): Promise<{ tokens: ClaimToken[]; total: number }> => {
  try {
    // For now, return mock data since user auth is not required
    // When auth is integrated, replace with real Supabase query
    const mockTokens: ClaimToken[] = [
      {
        id: '1',
        amount: 30,
        description: '¡Reclama tus tokens! Por haber mantenido tu racha de 7 días.',
        reason: 'streak',
      },
      {
        id: '2',
        amount: 50,
        description: 'Bonus de bienvenida. Deposita tu primer sueldo y obtén tokens adicionales.',
        reason: 'welcome',
      },
      {
        id: '3',
        amount: 25,
        description: 'Referral completado. Tu amigo realizó su primera compra con Azkali.',
        reason: 'referral',
      },
    ];

    return {
      tokens: mockTokens,
      total: mockTokens.length,
    };
  } catch (error) {
    console.error('Error fetching claim tokens:', error);
    throw error;
  }
};

/**
 * Claim tokens by converting an 'earn' transaction to the user's balance
 */
export const claimTokens = async (transactionId: string, userId: string = ''): Promise<{ success: boolean; message: string }> => {
  try {
    // For now, return mock success since user auth is not fully integrated
    // When auth is integrated, uncomment the Supabase logic below

    return {
      success: true,
      message: 'Tokens canjeados exitosamente. Serán acreditados a tu cuenta inmediatamente.',
    };

    /* TODO: Uncomment when user auth is integrated
    if (!userId) {
      return {
        success: false,
        message: 'Usuario no autenticado. Por favor, inicia sesión.',
      };
    }

    // Get the transaction details
    const { data: txData, error: txError } = await supabase
      .from('token_transactions')
      .select('amount, reason')
      .eq('id', transactionId)
      .eq('user_id', userId)
      .eq('type', 'earn')
      .single();

    if (txError || !txData) {
      throw new Error('Transacción no encontrada o ya ha sido canjeada');
    }

    // The DB triggers will automatically update the tokens balance
    // We just need to mark this transaction as claimed by creating a reference
    // For now, we'll assume the transaction is already in the system
    
    // If you want to track claimed vs unclaimed, add a 'claimed_at' column to token_transactions
    // For now, just confirm the tokens are available

    return {
      success: true,
      message: 'Tokens canjeados exitosamente. Serán acreditados a tu cuenta inmediatamente.',
    };
    */
  } catch (error) {
    console.error('Error claiming tokens:', error);
    throw error;
  }
};

/**
 * Get description text based on reason code
 */
function getDescriptionForReason(reason: string, amount: number): string {
  const descriptions: { [key: string]: string } = {
    streak: `¡Reclama tus ${amount} tokens! Por haber mantenido tu racha consistente.`,
    welcome: `Bonus de bienvenida. ${amount} tokens por registrarte en Azkali.`,
    referral: `Tu referral completó una acción. ${amount} tokens como recompensa.`,
    bonus: `Bonus especial. ${amount} tokens por ti.`,
    milestone: `¡Felicidades! Alcanzaste un hito. ${amount} tokens de recompensa.`,
  };

  return descriptions[reason] || `Reclama tus ${amount} tokens disponibles.`;
}

/**
 * Map database reason string to ClaimToken reason type
 */
function mapReasonToType(reason: string): 'streak' | 'welcome' | 'referral' | 'bonus' | 'milestone' {
  const reasonMap: { [key: string]: 'streak' | 'welcome' | 'referral' | 'bonus' | 'milestone' } = {
    streak: 'streak',
    welcome: 'welcome',
    referral: 'referral',
    bonus: 'bonus',
    milestone: 'milestone',
  };

  return reasonMap[reason.toLowerCase()] || 'bonus';
}
