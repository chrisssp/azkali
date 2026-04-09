import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { assetToGeminiInlineData } from '@/utils/imageToBase64';

type CaptureMethod = 'camera' | 'keyboard';
type AnalysisStep = 1 | 2 | 3 | 4;

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};
type DetectedProductData = {
  productName?: string;
  estimatedPriceMXN?: number;
};
type AIFlowData = {
  productName: string;
  estimatedPriceMXN: number;
  question: string;
  educationMessage: string;
  loadingMessage: string;
  riskPercent: number;
  riskLabel: 'Bajo riesgo' | 'Riesgo moderado' | 'Alto riesgo';
  advisoryMessage: string;
  suggestions: string[];
  relatedProducts: Array<{
    name: string;
    estimatedPriceMXN: number;
    benefit: string;
    imageUrl: string;
  }>;
};
const FLOW_LOG_PREFIX = '[PurchaseAnalysis]';

const ANSWER_OPTIONS = [
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

function generateQuestion(productName: string): string {
  return `Imagina que ya tienes ${productName}, ¿qué es lo primero que harías con ese producto?`;
}

function generateEducationMessage(productName: string): string {
  return `Antes de comprar ${productName}, recuerda que cada compra debe acercarte a tus metas y no alejarte de tu tranquilidad financiera.`;
}

function getRiskScore(productName: string): number {
  const base = 48;
  const variable = Math.min(28, productName.length * 2);
  return Math.min(90, base + variable);
}

function parseDetectionJson(raw: string): DetectedProductData | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as DetectedProductData;
  } catch {
    return null;
  }
}

function getProductImageUrl(productName: string): string {
  const encoded = encodeURIComponent(productName.trim().toLowerCase() || 'producto-util');
  return `https://picsum.photos/seed/${encoded}/400/300`;
}

function normalizeEstimatedPrice(productName: string, aiPrice: number | undefined, fallback: number): number {
  const lower = productName.toLowerCase();
  const hasBeverageKeywords =
    lower.includes('coca') ||
    lower.includes('refresco') ||
    lower.includes('agua') ||
    lower.includes('jugo') ||
    lower.includes('bebida') ||
    lower.includes('snack') ||
    lower.includes('papas') ||
    lower.includes('galleta');

  if (hasBeverageKeywords) {
    const source = typeof aiPrice === 'number' && aiPrice > 0 ? aiPrice : fallback;
    return Math.max(10, Math.min(250, Math.round(source)));
  }

  const source = typeof aiPrice === 'number' && aiPrice > 0 ? aiPrice : fallback;
  return Math.max(80, Math.min(50000, Math.round(source)));
}

export function PurchaseAnalysisScreen() {
  const router = useRouter();

  const [step, setStep] = useState<AnalysisStep>(1);
  const [captureMethod, setCaptureMethod] = useState<CaptureMethod>('camera');
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [isDetectingImage, setIsDetectingImage] = useState(false);
  const [cameraStatus, setCameraStatus] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [typedProduct, setTypedProduct] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [aiFlowData, setAiFlowData] = useState<AIFlowData | null>(null);
  const [isGeneratingFlow, setIsGeneratingFlow] = useState(false);

  useEffect(() => {
    console.log(
      `${FLOW_LOG_PREFIX} step=${step} method=${captureMethod} hasPhoto=${capturedPhotoUri !== null} typedChars=${typedProduct.length}`
    );
  }, [step, captureMethod, capturedPhotoUri, typedProduct.length]);

  const currentProduct = useMemo(() => {
    if (captureMethod === 'camera' && capturedPhotoUri) {
      return {
        id: 'camera',
        name: 'Producto fotografiado',
        price: 2400,
        imageUrl: capturedPhotoUri,
      };
    }
    if (selectedProduct) return selectedProduct;
    if (typedProduct.trim().length > 0) {
      return {
        id: 'typed',
        name: typedProduct.trim(),
        price: 2200,
        imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=640&q=80',
      };
    }
    return null;
  }, [captureMethod, capturedPhotoUri, selectedProduct, typedProduct]);

  const question = aiFlowData?.question ?? (currentProduct ? generateQuestion(currentProduct.name) : '');
  const educationMessage =
    aiFlowData?.educationMessage ??
    (currentProduct
      ? generateEducationMessage(currentProduct.name)
      : 'La educacion financiera te ayuda a decidir mejor antes de comprar.');
  const risk = aiFlowData?.riskPercent ?? (currentProduct ? getRiskScore(currentProduct.name) : 56);
  const riskLabel =
    aiFlowData?.riskLabel ??
    (risk >= 70 ? 'Alto riesgo' : risk >= 55 ? 'Riesgo moderado' : 'Bajo riesgo');
  const displayPrice = aiFlowData?.estimatedPriceMXN ?? currentProduct?.price ?? 0;
  const advisoryMessage =
    aiFlowData?.advisoryMessage ??
    'Si pausar esta compra te da margen, puedes reforzar tu estabilidad y avanzar metas mas importantes.';
  const suggestions = aiFlowData?.suggestions ?? [];
  const relatedProducts = aiFlowData?.relatedProducts ?? [];

  useEffect(() => {
    if (step !== 3) return;

    setProgress(0);
    const values = [14, 27, 39, 48, 56];
    let index = 0;
    const timer = setInterval(() => {
      setProgress(values[index]);
      index += 1;
      if (index === values.length) {
        clearInterval(timer);
        setTimeout(() => setStep(4), 500);
      }
    }, 340);

    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step === 1) setAiFlowData(null);
  }, [step, captureMethod, capturedPhotoUri, typedProduct, selectedProduct?.id]);

  const buildFallbackFlow = (product: Product): AIFlowData => {
    const fallbackRisk = getRiskScore(product.name);
    const fallbackLabel = fallbackRisk >= 70 ? 'Alto riesgo' : fallbackRisk >= 55 ? 'Riesgo moderado' : 'Bajo riesgo';
    return {
      productName: product.name,
      estimatedPriceMXN: product.price,
      question: generateQuestion(product.name),
      educationMessage: generateEducationMessage(product.name),
      loadingMessage: 'Estoy conectando tu compra con tus metas para darte un consejo util.',
      riskPercent: fallbackRisk,
      riskLabel: fallbackLabel,
      advisoryMessage:
        'Una compra consciente protege tu liquidez y te ayuda a priorizar decisiones que construyen bienestar financiero.',
      suggestions: [
        `Ahorrar ${formatMXN(Math.round(product.price * 0.5))} para fondo de emergencia`,
        `Invertir ${formatMXN(Math.round(product.price * 0.35))} en una meta mensual`,
        `Reservar ${formatMXN(Math.max(300, Math.round(product.price * 0.2)))} para una experiencia significativa`,
      ],
      relatedProducts: [
        {
          name: 'Botella termica reutilizable',
          estimatedPriceMXN: 250,
          benefit: 'Reduce gasto diario en bebidas y mejora habitos',
          imageUrl: getProductImageUrl('botella termica reutilizable'),
        },
        {
          name: 'Organizador semanal',
          estimatedPriceMXN: 180,
          benefit: 'Te ayuda a planificar compras y evitar impulsos',
          imageUrl: getProductImageUrl('organizador semanal'),
        },
      ],
    };
  };

  const generateFlowWithAI = async (product: Product): Promise<AIFlowData> => {
    const geminiApiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!geminiApiKey) return buildFallbackFlow(product);

    try {
      const client = new GoogleGenerativeAI(geminiApiKey);
      const model = client.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const response = await model.generateContent(
        `Eres un asesor financiero para compras personales en Mexico.
Producto: "${product.name}".
Necesito un analisis completo del flujo de compra en SOLO JSON valido con esta estructura exacta:
{
  "productName": "string",
  "estimatedPriceMXN": 1234,
  "question": "string",
  "educationMessage": "string",
  "loadingMessage": "string",
  "riskPercent": 56,
  "riskLabel": "Bajo riesgo | Riesgo moderado | Alto riesgo",
  "advisoryMessage": "string",
  "suggestions": ["string","string","string"],
  "relatedProducts": [
    { "name": "string", "estimatedPriceMXN": 123, "benefit": "string" }
  ]
}
Reglas:
- estimatedPriceMXN debe ser realista para mercado mexicano actual, evita montos exagerados.
- Si es producto de consumo unitario (ej. refresco, agua, snack), el precio debe estar en rango bajo (aprox. 10 a 250 MXN).
- riskPercent entre 20 y 90 y coherente con estimatedPriceMXN.
- suggestions deben ser acciones financieras utiles y coherentes con ese precio.
- relatedProducts deben ser de menor impacto en cartera y aportar beneficio al usuario.
- question debe invitar reflexion de compra impulsiva.
- No agregues texto fuera del JSON.`
      );

      const rawText = response.response.text()?.trim() ?? '';
      const parsed = parseDetectionJson(rawText) as AIFlowData | null;
      if (!parsed) return buildFallbackFlow(product);

      const safePrice = normalizeEstimatedPrice(
        product.name,
        parsed.estimatedPriceMXN,
        product.price
      );
      const safeRisk =
        typeof parsed.riskPercent === 'number'
          ? Math.max(20, Math.min(90, Math.round(parsed.riskPercent)))
          : getRiskScore(product.name);
      const safeLabel =
        parsed.riskLabel === 'Alto riesgo' || parsed.riskLabel === 'Riesgo moderado' || parsed.riskLabel === 'Bajo riesgo'
          ? parsed.riskLabel
          : safeRisk >= 70
            ? 'Alto riesgo'
            : safeRisk >= 55
              ? 'Riesgo moderado'
              : 'Bajo riesgo';

      const flow: AIFlowData = {
        productName: parsed.productName?.trim() || product.name,
        estimatedPriceMXN: safePrice,
        question: parsed.question?.trim() || generateQuestion(product.name),
        educationMessage:
          parsed.educationMessage?.trim() || generateEducationMessage(product.name),
        loadingMessage:
          parsed.loadingMessage?.trim() ||
          'Estoy conectando tu compra con tus metas para darte un consejo util.',
        riskPercent: safeRisk,
        riskLabel: safeLabel,
        advisoryMessage:
          parsed.advisoryMessage?.trim() ||
          'Una compra consciente protege tu liquidez y te ayuda a priorizar decisiones que construyen bienestar financiero.',
        suggestions:
          Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0
            ? parsed.suggestions.slice(0, 3)
            : buildFallbackFlow(product).suggestions,
        relatedProducts:
          Array.isArray((parsed as any).relatedProducts) && (parsed as any).relatedProducts.length > 0
            ? (parsed as any).relatedProducts
                .slice(0, 3)
                .map((item: any) => ({
                  name: typeof item?.name === 'string' ? item.name : 'Producto util',
                  estimatedPriceMXN:
                    typeof item?.estimatedPriceMXN === 'number' && item.estimatedPriceMXN > 0
                      ? Math.round(Math.min(10000, item.estimatedPriceMXN))
                      : 300,
                  benefit:
                    typeof item?.benefit === 'string'
                      ? item.benefit
                      : 'Aporta valor sin afectar demasiado tu cartera.',
                  imageUrl: getProductImageUrl(
                    typeof item?.name === 'string' ? item.name : 'producto util'
                  ),
                }))
            : buildFallbackFlow(product).relatedProducts,
      };
      console.log(
        `${FLOW_LOG_PREFIX} relatedProducts.ai ${JSON.stringify(flow.relatedProducts)}`
      );
      return flow;
    } catch {
      const fallback = buildFallbackFlow(product);
      console.log(
        `${FLOW_LOG_PREFIX} relatedProducts.fallback ${JSON.stringify(fallback.relatedProducts)}`
      );
      return fallback;
    }
  };

  const openCamera = async () => {
    console.log(`${FLOW_LOG_PREFIX} camera.open requested`);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      console.warn(`${FLOW_LOG_PREFIX} camera.permission denied`);
      setCameraStatus('No se otorgo permiso de camara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.9,
      base64: true,
    });

    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    console.log(`${FLOW_LOG_PREFIX} camera.photo captured uri=${asset.uri.slice(0, 40)}...`);
    setCapturedPhotoUri(asset.uri);
    setSelectedProduct(null);
    setCameraStatus('Analizando imagen...');
    setIsDetectingImage(true);

    try {
      const geminiApiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
      if (!geminiApiKey) {
        setCameraStatus('No hay API key configurada para analizar la imagen.');
        return;
      }
      const { base64, mimeType } = assetToGeminiInlineData(asset);
      const client = new GoogleGenerativeAI(geminiApiKey);
      const model = client.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      console.log(`${FLOW_LOG_PREFIX} camera.ai detect start`);
      const response = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text:
                  'Analiza esta foto y detecta el producto principal. Responde SOLO JSON con formato {"productName":"...","estimatedPriceMXN":1234}.',
              },
              { inlineData: { mimeType, data: base64 } },
            ],
          },
        ],
      });
      const rawText = response.response.text()?.trim() ?? '';
      const parsed = parseDetectionJson(rawText);
      const detectedName = parsed?.productName?.trim();
      const detectedPrice = parsed?.estimatedPriceMXN;
      if (detectedName) {
        console.log(
          `${FLOW_LOG_PREFIX} camera.ai detect ok name="${detectedName}" price=${typeof detectedPrice === 'number' ? detectedPrice : 'n/a'}`
        );
        setSelectedProduct({
          id: 'camera-detected',
          name: detectedName,
          price: typeof detectedPrice === 'number' && detectedPrice > 0 ? detectedPrice : 2400,
          imageUrl: asset.uri,
        });
        setCameraStatus(`Producto detectado: ${detectedName}`);
      } else {
        console.warn(`${FLOW_LOG_PREFIX} camera.ai detect empty result`);
        setCameraStatus('No detecte un producto claro, puedes continuar con la foto.');
      }
    } catch {
      console.error(`${FLOW_LOG_PREFIX} camera.ai detect failed`);
      setCameraStatus('No pude analizar la foto ahora, pero puedes continuar con la imagen.');
    } finally {
      setIsDetectingImage(false);
      console.log(`${FLOW_LOG_PREFIX} camera.ai detect end`);
    }
  };

  const canContinueStep1 =
    (captureMethod === 'camera' && capturedPhotoUri !== null && !isDetectingImage) ||
    (captureMethod === 'keyboard' && typedProduct.trim().length > 1);

  const canContinueStep2 = selectedAnswer !== null;
  const goToStep2 = async () => {
    if (!currentProduct) return;
    console.log(`${FLOW_LOG_PREFIX} flow.generate start product="${currentProduct.name}"`);
    setIsGeneratingFlow(true);
    const flow = await generateFlowWithAI(currentProduct);
    console.log(
      `${FLOW_LOG_PREFIX} flow.generate done name="${flow.productName}" price=${flow.estimatedPriceMXN} risk=${flow.riskPercent}`
    );
    console.log(`${FLOW_LOG_PREFIX} relatedProducts.final ${JSON.stringify(flow.relatedProducts)}`);
    setAiFlowData(flow);
    setIsGeneratingFlow(false);
    setStep(2);
  };

  return (
    <Box className="flex-1 bg-background-light">
      <HStack className="items-center px-4 pt-14 pb-4 bg-primary-700 border-b border-primary-800">
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-primary-800">
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </Pressable>
        <Text className="text-white text-lg font-semibold ml-3">Analiza tu compra</Text>
      </HStack>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 24,
          flexGrow: 1,
          justifyContent: step === 3 ? 'center' : 'flex-start',
        }}
      >
        {step === 1 && (
          <>
            <Text className="text-xl font-semibold text-typography-900 mb-1">¿Qué quieres comprar?</Text>
            <Text className="text-sm text-typography-600 mb-4">
              Selecciona un metodo para analizar una compra.
            </Text>

            <HStack className="flex-wrap -mx-1 mb-3">
              {[
                { id: 'camera' as const, label: 'Camara', icon: 'camera-outline' },
                { id: 'keyboard' as const, label: 'Teclado', icon: 'create-outline' },
              ].map((method) => {
                const active = captureMethod === method.id;
                return (
                  <Pressable
                    key={method.id}
                    onPress={() => {
                      console.log(`${FLOW_LOG_PREFIX} method.select ${method.id}`);
                      setCaptureMethod(method.id);
                      if (method.id === 'camera') void openCamera();
                    }}
                    className="w-1/2 px-1"
                  >
                    <Box
                      className={`rounded-xl border py-3 items-center ${
                        active ? 'border-primary-600 bg-primary-50' : 'border-outline-300 bg-background-0'
                      }`}
                    >
                      <Ionicons
                        name={method.icon}
                        size={18}
                        color={active ? '#006341' : '#6B7280'}
                      />
                      <Text
                        className={`text-xs mt-1 ${active ? 'text-primary-700 font-semibold' : 'text-typography-600'}`}
                      >
                        {method.label}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </HStack>

            {captureMethod === 'camera' && (
              <Box className="mb-3">
                <Box className="rounded-xl border border-outline-300 bg-background-0 mt-2 p-2">
                  {capturedPhotoUri ? (
                    <Pressable onPress={openCamera}>
                      <Image
                        source={{ uri: capturedPhotoUri }}
                        style={{ width: '100%', height: 180, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                      <Text className="text-center text-xs text-primary-700 font-medium mt-2">
                        Toca la imagen para volver a tomar foto
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable onPress={openCamera}>
                      <Box className="h-[180px] items-center justify-center">
                        <Ionicons name="camera-outline" size={36} color="#6B7280" />
                        <Text className="text-xs text-typography-500 mt-2">
                          Toca para abrir camara y tomar foto del producto.
                        </Text>
                      </Box>
                    </Pressable>
                  )}
                </Box>
                {!!cameraStatus && (
                  <Text className="text-xs text-typography-500 mt-2">{cameraStatus}</Text>
                )}
              </Box>
            )}

            {captureMethod === 'keyboard' && (
              <Box className="mb-3">
                <Input className="rounded-xl border-outline-300" size="lg">
                  <InputField
                    placeholder="Escribe el producto a analizar"
                    value={typedProduct}
                    onChangeText={setTypedProduct}
                  />
                </Input>
              </Box>
            )}

            <Text className="text-xs text-typography-500 mb-4">
              Puedes usar camara o teclado para analizar lo que planeas comprar.
            </Text>

            <Pressable disabled={!canContinueStep1 || isGeneratingFlow} onPress={() => void goToStep2()}>
              <Box className={`rounded-xl py-3 ${canContinueStep1 ? 'bg-primary-700' : 'bg-primary-200'}`}>
                <Text className="text-center text-white font-semibold">
                  {isGeneratingFlow ? 'Preparando analisis IA...' : 'Continuar'}
                </Text>
              </Box>
            </Pressable>
          </>
        )}

        {step === 2 && currentProduct && (
          <>
            <Text className="text-sm text-typography-500 mb-2">Paso 2 de 4</Text>
            <Box className="border border-outline-300 rounded-2xl p-3 bg-background-50 mb-4 flex-row items-center">
              <Image source={{ uri: currentProduct.imageUrl }} style={{ width: 72, height: 72, borderRadius: 10 }} />
              <Box className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-typography-900">{currentProduct.name}</Text>
                <Text className="text-xs text-typography-500 mt-1">
                  Precio estimado por IA: {formatMXN(displayPrice)}
                </Text>
              </Box>
            </Box>

            <Text className="text-base text-typography-800 mb-3">{question}</Text>

            {ANSWER_OPTIONS.map((option) => {
              const selected = selectedAnswer === option;
              return (
                <Pressable key={option} onPress={() => setSelectedAnswer(option)}>
                  <Box
                    className={`border rounded-xl px-4 py-3 mb-2 ${
                      selected ? 'border-primary-600 bg-primary-50' : 'border-outline-300 bg-background-0'
                    }`}
                  >
                    <Text className={`text-sm ${selected ? 'text-primary-700 font-semibold' : 'text-typography-700'}`}>
                      {option}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}

            <Pressable disabled={!canContinueStep2} onPress={() => setStep(3)}>
              <Box className={`rounded-xl py-3 mt-3 ${canContinueStep2 ? 'bg-primary-700' : 'bg-primary-200'}`}>
                <Text className="text-center text-white font-semibold">Analizar</Text>
              </Box>
            </Pressable>
          </>
        )}

        {step === 3 && (
          <Box className="items-center justify-center py-10">
            <Image
              source={require('@/assets/isotipo.png')}
              style={{ width: 168, height: 168 }}
              resizeMode="contain"
            />
            <Text className="text-sm text-typography-700 text-center mt-5 px-2">
              {aiFlowData?.loadingMessage ?? educationMessage}
            </Text>

            <Box className="w-[72%] mt-6">
              <Box className="h-2.5 rounded-full bg-primary-100 overflow-hidden">
                <Box className="h-full bg-primary-600 rounded-full" style={{ width: `${progress}%` }} />
              </Box>
              <Text className="text-center text-sm font-semibold text-primary-700 mt-2">{progress}%</Text>
            </Box>

          </Box>
        )}

        {step === 4 && currentProduct && (
          <>
            <Text className="text-sm text-typography-500 mb-1">Impacto de la compra</Text>
            <Text className="text-xl font-semibold text-typography-900 mb-2">{currentProduct.name}</Text>

            <Box className="items-center mb-4">
              <Box className="w-28 h-28 rounded-full border-4 border-primary-300 items-center justify-center">
                <Text className="text-3xl font-bold text-primary-800">{risk}%</Text>
              </Box>
              <Text className="text-base font-semibold text-typography-900 mt-3">{riskLabel}</Text>
            </Box>

            <Text className="text-sm text-typography-700 mb-3">
              {advisoryMessage}
            </Text>

            {suggestions.map((item) => (
              <Box key={item} className="border border-outline-200 rounded-xl px-3 py-2 mb-2 bg-background-0">
                <Text className="text-sm text-typography-700">{item}</Text>
              </Box>
            ))}

            {relatedProducts.length > 0 && (
              <>
                <Text className="text-sm font-semibold text-typography-900 mt-4 mb-2">
                  Productos relacionados de bajo impacto
                </Text>
                <HStack space="xs" className="w-full">
                  {relatedProducts.slice(0, 3).map((item) => (
                    <Box
                      key={`${item.name}-${item.estimatedPriceMXN}`}
                      className="flex-1 border border-success-200 rounded-lg p-2 bg-success-50"
                    >
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: '100%', height: 56, borderRadius: 6, marginBottom: 6 }}
                        resizeMode="cover"
                      />
                      <Text className="text-[11px] font-semibold text-success-800" numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text className="text-[10px] text-success-700 mt-1" numberOfLines={1}>
                        {formatMXN(item.estimatedPriceMXN)}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </>
            )}

            <Pressable onPress={() => router.back()}>
              <Box className="rounded-xl py-3 mt-4 bg-primary-900">
                <Text className="text-center text-white font-semibold">Generar plan</Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => router.back()}>
              <Box className="rounded-xl py-3 mt-2 border border-outline-300 bg-background-0">
                <Text className="text-center text-typography-700 font-medium">Cancelar</Text>
              </Box>
            </Pressable>
          </>
        )}
      </ScrollView>
    </Box>
  );
}
