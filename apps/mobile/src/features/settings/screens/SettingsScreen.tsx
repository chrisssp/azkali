import React from "react";
import { ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { GlobalHeader, ScreenWrapper } from "@/components/layout";

// ─── Types ─────────────────────────────────────────────────────────────────────

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface SettingsItemProps {
  icon: IoniconsName;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

// ─── Components ────────────────────────────────────────────────────────────────

function SettingsItem({
  icon,
  label,
  onPress,
  danger = false,
}: SettingsItemProps) {
  return (
    <Pressable onPress={onPress} android_ripple={{ color: "#f0f0f0" }}>
      <HStack className="items-center px-6 py-4" space="md">
        <Box className="w-8 h-8 items-center justify-center">
          <Ionicons
            name={icon}
            size={22}
            color={danger ? "#DC2626" : "#006341"}
          />
        </Box>
        <Text
          className={`flex-1 text-base font-medium ${danger ? "text-red-600" : "text-typography-900"}`}
        >
          {label}
        </Text>
        {!danger && (
          <Ionicons name="chevron-forward-outline" size={16} color="#9CA3AF" />
        )}
      </HStack>
    </Pressable>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <Text className="pt-5 pb-2 text-xs font-semibold text-typography-400 uppercase tracking-widest">
      {text}
    </Text>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => router.replace("/welcome"),
        },
      ],
    );
  };

  return (
    <ScreenWrapper header={<GlobalHeader mode="back" title="Configuración" />}>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Cuenta ────────────────────────────────────────── */}
        <SectionLabel text="Cuenta" />
        <Box className="bg-white rounded-2xl border border-outline-100 overflow-hidden">
          <SettingsItem
            icon="person-outline"
            label="Cambiar datos"
            onPress={() => {}}
          />
          <Divider className="ml-16" />
          <SettingsItem
            icon="shield-checkmark-outline"
            label="Seguridad"
            onPress={() => {}}
          />
          <Divider className="ml-16" />
          <SettingsItem
            icon="notifications-outline"
            label="Notificaciones"
            onPress={() => {}}
          />
        </Box>

        {/* ── Personalización ────────────────────────────────── */}
        <SectionLabel text="Personalización" />
        <Box className="bg-white rounded-2xl border border-outline-100 overflow-hidden">
          <SettingsItem
            icon="color-palette-outline"
            label="Personalizar"
            onPress={() => router.push("/settings/personalize")}
          />
        </Box>

        {/* ── Más ────────────────────────────────────────────── */}
        <SectionLabel text="Más" />
        <Box className="bg-white rounded-2xl border border-outline-100 overflow-hidden">
          <SettingsItem
            icon="document-text-outline"
            label="Términos y condiciones"
            onPress={() => {}}
          />
          <Divider className="ml-16" />
          <SettingsItem
            icon="lock-closed-outline"
            label="Política de privacidad"
            onPress={() => {}}
          />
          <Divider className="ml-16" />
          <SettingsItem
            icon="help-circle-outline"
            label="Ayuda y soporte"
            onPress={() => {}}
          />
        </Box>

        {/* ── Sesión ─────────────────────────────────────────── */}
        <SectionLabel text="Sesión" />
        <Box className="bg-white rounded-2xl border border-red-100 overflow-hidden">
          <SettingsItem
            icon="log-out-outline"
            label="Cerrar sesión"
            onPress={handleLogout}
            danger
          />
        </Box>

        <Box style={{ height: 40 }} />
      </ScrollView>
    </ScreenWrapper>
  );
}
