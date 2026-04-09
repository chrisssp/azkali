# Kali — LLM e integración con Gemini

## Arquitectura del LLM

Kali es la asesora financiera virtual de Azkali. El chat está implementado en `apps/mobile` y se comunica directamente con la API de Google Gemini desde el cliente (React Native / Expo).

```
Usuario
  │
  ▼
AIChat.tsx            ← pantalla principal del chat
  │
  ▼
useKaliChat.ts        ← hook central: estado, historial, envío
  │
  ├── buildKaliBaseSystemPrompt()   ← construye el system prompt personalizado
  │
  └── GoogleGenerativeAI (SDK)      ← llama a la API de Gemini
```

### Modelo usado

| Variable | Valor por defecto |
|---|---|
| `EXPO_PUBLIC_GEMINI_MODEL` | `gemini-2.5-flash-lite` |

Se puede sobreescribir en `.env` para usar otro modelo (e.g. `gemini-1.5-pro`).

### System prompt

El system prompt se construye dinámicamente en `constants/kaliPrompts.ts` con el contexto del usuario:

```ts
buildKaliBaseSystemPrompt({
  name: "Juan",
  monthlyIncome: 8000,
  accountType: "cuenta habitual",
  currentBalance: 1200,
  financialGoal: "ahorrar para un viaje"
})
```

Esto hace que Kali responda con el nombre real del usuario y sus datos financieros. Por ahora `monthlyIncome` y `currentBalance` vienen hardcodeados en `AIChat.tsx` — son candidatos a conectarse a Supabase.

### Atajos (shortcuts)

Los 4 atajos que aparecen en la pantalla de chat cuando el historial está vacío:

| ID | Shortcut | Qué hace |
|---|---|---|
| 1 | `reminder` | Inyecta mensaje de apertura de Kali + hint al system para el siguiente turno |
| 2 | `document` | Abre galería, convierte imagen a base64 y la manda a Gemini con vision |
| 3 | `followup` | Inyecta apertura de seguimiento de metas |
| 4 | `report` | Inyecta apertura de reporte financiero |

Los atajos 1, 3 y 4 no llaman a Gemini de inmediato — solo inyectan el mensaje de apertura de Kali en el chat y guardan un `pendingSystemHint`. Ese hint se adjunta al system prompt en el **siguiente** turno del usuario, para que Gemini tenga contexto del flujo activo.

El atajo 2 (documento) sí llama a Gemini directamente con `inlineData` (imagen en base64).

---

## Testing en Expo Go (móvil físico)

### Requisitos previos

- Node.js >= 18
- pnpm instalado globalmente
- App **Expo Go** instalada en tu telefono (iOS o Android)
- API Key de Gemini

### 1. Configura las variables de entorno

```bash
cd apps/mobile
cp .env.example .env
```

Edita `.env` y agrega:

```env
# Supabase local
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<tu-anon-key>

# Gemini
EXPO_PUBLIC_GEMINI_API_KEY=<tu-api-key-de-google-ai-studio>

# Opcional: cambiar modelo
# EXPO_PUBLIC_GEMINI_MODEL=gemini-1.5-pro
```

> La API Key la obtienes en [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Instala dependencias

```bash
# desde la raiz del monorepo
pnpm install
```

### 3. Levanta el servidor de desarrollo

```bash
cd apps/mobile
pnpm expo start
```

Expo imprime un QR en la terminal.

### 4. Conéctate desde tu teléfono

- **Android**: abre Expo Go → escanea el QR
- **iOS**: abre la cámara → escanea el QR → abre en Expo Go

> Tu teléfono y computadora deben estar en la **misma red WiFi**.

### 5. Qué probar en el chat

Una vez dentro de la app, navega a la pestaña **Chat**:

#### Chat libre
Escribe cualquier mensaje. Kali responderá usando tu nombre de usuario.

Ejemplos de preguntas para validar el comportamiento:
```
¿Cómo puedo ahorrar 500 pesos al mes?
Gasté todo mi sueldo, ¿qué hago?
¿Qué es un fondo de emergencia?
```

#### Atajo 1 — Recordatorio
Toca el botón de recordatorio. Kali pregunta qué quieres recordar.
Escribe algo como:
```
Revisar mi saldo cada viernes
```
Kali debería confirmar el recordatorio de forma motivacional.

#### Atajo 2 — Documento
Toca el botón de documento. Se abre la galería.
Selecciona una imagen de estado de cuenta, ticket o factura.
Kali analiza la imagen y explica los cargos en lenguaje simple.

#### Atajo 3 — Seguimiento
Toca el botón de seguimiento. Kali pregunta sobre qué hacer seguimiento.
Escribe:
```
Quiero dejar de gastar en delivery
```
Kali debería generar un plan simple con frecuencia y primera acción.

#### Atajo 4 — Reporte
Toca el botón de reporte. Kali pide ingresos y gastos del mes.
Escribe:
```
Gané 9000 pesos y creo que gasté más en comida y transporte
```
Kali genera un reporte estructurado con resumen, alerta y recomendación.

### Logs de debugging

El hook loguea todo en la consola de Expo. Los puedes ver en la terminal donde corre `pnpm expo start` o en la pantalla de Expo Go:

```
[KaliChat] listo | modelo=gemini-2.5-flash-lite | apiKey=AIzaSy…key | user=Juan
[KaliChat] enviando texto | historial=3 | hint=no | "¿Cómo ahorro?"
[KaliChat] respuesta OK | chars=342 | preview="¡Qué onda Juan! Para ahorrar..."
```

Si ves `falta EXPO_PUBLIC_GEMINI_API_KEY` significa que el `.env` no está configurado correctamente.

---

## Archivos clave

| Archivo | Responsabilidad |
|---|---|
| `hooks/useKaliChat.ts` | Hook principal: estado, historial, envío, atajos |
| `constants/kaliPrompts.ts` | Todos los prompts y system instructions |
| `src/features/chat/screens/AIChat.tsx` | Pantalla del chat, conecta UI con el hook |
| `utils/imageToBase64.ts` | Convierte imagen de galería a formato `inlineData` para Gemini |
| `apps/mobile/.env` | Variables de entorno (no se commitea) |
