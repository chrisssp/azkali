import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

type Product = {
  id: string;
  name: string;
  price: number;
  category: 'deporte' | 'tecnologia' | 'hogar' | 'moda';
  imageUrl: string;
};

type AnalysisStep = 'question' | 'loading' | 'verdict';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tenis Nike',
    price: 2500,
    category: 'deporte',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&q=80',
  },
  {
    id: '2',
    name: 'Audifonos Bluetooth',
    price: 1800,
    category: 'tecnologia',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640&q=80',
  },
  {
    id: '3',
    name: 'Silla ergonomica',
    price: 3200,
    category: 'hogar',
    imageUrl: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=640&q=80',
  },
  {
    id: '4',
    name: 'Sudadera deportiva',
    price: 950,
    category: 'moda',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=640&q=80',
  },
];

const QUESTION_OPTIONS = [
  'Lo compro de inmediato',
  'Espero una promo o descuento',
  'Comparo precios antes',
];

function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getRiskPercent(product: Product): number {
  const categoryBoost = product.category === 'tecnologia' ? 9 : product.category === 'moda' ? 7 : 5;
  const priceWeight = Math.min(35, Math.round(product.price / 120));
  return Math.max(25, Math.min(89, 30 + categoryBoost + priceWeight));
}

interface PurchaseAnalysisFlowProps {
  triggerClassName?: string;
}

export function PurchaseAnalysisFlow({ triggerClassName = 'self-center mb-3' }: PurchaseAnalysisFlowProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);
  const [step, setStep] = useState<AnalysisStep>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const riskPercent = useMemo(
    () => (selectedProduct ? getRiskPercent(selectedProduct) : 0),
    [selectedProduct]
  );

  const suggestions = useMemo(() => {
    if (!selectedProduct) return [];

    const halfPrice = Math.round(selectedProduct.price * 0.5);
    const sixtyPercent = Math.round(selectedProduct.price * 0.6);
    return [
      `Apartar ${formatMXN(halfPrice)} para ahorro de emergencia`,
      `1 mes de Spotify Premium (${formatMXN(129)})`,
      `Salida casual con amigos (${formatMXN(600)})`,
      `Invertir ${formatMXN(sixtyPercent)} en tu meta mensual`,
    ];
  }, [selectedProduct]);

  const handleSelectProduct = (product: Product) => {
    setIsPickerVisible(false);
    setSelectedProduct(product);
    setSelectedAnswer(null);
    setStep('question');
    setIsAnalysisVisible(true);
  };

  const closeFlow = () => {
    setIsAnalysisVisible(false);
    setStep('question');
    setSelectedAnswer(null);
  };

  const goToLoading = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('verdict');
    }, 1500);
  };

  const canContinue = selectedAnswer !== null;

  return (
    <>
      <Pressable onPress={() => setIsPickerVisible(true)} className={triggerClassName}>
        <Box className="bg-primary-700 border border-primary-800 rounded-full px-4 py-2.5 flex-row items-center justify-center gap-2">
          <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
          <Text className="text-white font-semibold text-sm">Analiza tu compra</Text>
        </Box>
      </Pressable>

      <Modal
        visible={isPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
        statusBarTranslucent
      >
        <Box className="flex-1 bg-black/60 justify-end">
          <Pressable
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
            onPress={() => setIsPickerVisible(false)}
            accessibilityLabel="Cerrar selector de producto"
          />
          <Box className="bg-background-0 rounded-t-3xl px-4 pt-4 pb-6 min-h-[58%]">
            <Box className="items-center mb-3">
              <Pressable
                onPress={() => setIsPickerVisible(false)}
                className="w-full items-center py-2"
                hitSlop={10}
                accessibilityLabel="Cerrar selector de producto desde indicador"
              >
                <Box className="w-10 h-1 bg-outline-300 rounded-full" />
              </Pressable>
            </Box>
            <Text className="text-base font-semibold text-typography-900 mb-1">
              Selecciona el producto
            </Text>
            <Text className="text-sm text-typography-500 mb-4">
              Elegimos una compra para analizar el riesgo en tiempo real.
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box className="flex-row flex-wrap -mx-1">
                {SAMPLE_PRODUCTS.map((product) => (
                  <Pressable
                    key={product.id}
                    onPress={() => handleSelectProduct(product)}
                    className="w-1/2 px-1 mb-3"
                  >
                    <Box className="border border-outline-200 rounded-xl overflow-hidden bg-background-0 h-[170px]">
                      <Image
                        source={{ uri: product.imageUrl }}
                        style={{ width: '100%', height: 94 }}
                        resizeMode="cover"
                      />
                      <Box className="px-3 py-2.5 flex-1 justify-between">
                        <Text className="text-xs font-semibold text-typography-900" numberOfLines={2}>
                          {product.name}
                        </Text>
                        <Text className="text-[11px] text-typography-500 mt-1">
                          {formatMXN(product.price)}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                ))}
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </Modal>

      <Modal
        visible={isAnalysisVisible}
        transparent
        animationType="slide"
        onRequestClose={closeFlow}
        statusBarTranslucent
      >
        <Box className="flex-1 bg-black/50 justify-end">
          <Pressable
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
            onPress={closeFlow}
            accessibilityLabel="Cerrar analisis"
          />
          <Box className="bg-background-0 rounded-t-3xl px-5 pt-4 pb-8 min-h-[68%]">
            <Box className="items-center mb-3">
              <Pressable
                onPress={closeFlow}
                className="w-full items-center py-2"
                hitSlop={10}
                accessibilityLabel="Cerrar analisis desde indicador"
              >
                <Box className="w-10 h-1 bg-outline-300 rounded-full" />
              </Pressable>
            </Box>

            {step === 'question' && (
              <>
                <Text className="text-sm text-typography-500 mb-2">Vamos a atar cabos...</Text>
                <Box className="border border-outline-300 rounded-2xl p-3 bg-background-50 mb-4 flex-row items-center">
                  <Image
                    source={{ uri: selectedProduct?.imageUrl }}
                    style={{ width: 68, height: 68, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                  <Box className="ml-3 flex-1">
                    <Text className="text-sm font-semibold text-typography-900">
                      {selectedProduct?.name}
                    </Text>
                    <Text className="text-xs text-typography-500 mt-1">
                      {selectedProduct ? formatMXN(selectedProduct.price) : ''}
                    </Text>
                  </Box>
                </Box>

                <Text className="text-sm text-typography-700 mb-3">
                  Imagina que ya tienes el producto, ¿que es lo primero que haces?
                </Text>

                {QUESTION_OPTIONS.map((option) => {
                  const isSelected = selectedAnswer === option;
                  return (
                    <Pressable key={option} onPress={() => setSelectedAnswer(option)}>
                      <Box
                        className={`border rounded-xl px-4 py-3 mb-2 ${
                          isSelected
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-outline-300 bg-background-0'
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            isSelected ? 'text-primary-700 font-semibold' : 'text-typography-700'
                          }`}
                        >
                          {option}
                        </Text>
                      </Box>
                    </Pressable>
                  );
                })}

                <Pressable disabled={!canContinue} onPress={goToLoading}>
                  <Box
                    className={`rounded-xl py-3 mt-3 ${
                      canContinue ? 'bg-primary-700' : 'bg-primary-200'
                    }`}
                  >
                    <Text className="text-center text-white font-semibold">Continuar</Text>
                  </Box>
                </Pressable>
              </>
            )}

            {step === 'loading' && (
              <Box className="flex-1 items-center justify-center py-8">
                <MaterialCommunityIcons name="lightbulb-on-outline" size={72} color="#006341" />
                <Text className="text-sm text-typography-600 text-center mt-4">
                  Kali esta analizando tu intencion de compra...
                </Text>
                <ActivityIndicator size="small" color="#006341" className="mt-5" />
              </Box>
            )}

            {step === 'verdict' && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-sm text-typography-500 mb-3">Veredicto final</Text>
                <Box className="items-center mb-4">
                  <Box className="w-28 h-28 rounded-full border-4 border-primary-300 items-center justify-center">
                    <Text className="text-3xl font-bold text-primary-800">{riskPercent}%</Text>
                  </Box>
                  <Text className="text-base font-semibold text-typography-900 mt-3">
                    Compra de alto riesgo
                  </Text>
                </Box>

                <Text className="text-sm text-typography-600 mb-3">
                  Mensaje de Kali: si pausas esta compra, puedes usar ese dinero para:
                </Text>

                {suggestions.map((item) => (
                  <Box key={item} className="border border-outline-200 rounded-xl px-3 py-2 mb-2">
                    <Text className="text-sm text-typography-700">{item}</Text>
                  </Box>
                ))}

                <Pressable onPress={closeFlow}>
                  <Box className="rounded-xl py-3 mt-4 bg-primary-900">
                    <Text className="text-center text-white font-semibold">Congelar en la nevera</Text>
                  </Box>
                </Pressable>
                <Pressable onPress={closeFlow}>
                  <Box className="rounded-xl py-3 mt-2 border border-outline-300 bg-background-0">
                    <Text className="text-center text-typography-700 font-medium">Ignorar</Text>
                  </Box>
                </Pressable>
              </ScrollView>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
