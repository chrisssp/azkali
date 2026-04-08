import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
	FormControl,
	FormControlLabel,
	FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const WELCOME_HERO_HEIGHT = SCREEN_HEIGHT * 0.48;
const WELCOME_CURVE_DEPTH = 40;
const HEADER_HEIGHT = 90;
const SVG_CANVAS_HEIGHT = WELCOME_HERO_HEIGHT + WELCOME_CURVE_DEPTH * 2;
const SPRING = { damping: 26, stiffness: 130, mass: 1 };
const RESEND_COOLDOWN = 60;

export function VerifyScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const [code, setCode] = useState("");
	const [resent, setResent] = useState(false);
	const [countdown, setCountdown] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const bandHeight = useSharedValue(WELCOME_HERO_HEIGHT);
	const curveDepth = useSharedValue(WELCOME_CURVE_DEPTH * 2);
	const contentOpacity = useSharedValue(0);

	useEffect(() => {
		bandHeight.value = WELCOME_HERO_HEIGHT;
		curveDepth.value = WELCOME_CURVE_DEPTH * 2;
		contentOpacity.value = 0;

		bandHeight.value = withSpring(HEADER_HEIGHT, SPRING);
		curveDepth.value = withSpring(0, SPRING);
		contentOpacity.value = withDelay(
			260,
			withTiming(1, { duration: 320, easing: Easing.out(Easing.ease) }),
		);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const containerStyle = useAnimatedStyle(() => ({
		height: bandHeight.value + curveDepth.value,
	}));

	const animatedPathProps = useAnimatedProps(() => ({
		d: [
			`M 0 0`,
			`L ${SCREEN_WIDTH} 0`,
			`L ${SCREEN_WIDTH} ${bandHeight.value}`,
			`Q ${SCREEN_WIDTH / 2} ${bandHeight.value + curveDepth.value} 0 ${bandHeight.value}`,
			"Z",
		].join(" "),
	}));

	const headerContentStyle = useAnimatedStyle(() => ({
		opacity: contentOpacity.value,
	}));

	const handleResend = () => {
		if (countdown > 0) return;
		setResent(true);
		setCountdown(RESEND_COOLDOWN);
		timerRef.current = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current!);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleVerify = () => {
		router.replace("/chat");
	};

	const formatCountdown = (seconds: number) => {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	};

	return (
		<Box className="flex-1 bg-white">
			{/* ── Animated green header — morphs from welcome curve ── */}
			<Animated.View style={containerStyle}>
				<Svg
					width={SCREEN_WIDTH}
					height={SVG_CANVAS_HEIGHT}
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
				>
					<AnimatedPath animatedProps={animatedPathProps} fill="#006341" />
				</Svg>

				<Animated.View
					className="absolute top-0 left-0 right-0 px-5 flex-row items-center"
					style={[{ paddingTop: insets.top + 10 }, headerContentStyle]}
				>
					<Pressable
						onPress={() => router.back()}
						hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
					>
						<ArrowLeft color="#fff" size={22} />
					</Pressable>
					<Text className="text-2xl font-bold text-white ml-3">
						Verificar código
					</Text>
				</Animated.View>
			</Animated.View>

			{/* ── White content area ── */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1"
			>
				<ScrollView
					className="flex-1"
					contentContainerStyle={{
						paddingHorizontal: 24,
						paddingTop: 32,
						paddingBottom: 12,
					}}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<VStack space="sm">
						<Text className="text-3xl font-bold text-primary-700 mb-2">
							Ingresa el código
						</Text>
						<Text className="text-sm text-typography-500 mb-6">
							Te enviamos un código de 6 dígitos a tu correo o número
							registrado.
						</Text>

						<FormControl>
							<FormControlLabel>
								<FormControlLabelText className="text-sm font-medium text-typography-700">
									Código de verificación
								</FormControlLabelText>
							</FormControlLabel>
							<Input variant="outline" size="xl" className="rounded-xl mt-1">
								<InputField
									value={code}
									onChangeText={(val) =>
										setCode(val.replace(/[^0-9]/g, "").slice(0, 6))
									}
									keyboardType="number-pad"
									maxLength={6}
									placeholder="······"
									returnKeyType="done"
								/>
							</Input>
						</FormControl>

						{resent && (
							<VStack className="mt-4 items-center" space="xs">
								<Text className="text-sm text-success-600 font-medium">
									Código reenviado
								</Text>
								{countdown > 0 && (
									<>
										<Text className="text-sm text-typography-500">
											Siguiente intento disponible en:
										</Text>
										<Text className="text-base font-semibold text-primary-700">
											{formatCountdown(countdown)}
										</Text>
									</>
								)}
							</VStack>
						)}
					</VStack>
				</ScrollView>

				<Box
					className="px-6 pt-3 bg-white"
					style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
				>
					<Button
						className="w-full border-primary-700 rounded-2xl bg-transparent mb-3"
						size="xl"
						variant="outline"
						onPress={handleResend}
						isDisabled={countdown > 0}
					>
						<ButtonText className="text-primary-700 font-semibold text-base">
							Reenviar código
						</ButtonText>
					</Button>

					<Button
						className="w-full bg-primary-700 rounded-2xl"
						size="xl"
						onPress={handleVerify}
						isDisabled={code.length < 6}
					>
						<ButtonText className="text-white font-semibold text-base">
							Verificar
						</ButtonText>
					</Button>
				</Box>
			</KeyboardAvoidingView>
		</Box>
	);
}
