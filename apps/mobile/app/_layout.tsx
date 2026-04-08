import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AppContent() {
	return <Slot />;
}

export default function RootLayout() {
	// Guard de autenticación - protege rutas según rol
	return (
		<SafeAreaProvider>
				<GluestackUIProvider>
					<AppContent />
				</GluestackUIProvider>
		</SafeAreaProvider>
	);
}