# GlobalHeader - Header Component Global

## Propósito
`GlobalHeader` es un componente global reutilizable que proporciona un encabezado consistente para toda la aplicación móvil. Ofrece tres modos diferentes según el contexto de la pantalla.

## Ubicación
`/components/layout/GlobalHeader.tsx`

## Modos Disponibles

### 1. Modo `'tokens'` - Tokens + Configuración
Muestra:
- Icono de monedas con cantidad de tokens a la **izquierda**
- Icono de configuración a la **derecha**
- Sin texto en medio

```
┌──────────────────────────────────────────┐
│ 💰 250                           ⚙️       │
└──────────────────────────────────────────┘
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
┌──────────────────────────────────────────┐
│ 💰 250                           ⚙️       │
└──────────────────────────────────────────┘
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
┌──────────────────────────────────────────┐
│ ⬅️  Configuración                        │
└──────────────────────────────────────────┘
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
- Autenticación: Login, Register, Verify

---

## Props

```typescript
interface GlobalHeaderProps {
  mode?: 'tokens' | 'settings' | 'back';    // Default: 'settings'
  title?: string;                           // Titulo (modo 'back')
  subtitle?: string;                        // Subtítulo opcional (modo 'back')
  tokens?: number;                          // Cantidad de tokens (modos 'tokens'/'settings')
  onSettingsPress?: () => void;             // Callback para ícono de configuración
  onBackPress?: () => void;                 // Callback para botón de volver
}
```

---

## Reemplazo de Componentes Anteriores

- ✅ `ChatHeader` - Eliminado, reemplazado por `GlobalHeader`
- ✅ `SettingsHeader` - Eliminado, reemplazado por `GlobalHeader`

## Importación

```tsx
import { GlobalHeader, ScreenWrapper } from '@/components/layout';

// Para headers estáticos
<GlobalHeader mode="back" title="Configuración" />
<GlobalHeader mode="tokens" tokens={250} />

// Con ScreenWrapper
<ScreenWrapper header={<GlobalHeader mode="back" title="Configuración" />}>
  {/* content */}
</ScreenWrapper>
```

## Estilos

### Colors
- Fondo: `bg-primary-700` (#006341)
- Border: `border-primary-800`
- Icono volver: Botón redondo con `bg-primary-800`
- Texto: `text-white` (bold para título)

### Tamaño
- Altura: `pt-14 pb-5` (aprox. 76px con contenido)
- Padding horizontal: `px-6`

### Diseño
- Minimalista y consistente
- Sin duplicación de headers entre ScreenWrapper y content
