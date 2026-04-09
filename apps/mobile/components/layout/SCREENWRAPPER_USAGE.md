# ScreenWrapper - Uso y Estándares de Padding

## Descripción

`ScreenWrapper` es un contenedor estandarizado para todas las pantallas que proporciona padding consistente en todo la aplicación. El header se renderiza SIN padding, y solo el contenido recibe padding lateral y superior.

## Estructura Interna

```
<Box flex-1 bg-background-50>
  {header}  ← Sin padding (ancho completo)
  <Box px-4 pt-4 pb-0 flex-1>
    {children}  ← Con padding lateral 16px y superior 16px
  </Box>
</Box>
```

## Especificaciones de Padding

- **Header:** Sin padding (ancho completo)
- **Contenido lateral (px):** 16px (clase `px-4`)
- **Contenido superior (pt):** 16px (clase `pt-4`) - Espacio debajo del GlobalHeader
- **Contenido inferior (pb):** 0px (clase `pb-0`) - Sin espacio para los tabs

## Uso Correcto

```tsx
import { ScreenWrapper } from '@/components/layout';
import { GlobalHeader } from '@/components/layout';

export const MyScreen: React.FC = () => {
  return (
    <ScreenWrapper header={<GlobalHeader mode="settings" />}>
      {/* Tu contenido aquí - CON padding automático */}
    </ScreenWrapper>
  );
};
```

## Props

```tsx
interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  header?: React.ReactNode;  // Header opcional (sin padding)
  className?: string;         // Clases adicionales en Box exterior
}
```

## Ejemplos Correctos

### Con ScrollView (Content Scrollable)
```tsx
<ScreenWrapper header={<GlobalHeader mode="settings" />}>
  <VStack className="flex-1">
    <ScrollView className="flex-1">
      <VStack className="py-4" space="md">
        {/* Items aquí - ya tienen px-4 del wrapper */}
      </VStack>
    </ScrollView>
  </VStack>
</ScreenWrapper>
```

### Con Contenido Centrado
```tsx
<ScreenWrapper header={<GlobalHeader mode="settings" />}>
  <Box className="flex-1 justify-center items-center">
    <Text>Contenido centrado</Text>
  </Box>
</ScreenWrapper>
```

### Sin Header (Opcional)
```tsx
<ScreenWrapper>
  {/* Contenido con padding px-4 pt-4 */}
</ScreenWrapper>
```

## Lo que NO Debes Hacer

❌ **No agregues px o pt adicionales en el contenido:**
```tsx
// MALO - El wrapper ya proporciona padding
<ScreenWrapper header={<GlobalHeader mode="settings" />}>
  <VStack className="px-6 pt-4">  {/* ← NO! */}
    {/* contenido */}
  </VStack>
</ScreenWrapper>
```

❌ **No renderices el header dentro del contenido:**
```tsx
// MALO - El header debe ir en la prop header
<ScreenWrapper>
  <GlobalHeader mode="settings" />  {/* ← NO! */}
  {/* contenido */}
</ScreenWrapper>
```

## Ventajas

✅ Header con ancho completo (sin padding lateral)
✅ Contenido con padding consistente
✅ Consistencia visual centralizada
✅ Sin código redundante
✅ Cambios futuros de padding en un solo lugar
