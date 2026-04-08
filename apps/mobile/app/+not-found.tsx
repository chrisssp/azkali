import { Link } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function NotFoundScreen() {
  return (
    <Box className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-4xl font-bold mb-4">404</Text>
      <Text className="text-xl mb-2">Página no encontrada</Text>
      <Text className="text-typography-500 mb-8 text-center">
        La pantalla que buscas no existe
      </Text>
      <Link href="/(tabs)/feature1" asChild>
        <Button>
          <ButtonText>Volver al inicio</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}
