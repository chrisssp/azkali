# Gluestack UI - Guía de implementación para agentes IA

## Propósito de este documento

Este documento proporciona instrucciones específicas para agentes de IA sobre cómo utilizar **Gluestack UI** como biblioteca de componentes principal para construir la aplicación móvil Azkali. Gluestack UI es una biblioteca universal que funciona tanto en React Native como en Next.js con código consistente.

---

## Filosofía de Gluestack UI

### Copy-paste components

- **No es una dependencia tradicional**: Los componentes se copian y pegan directamente en el proyecto
- **Propiedad total del código**: Modificación completa sin restricciones de vendor lock-in
- **Sin dependencias pesadas**: Solo incluyes lo que necesitas

### Código universal

- **Mismo código para web y mobile**: Funciona en React, Next.js y React Native
- **Consistencia multiplataforma**: Comportamiento idéntico en todas las plataformas
- **NativeWind + Tailwind CSS**: Sistema de estilos unificado

---

## Ubicación de componentes

Los componentes de Gluestack UI están ubicados en:

```
apps/mobile/components/ui/
```

### Estructura de carpetas

```
components/ui/
├── accordion/
├── actionsheet/
├── alert/
├── alert-dialog/
├── avatar/
├── badge/
├── button/
├── card/
├── checkbox/
├── form-control/
├── input/
├── modal/
├── select/
├── toast/
└── ... (30+ componentes)
```

---

##Cómo Usar los Componentes

### 1. Importación de Componentes

```tsx
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { VStack, HStack } from "@/components/ui/vstack";
```

### 2. Componentes compuestos (compound components)

Gluestack UI utiliza un patrón de componentes compuestos para mayor flexibilidad:

```tsx
<Button size="md" className="bg-primary-500">
  <ButtonText className="text-white">Click Me</ButtonText>
</Button>
```

### 3. Estilos con Tailwind/NativeWind

Todos los componentes aceptan clases de Tailwind CSS a través de la prop `className`:

```tsx
<Box className="p-4 bg-gray-100 rounded-lg">
  <Heading className="text-2xl font-bold text-gray-900">Welcome</Heading>
  <Text className="mt-2 text-gray-600">
    This is styled with Tailwind classes
  </Text>
</Box>
```

---

## Componentes principales disponibles

### Layout & containers

- **Box**: Contenedor flexible básico
- **VStack**: Stack vertical con espaciado
- **HStack**: Stack horizontal con espaciado
- **Grid**: Sistema de grid responsivo
- **Center**: Centra contenido
- **Card**: Contenedor de tarjeta con estilos predefinidos

### Forms & inputs

- **Button**: Botones con variantes (solid, outline, link)
- **Input**: Campo de entrada de texto
- **Textarea**: Campo de texto multilínea
- **Checkbox**: Casilla de verificación
- **Radio**: Botón de radio
- **Select**: Selector desplegable
- **Switch**: Interruptor toggle
- **Slider**: Control deslizante
- **FormControl**: Wrapper para controles de formulario con validación

### Navigation & feedback

- **ActionSheet**: Hoja de acciones desde abajo
- **Drawer**: Cajón lateral deslizante
- **Modal**: Modal/Dialog centrado
- **Popover**: Contenido emergente posicionado
- **Toast**: Notificaciones temporales
- **Alert**: Alertas inline
- **AlertDialog**: Diálogo de alerta modal
- **Fab**: Floating Action Button
- **Menu**: Menú desplegable

### Data display

- **Avatar**: Imagen de perfil circular
- **Badge**: Etiqueta/insignia pequeña
- **Table**: Tablas de datos
- **Skeleton**: Placeholders de carga
- **Divider**: Separador visual
- **Progress**: Barra de progreso
- **Spinner**: Indicador de carga

### Typography & media

- **Heading**: Títulos con niveles semánticos
- **Text**: Texto con estilos
- **Image**: Componente de imagen
- **Icon**: Sistema de iconos
- **Link**: Enlaces navegables

### Utilities

- **Portal**: Renderiza componentes fuera del DOM tree
- **Pressable**: Área presionable customizable

---

## Sistema de estilos

### Clases Tailwind comunes

```tsx
// Espaciado
className = "p-4 px-6 py-2 m-4 mt-2";

// Colores
className = "bg-primary-500 text-white border-gray-300";

// Tipografía
className = "text-lg font-bold text-center";

// Layout
className = "flex-1 w-full h-screen items-center justify-center";

// Bordes y sombras
className = "rounded-lg border border-gray-200 shadow-md";

// Estados responsivos
className = "w-full md:w-1/2 lg:w-1/3";
```

### Variantes de componentes

Los componentes soportan variantes a través de props:

```tsx
// Tamaños
<Button size="sm" />  // small
<Button size="md" />  // medium
<Button size="lg" />  // large

// Variantes
<Button variant="solid" />   // fondo sólido
<Button variant="outline" /> // solo borde
<Button variant="link" />    // estilo enlace

// Estados
<Button isDisabled />
<Button isLoading />
<Input isInvalid />
<Input isReadOnly />
```

---

## Componentes personalizados

### Cuándo crear componentes custom

Crea componentes personalizados cuando:

1. **Los componentes de Gluestack no cubren tu caso de uso específico**
2. **Necesitas composiciones complejas reutilizables**
3. **Requieres lógica de negocio específica**
4. **Necesitas integraciones con APIs o servicios externos**

### Estructura para componentes personalizados

```
src/components/
├── custom/
│   ├── ProfileCard.tsx
│   ├── ChatBubble.tsx
│   └── CustomTimePicker.tsx
└── shared/
    ├── LoadingOverlay.tsx
    └── EmptyState.tsx
```

### Ejemplo de componente personalizado

```tsx
// src/components/custom/ProfileCard.tsx
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  onEdit?: () => void;
}

export function ProfileCard({ name, email, avatar, onEdit }: ProfileCardProps) {
  return (
    <Card className="p-4 shadow-lg">
      <VStack space="md" className="items-center">
        <Avatar size="xl" className="border-2 border-primary-500">
          <Avatar.FallbackText>{name}</Avatar.FallbackText>
          {avatar && <Avatar.Image source={{ uri: avatar }} />}
        </Avatar>

        <VStack space="xs" className="items-center">
          <Heading size="lg" className="text-gray-900">
            {name}
          </Heading>
          <Text className="text-gray-600">{email}</Text>
        </VStack>

        {onEdit && (
          <Button onPress={onEdit} className="mt-4">
            <ButtonText>Edit Profile</ButtonText>
          </Button>
        )}
      </VStack>
    </Card>
  );
}
```

---

## Modificación de componentes existentes

### Opción 1: extender props

```tsx
// Wrapper personalizado sobre el componente base
import { Button, ButtonProps } from "@/components/ui/button";

interface CustomButtonProps extends ButtonProps {
  isConfirmation?: boolean;
}

export function CustomButton({ isConfirmation, ...props }: CustomButtonProps) {
  return (
    <Button
      {...props}
      className={`${props.className} ${isConfirmation ? "bg-red-500" : ""}`}
    />
  );
}
```

### Opción 2: modificar el código fuente

Como los componentes están en tu proyecto, puedes modificarlos directamente:

```tsx
// Editar: components/ui/button/index.tsx
// Agregar nuevas variantes o comportamientos
```

---

## Patrones de composición

### Layout pattern

```tsx
<Box className="flex-1 bg-white">
  <VStack space="lg" className="p-4">
    <Heading>Dashboard</Heading>

    <HStack space="md">
      <Card className="flex-1">
        <Text>Card 1</Text>
      </Card>
      <Card className="flex-1">
        <Text>Card 2</Text>
      </Card>
    </HStack>
  </VStack>
</Box>
```

### Form pattern

```tsx
<VStack space="md" className="p-4">
  <FormControl>
    <FormControl.Label>
      <FormControl.Label.Text>Email</FormControl.Label.Text>
    </FormControl.Label>
    <Input>
      <InputField placeholder="Enter email" keyboardType="email-address" />
    </Input>
    <FormControl.Error>
      <FormControl.Error.Text>Email is required</FormControl.Error.Text>
    </FormControl.Error>
  </FormControl>

  <Button className="mt-4">
    <ButtonText>Submit</ButtonText>
  </Button>
</VStack>
```

### Modal pattern

```tsx
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";

const [showModal, setShowModal] = useState(false);

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <ModalBackdrop />
  <ModalContent className="p-6">
    <VStack space="md">
      <Heading>Confirm Action</Heading>
      <Text>Are you sure you want to proceed?</Text>
      <HStack space="sm" className="justify-end mt-4">
        <Button variant="outline" onPress={() => setShowModal(false)}>
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button onPress={handleConfirm}>
          <ButtonText>Confirm</ButtonText>
        </Button>
      </HStack>
    </VStack>
  </ModalContent>
</Modal>;
```

---

## Accesibilidad

Todos los componentes de Gluestack UI vienen con **accesibilidad por defecto**:

- **ARIA labels** incluidos
- **Navegación por teclado** soportada
- **Screen reader friendly**
- **Focus management** automático

### Mejorar accesibilidad

```tsx
<Button
  accessibilityLabel="Save your changes"
  accessibilityHint="Saves the form data"
>
  <ButtonText>Save</ButtonText>
</Button>
```

---

## Best practices para agentes IA

### 1. Priorizar componentes de Gluestack

- **Siempre revisa primero** si existe un componente de Gluestack UI
- **No reinventes la rueda**: Usa los componentes disponibles
- **Compón antes de crear**: Combina componentes existentes

### 2. Naming conventions

```tsx
// ✅ Correcto - componentes personalizados con sufijo descriptivo
(ProfileCard, CustomDatePicker, AuthButton);

// ❌ Incorrecto - nombres genéricos que colisionan
(Card, DatePicker, Button);
```

### 3. Estructura de archivos

```tsx
// Componente feature-specific
src / features / auth / components / LoginForm.tsx;

// Componente custom compartido
src / components / custom / SpecialCard.tsx;

// Gluestack UI components (no modificar ubicación)
components / ui / button / index.tsx;
```

### 4. Testing

```tsx
// Los componentes de Gluestack ya están testeados
// Solo testea tu lógica custom

describe("ProfileCard", () => {
  it("should call onEdit when button is pressed", () => {
    const onEdit = jest.fn();
    // ... test implementation
  });
});
```

### 5. Documentación

Cuando crees componentes personalizados, documenta:

- **Props interface** con TypeScript
- **Ejemplo de uso** en comentarios
- **Dependencias** de componentes Gluestack utilizados

---

## Recursos adicionales

### Documentación oficial

- **Sitio web**: https://gluestack.io/
- **Componentes**: https://gluestack.io/ui/docs/components/all-components
- **Guía de introducción**: https://gluestack.io/ui/docs/home/overview/introduction

### Comunidades

- **Discord**: https://discord.gg/95qQ84nf6f
- **GitHub**: https://github.com/gluestack/gluestack-ui
- **Twitter**: @gluestack

### Ejemplos

- **KitchenSink App**: Demo completa con todos los componentes
- **GitHub Repo**: Ejemplos de código en el repositorio oficial

---

## Workflow para agentes IA

### Al recibir una tarea de UI:

1. **Identifica los componentes necesarios**
   - ¿Qué componentes de Gluestack UI aplican?
   - ¿Se necesita composición o customización?

2. **Revisa la carpeta `components/ui/`**
   - ¿El componente ya existe?
   - ¿Puedo componer componentes existentes?

3. **Implementa siguiendo patrones**
   - Usa ejemplos de este documento
   - Aplica clases Tailwind para estilos
   - Mantén accesibilidad

4. **Crea custom solo si es necesario**
   - Documenta el componente custom
   - Ubícalo en `src/components/custom/`
   - Reutiliza componentes base de Gluestack

5. **Valida el resultado**
   - ¿Es responsive?
   - ¿Es accesible?
   - ¿Sigue los patrones del proyecto?

---

## ⚠️ Limitaciones y Consideraciones

### No Disponible en Gluestack UI

Si necesitas componentes que no están disponibles, crea versiones personalizadas:

- **Date/Time Pickers avanzados** → Usar `@react-native-community/datetimepicker`
- **Charts/Graphs** → Usar `react-native-chart-kit` o similar
- **Maps** → Usar `react-native-maps`
- **Camera** → Usar `expo-camera`
- **Video Player** → Usar `expo-av`

### Performance

- Los componentes son ligeros por defecto
- Optimiza listas grandes con `FlatList`/`FlashList` en lugar de mapear componentes
- Usa `React.memo()` para componentes custom pesados

---

## Resumen ejecutivo

**Para agentes IA que generan código para este proyecto:**

1. ✅ **USA componentes de Gluestack UI** de `components/ui/` como primera opción
2. ✅ **COMPÓN componentes** antes de crear nuevos
3. ✅ **ESTILIZA con Tailwind** usando `className`
4. ✅ **CREA custom** solo cuando sea necesario en `src/components/custom/`
5. ✅ **DOCUMENTA** componentes personalizados
6. ✅ **MANTÉN accesibilidad** usando props ARIA
7. ✅ **SIGUE patrones** de componentes compuestos de Gluestack

**Recuerda**: Gluestack UI no es una caja negra. Puedes modificar cualquier componente porque está en tu codebase. Sin embargo, es mejor componer y extender antes de modificar código base.

---

_Última actualización: 2026-04-07_
_Versión: 1.0_
_Mantenido por: Equipo Azkali_
