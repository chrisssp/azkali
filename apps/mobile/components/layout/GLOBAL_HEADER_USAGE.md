# GlobalHeader - Header Component Global

## Propósito
`GlobalHeader` es un componente global reutilizable que proporciona un encabezado consistente para toda la aplicación móvil con múltiples modos según el contexto de la pantalla. Incluye tanto headers estáticos como animados con morph de curva.

## Ubicación
`/components/layout/GlobalHeader.tsx`

## Modos Disponibles

### 1. Modo `'tokens'` - Tokens + Configuración
Muestra:
- Icono de monedas con cantidad de tokens a la **izquierda**
- Icono de configuración a la **derecha**
- Sin texto en medio

```
┌──────────────────────────────────────────────┐
│ 💰 250                           ⚙️           │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<GlobalHeader mode="tokens" tokens={250} />
```

**Pantallas:**
- Chat (ChatScreen.tsx)
- AIChat screen

---

### 2. Modo `'settings'` - Tokens + Configuración (idéntico a 'tokens')
Comportamiento idéntico al modo 'tokens'. Útil cuando la lógica requiere un nombre de modo diferente.

```
┌──────────────────────────────────────────────┐
│ 💰 250                           ⚙️           │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<GlobalHeader mode="settings" tokens={250} />
```

**Pantallas:**
- Recompensas (RewardsScreen.tsx)
- Claim Tokens (ClaimTokensScreen.tsx)

---

### 3. Modo `'back'` - Volver + Nombre
Muestra:
- Icono de volver a la **izquierda** en botón redondo
- Nombre de la sección como texto
- Subtítulo opcional

```
┌──────────────────────────────────────────────┐
│ ⬅️  Configuración                            │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<GlobalHeader 
  mode="back" 
  title="Configuración"
  onBackPress={() => router.back()}
/>
```

**Pantallas:**
- Configuración (SettingsScreen.tsx)
- Personalización (PersonalizeScreen.tsx)
- Pantallas secundarias

---

### 4. Modo `'animated-login'` - Header Animado (LoginScreen)
Header con animación de morph desde curva grande a header plano.

**Animación:**
- Comienza con altura 48% de pantalla con curva profunda
- Anima hacia altura 90px con curva 0
- Contenido aparece con delay y fade-in

**Apariencia final (igual a modo 'back'):**
```
┌──────────────────────────────────────────────┐
│ ⬅️  Iniciar sesión                           │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<ScreenWrapper header={<GlobalHeader mode="animated-login" onBackPress={handleBack} />}>
  {/* content */}
</ScreenWrapper>
```

**Pantallas:**
- LoginScreen.tsx

---

### 5. Modo `'animated-register'` - Header Animado (RegisterLayout)
Header con animación de morph, similar a `animated-login`.

**Apariencia final:**
```
┌──────────────────────────────────────────────┐
│ ⬅️  Crear cuenta (o titulo dinámico)        │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<ScreenWrapper header={<GlobalHeader mode="animated-register" title={stepTitle} onBackPress={handleBack} />}>
  {/* content */}
</ScreenWrapper>
```

**Pantallas:**
- RegisterLayout.tsx (multi-step registration)

---

### 6. Modo `'animated-verify'` - Header Animado (VerifyScreen)
Header con animación de morph para pantalla de verificación de código.

**Apariencia final:**
```
┌──────────────────────────────────────────────┐
│ ⬅️  Verificar código                         │
└──────────────────────────────────────────────┘
```

**Uso:**
```tsx
<ScreenWrapper header={<GlobalHeader mode="animated-verify" onBackPress={handleBack} />}>
  {/* content */}
</ScreenWrapper>
```

**Pantallas:**
- VerifyScreen.tsx

---

## Props

```typescript
interface GlobalHeaderProps {
  mode?: HeaderMode;                          // 'tokens' | 'settings' | 'back' | 'animated-*'
  title?: string;                             // Titulo (modos 'back' y 'animated-*')
  subtitle?: string;                          // Subtítulo opcional (modo 'back')
  tokens?: number;                            // Cantidad de tokens (modos 'tokens'/'settings')
  onSettingsPress?: () => void;               // Callback para ícono de configuración
  onBackPress?: () => void;                   // Callback para botón de volver
}
```

---

## Características

### Headers Estáticos
- **Modo 'tokens'/'settings'**: Minimalista con solo iconos
- **Modo 'back'**: Título + botón de volver
- Altura fija: `pt-14 pb-5`
- Padding: `px-6`

### Headers Animados
- Animación suave desde altura grande a altura final 90px
- Curva que se aplana durante la animación
- Contenido aparece con fade-in delay
- **Apariencia final idéntica al modo 'back'** cuando termina la animación
- Usa `ScreenWrapper` para separar header de contenido

---

## Reemplazo de Componentes Anteriores

- ✅ `ChatHeader` - Eliminado, reemplazado por `GlobalHeader`
- ✅ `SettingsHeader` - Eliminado, reemplazado por `GlobalHeader`
- ✅ `AnimatedLoginHeader` - Eliminado, ahora es modo dentro de `GlobalHeader`
- ✅ `AnimatedRegisterHeader` - Eliminado, ahora es modo dentro de `GlobalHeader`
- ✅ `AnimatedVerifyHeader` - Eliminado, ahora es modo dentro de `GlobalHeader`

## Importación

```tsx
import { GlobalHeader, ScreenWrapper } from '@/components/layout';

// Para headers estáticos
<GlobalHeader mode="back" title="Configuración" />

// Para headers animados
<ScreenWrapper header={<GlobalHeader mode="animated-login" onBackPress={handleBack} />}>
  {/* content */}
</ScreenWrapper>
```

## Estilos

### Colors
- Fondo: `bg-primary-700` (#006341)
- Border: `border-primary-800`
- Icono volver: Botón redondo con `bg-primary-800`
- Texto: `text-white` (bold para título)

### Diseño
- Minimalista y consistente
- Headers animados siguen mismo visual que estáticos
- Sin duplicación de headers entre ScreenWrapper y content
