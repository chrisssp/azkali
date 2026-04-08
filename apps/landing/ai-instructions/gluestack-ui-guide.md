# Gluestack UI - Guía de implementación para agentes IA (Next.js)

## Propósito de este documento

Este documento proporciona instrucciones específicas para agentes de IA sobre cómo utilizar **Gluestack UI** como biblioteca de componentes principal para construir la landing page de Azkali. Gluestack UI es una biblioteca universal que funciona tanto en Next.js como en React Native con código consistente.

---

## Filosofía de Gluestack UI

### Copy-paste components

- **No es una dependencia tradicional**: Los componentes se copian y pegan directamente en el proyecto
- **Propiedad total del código**: Modificación completa sin restricciones de vendor lock-in
- **Sin dependencias pesadas**: Solo incluyes lo que necesitas

### Código universal

- **Mismo código para web y mobile**: Funciona en React, Next.js y React Native
- **Consistencia multiplataforma**: Comportamiento idéntico en todas las plataformas
- **Tailwind CSS**: Sistema de estilos unificado

---

## Ubicación de componentes

Los componentes de Gluestack UI están ubicados en:
```
apps/landing/components/ui/
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

## Cómo usar los componentes

### 1. Importación de componentes

```tsx
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { VStack, HStack } from '@/components/ui/vstack';
```

### 2. Componentes compuestos (compound components)

Gluestack UI utiliza un patrón de componentes compuestos para mayor flexibilidad:

```tsx
<Button size="md" className="bg-primary-500">
  <ButtonText className="text-white">
    Click Me
  </ButtonText>
</Button>
```

### 3. Estilos con Tailwind CSS

Todos los componentes aceptan clases de Tailwind CSS a través de la prop `className`:

```tsx
<Box className="p-4 bg-gray-100 rounded-lg">
  <Heading className="text-2xl font-bold text-gray-900">
    Welcome
  </Heading>
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

- **Drawer**: Cajón lateral deslizable
- **Modal**: Modal/Dialog centrado
- **Popover**: Contenido emergente posicionado
- **Toast**: Notificaciones temporales
- **Alert**: Alertas inline
- **AlertDialog**: Diálogo de alerta modal
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
className="p-4 px-6 py-2 m-4 mt-2"

// Colores
className="bg-primary-500 text-white border-gray-300"

// Tipografía
className="text-lg font-bold text-center"

// Layout
className="flex w-full items-center justify-center"

// Bordes y sombras
className="rounded-lg border border-gray-200 shadow-md"

// States responsivos
className="w-full md:w-1/2 lg:w-1/3"
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
<Button disabled />
<Input isInvalid />
<Input readOnly />
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
components/
├── custom/
│   ├── HeroSection.tsx
│   ├── FeatureCard.tsx
│   └── PricingTable.tsx
└── shared/
    ├── LoadingOverlay.tsx
    └── EmptyState.tsx
```

### Ejemplo de componente personalizado

```tsx
// components/custom/FeatureCard.tsx
import { Card } from '@/components/ui/card';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
      <VStack space="md">
        <Box className="text-4xl text-primary-500">
          {icon}
        </Box>
        
        <Heading size="lg" className="text-gray-900">
          {title}
        </Heading>
        
        <Text className="text-gray-600 leading-relaxed">
          {description}
        </Text>
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
import { Button, ButtonProps } from '@/components/ui/button';

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function CustomButton({ isLoading, ...props }: CustomButtonProps) {
  return (
    <Button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${props.className} ${isLoading ? 'opacity-50' : ''}`}
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

### Hero section pattern

```tsx
<Box className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-50 to-primary-100">
  <VStack space="lg" className="max-w-4xl mx-auto px-4 text-center">
    <Heading className="text-5xl font-bold text-gray-900">
      Welcome to Azkali
    </Heading>
    
    <Text className="text-xl text-gray-700 max-w-2xl">
      Revolutionary AI-powered platform for your needs
    </Text>
    
    <HStack space="md" className="justify-center mt-8">
      <Button className="bg-primary-500 px-8 py-3">
        <ButtonText className="font-semibold">Get Started</ButtonText>
      </Button>
      <Button variant="outline" className="px-8 py-3">
        <ButtonText>Learn More</ButtonText>
      </Button>
    </HStack>
  </VStack>
</Box>
```

### Feature grid pattern

```tsx
<Box className="py-16 px-4 bg-white">
  <VStack space="lg" className="max-w-6xl mx-auto">
    <Heading className="text-4xl font-bold text-center text-gray-900">
      Our Features
    </Heading>
    
    <Grid columns={3} gap="4" className="mt-12">
      {features.map((feature) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </Grid>
  </VStack>
</Box>
```

### CTA (Call-to-Action) pattern

```tsx
<Box className="bg-primary-500 py-16 px-4">
  <VStack space="md" className="max-w-2xl mx-auto text-center">
    <Heading className="text-4xl font-bold text-white">
      Ready to get started?
    </Heading>
    
    <Text className="text-lg text-primary-50 mt-2">
      Join thousands of satisfied users today
    </Text>
    
    <Button className="bg-white text-primary-600 mt-8">
      <ButtonText className="font-semibold">Start Free Trial</ButtonText>
    </Button>
  </VStack>
</Box>
```

---

## Next.js específico

### Uso con Server Components

Los componentes de Gluestack UI pueden usarse en Server Components:

```tsx
// app/page.tsx
import { HeroSection } from '@/components/custom/HeroSection';
import { FeatureGrid } from '@/components/custom/FeatureGrid';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeatureGrid />
    </div>
  );
}
```

### Uso con Client Components

Para componentes interactivos, usa `'use client'`:

```tsx
'use client';

import { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onPress={() => setCount(count + 1)}>
      <ButtonText>Clicked {count} times</ButtonText>
    </Button>
  );
}
```

### Metadata y SEO

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Azkali - AI Platform',
  description: 'Revolutionary AI-powered platform',
};
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
  aria-label="Save your changes"
  aria-describedby="save-hint"
>
  <ButtonText>Save</ButtonText>
</Button>

<Text id="save-hint" className="sr-only">
  Saves the form data
</Text>
```

---

## Performance

### Image optimization

Siempre usa `next/image`:

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero section"
  width={1200}
  height={600}
  priority
/>
```

### Lazy loading

Para imágenes no críticas:

```tsx
<Image
  src="/feature.jpg"
  alt="Feature"
  width={400}
  height={300}
  loading="lazy"
/>
```

---

## Best practices para agentes IA

### 1. Priorizar componentes de Gluestack

- **Siempre revisa primero** si existe un componente de Gluestack UI
- **No reinventes la rueda**: Usa los componentes disponibles
- **Compón antes de crear**: Combina componentes existentes

### 2. Naming conventions

```tsx
// ✅ Correcto - componentes personalizados descriptivos
HeroSection, FeatureCard, CTAButton

// ❌ Incorrecto - nombres genéricos que colisionan
Hero, Card, Button
```

### 3. Estructura de archivos

```tsx
// Componente de página
app/page.tsx

// Componente custom compartido
components/custom/HeroSection.tsx

// Gluestack UI components (no modificar ubicación)
components/ui/button/index.tsx
```

### 4. Documentación

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
   - Ubícalo en `components/custom/`
   - Reutiliza componentes base de Gluestack

5. **Valida el resultado**
   - ¿Es responsive?
   - ¿Es accesible?
   - ¿Sigue los patrones del proyecto?

---

## Resumen ejecutivo

**Para agentes IA que generan código para este proyecto:**

1. ✅ **USA componentes de Gluestack UI** de `components/ui/` como primera opción
2. ✅ **COMPÓN componentes** antes de crear nuevos
3. ✅ **ESTILIZA con Tailwind** usando `className`
4. ✅ **CREA custom** solo cuando sea necesario en `components/custom/`
5. ✅ **DOCUMENTA** componentes personalizados
6. ✅ **MANTÉN accesibilidad** usando props ARIA
7. ✅ **SIGUE patrones** de componentes compuestos de Gluestack
8. ✅ **OPTIMIZA imágenes** con `next/image`

**Recuerda**: Gluestack UI no es una caja negra. Puedes modificar cualquier componente porque está en tu codebase. Sin embargo, es mejor componer y extender antes de modificar código base.

---

_Última actualización: 2026-04-07_
_Versión: 1.0_
_Mantenido por: Equipo Azkali_
