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
import React, { useEffect, useRef, useState } from "react";
import {
KeyboardAvoidingView,
Platform,
ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenWrapper, GlobalHeader } from "@/components/layout";

const RESEND_COOLDOWN = 60;

export function VerifyScreen() {
const router = useRouter();
const insets = useSafeAreaInsets();

const [code, setCode] = useState("");
const [resent, setResent] = useState(false);
const [countdown, setCountdown] = useState(0);
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

useEffect(() => {
return () => {
if (timerRef.current) clearInterval(timerRef.current);
};
}, []);

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
<ScreenWrapper header={<GlobalHeader mode="back" title="Verificar código" onBackPress={() => router.back()} />}>
<KeyboardAvoidingView
behavior={Platform.OS === "ios" ? "padding" : undefined}
className="flex-1"
>
<ScrollView
className="flex-1"
contentContainerStyle={{
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
<Text className="text-2xl font-bold text-primary-700">
{formatCountdown(countdown)}
</Text>
</>
)}
</VStack>
)}

<Pressable
className="mt-8 items-center"
onPress={handleResend}
disabled={countdown > 0}
>
<Text
className={`text-sm font-medium ${
countdown > 0 ? "text-typography-400" : "text-primary-700"
}`}
>
¿No recibiste el código?
</Text>
</Pressable>
</VStack>
</ScrollView>

<Box
className="pt-3"
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
</ScreenWrapper>
);
}
