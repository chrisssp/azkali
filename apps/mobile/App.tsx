import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Box } from "./components/ui/box";
import { AddIcon, InfoIcon } from "./components/ui/icon";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <View style={styles.container}>
        <Text className="bg-green-500">Hola mundooo</Text>

        <Box>
          <Button>
            <ButtonIcon as={InfoIcon} className="mr-2" />
            <ButtonText>Left Icon</ButtonText>
          </Button>
          <Button variant="solid" className="mt-2">
            <ButtonText>Right Icon</ButtonText>
            <ButtonIcon as={AddIcon} className="ml-2" />
          </Button>
        </Box>

        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
