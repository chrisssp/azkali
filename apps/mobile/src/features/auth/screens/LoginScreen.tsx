import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import type React from "react";
import { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks";
import { ScreenWrapper, GlobalHeader } from "@/components/layout";

export const LoginScreen: React.FC = () => {
	const router = useRouter();
	const { login, isLoading, error } = useAuth();
	const insets = useSafeAreaInsets();

	const [emailOrPhone, setEmailOrPhone] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (emailOrPhone: string, password: string) => {
		try {
			await login({ email: emailOrPhone, password });
			router.replace("/chat");
		} catch {
			// Error is surfaced through the hook's error state
		}
	};

	return (
		<ScreenWrapper header={<GlobalHeader mode="animated-login" onBackPress={() => router.replace('/welcome')} />}>
			{/* ── Form body ────────────────────────────────────────────── */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1"
			>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 12 }}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<LoginForm
						emailOrPhone={emailOrPhone}
						onChangeEmailOrPhone={setEmailOrPhone}
						password={password}
						onChangePassword={setPassword}
						error={error?.message}
						onSubmit={() => handleLogin(emailOrPhone, password)}
					/>
				</ScrollView>

				<Box
					className="pt-3"
					style={{ paddingBottom: Math.max(insets.bottom + 8, 24) }}
				>
					<Button
						onPress={() => handleLogin(emailOrPhone, password)}
						isDisabled={isLoading}
						className="w-full bg-primary-700 rounded-2xl"
						size="xl"
					>
						<ButtonText className="text-white font-semibold">
							{isLoading ? "Cargando..." : "Iniciar sesión"}
						</ButtonText>
					</Button>

					<Pressable
						className="mt-4 items-center"
						onPress={() => router.push("/register")}
					>
						<Text className="text-sm text-typography-500 text-center">
							¿Aún no tienes una cuenta?
						</Text>
					</Pressable>
				</Box>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
};
