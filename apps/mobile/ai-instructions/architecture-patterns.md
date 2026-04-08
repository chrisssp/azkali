# Patrones de arquitectura - Guía para agentes IA

## Propósito de este documento

Este documento describe la arquitectura del proyecto mobile de Azkali. Utilizamos una **arquitectura vertical basada en features** que organiza el código por funcionalidades/dominios en lugar de por tipos de archivo. Esta guía ayuda a agentes IA a mantener coherencia arquitectónica al generar nuevas features.

---

## Arquitectura vertical basada en features

### ¿Qué es una arquitectura basada en features?

Es un enfoque donde el código se organiza por **características de negocio** en lugar de por capas técnicas. Cada feature es autónoma y contiene todo lo necesario para funcionar: componentes, lógica, tipos, hooks, API, etc.

### Ventajas

- ✅ **Escalabilidad**: Fácil agregar nuevas features sin afectar existentes
- ✅ **Mantenibilidad**: Cambios localizados a su feature
- ✅ **Reutilización**: Features como módulos independientes
- ✅ **Claridad**: Estructura refleja la lógica del negocio
- ✅ **Paralelismo**: Múltiples equipos trabajan sin conflictos

---

## Estructura de directorios

### Estructura general

```
apps/mobile/
├── src/
│   ├── features/                    # Features de negocio
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── dashboard/
│   │   └── notifications/
│   ├── shared/                      # Código compartido (utilidades, hooks)
│   ├── config/                      # Configuración global
│   ├── store/                       # Estado global (Zustand)
│   └── utils/                       # Utilidades generales
├── components/
│   ├── ui/                          # Componentes Gluestack UI
│   └── shared/                      # Componentes compartidos
├── app/                             # Routing de Expo Router
├── assets/                          # Recursos estáticos
└── ai-instructions/                 # Este archivo (para agentes IA)
```

### Estructura de una feature

```
src/features/[feature-name]/
├── api.ts                           # Llamadas API específicas
├── hooks.ts                         # Custom hooks del feature
├── types.ts                         # TypeScript interfaces/types
├── components/
│   ├── [ComponentName].tsx
│   ├── [ComponentName].styles.ts    # Si necesita estilos complejos
│   └── index.ts                     # Barrel export
├── screens/
│   ├── [ScreenName].tsx
│   └── index.ts                     # Barrel export
├── store.ts                         # Estado local (Zustand) si aplica
└── index.ts                         # Barrel export principal
```

### Ejemplo completo: Feature Auth

```
src/features/auth/
├── api.ts                           # login(), logout(), signup(), etc.
├── hooks.ts                         # useLogin(), useAuthStatus(), etc.
├── types.ts                         # User, AuthState, LoginCredentials
├── components/
│   ├── LoginForm.tsx                # Componente del formulario
│   ├── LoginButton.tsx              # Botón reutilizable
│   └── index.ts                     # export { LoginForm, LoginButton }
├── screens/
│   ├── LoginScreen.tsx              # Pantalla completa
│   ├── SignupScreen.tsx
│   └── index.ts                     # export { LoginScreen, SignupScreen }
├── store.ts                         # Zustand store para auth state
└── index.ts                         # export principal
```

---

## Patrones clave

### 1. API Integration

**Ubicación**: `src/features/[feature]/api.ts`

**Patrón**:

```typescript
// src/features/auth/api.ts
import { supabase } from '@/config/supabase';

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw new Error(error.message);
  return data;
}

export async function signup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
```

**Reglas**:
- Una función por operación API
- Manejo de errores explícito
- Retorno tipado con TypeScript
- Importar desde `@/config/supabase`

### 2. Custom Hooks

**Ubicación**: `src/features/[feature]/hooks.ts`

**Patrón**:

```typescript
// src/features/auth/hooks.ts
import { useState } from 'react';
import { useAuthStore } from './store';
import * as authAPI from './api';
import { LoginCredentials } from './types';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authAPI.login(credentials.email, credentials.password);
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export function useAuthStatus() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;
  
  return { user, isAuthenticated };
}
```

**Reglas**:
- Encapsular lógica de estado y side effects
- Nombrar con `use` prefix
- Retornar estado y funciones necesarias
- Integrar con el store global

### 3. State Management (Zustand)

**Ubicación**: `src/features/[feature]/store.ts` (para estado de feature)
**Ubicación alternativa**: `src/store/` (para estado global)

**Patrón**:

```typescript
// src/features/auth/store.ts
import { create } from 'zustand';
import type { User } from './types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  clear: () => set({ user: null, isLoading: false }),
}));
```

**Reglas**:
- Zustand para estado persistente
- Una store por feature que necesite estado complejo
- Store local si es muy específica
- Store global si se comparte entre features

### 4. Tipos TypeScript

**Ubicación**: `src/features/[feature]/types.ts`

**Patrón**:

```typescript
// src/features/auth/types.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  code: string;
  message: string;
}
```

**Reglas**:
- Todas las interfaces en `types.ts`
- Nombres singulares para tipos
- Documentar con JSDoc si es complejo
- Reutilizar tipos entre features cuando sea posible

### 5. Componentes

**Ubicación**: `src/features/[feature]/components/`

**Patrón**:

```typescript
// src/features/auth/components/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import {
  Input,
  InputField,
} from '@/components/ui/input';
import {
  Button,
  ButtonText,
} from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { FormControl } from '@/components/ui/form-control';
import { useLogin } from '../hooks';
import type { LoginCredentials } from '../types';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();

  const handleSubmit = async () => {
    try {
      const credentials: LoginCredentials = { email, password };
      await login(credentials);
      onLoginSuccess?.();
    } catch (err) {
      // Error manejado en el hook
    }
  };

  return (
    <VStack space="md" className="w-full">
      <FormControl isInvalid={!!error}>
        <FormControl.Label>
          <FormControl.Label.Text>Email</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <InputField
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />
        </Input>
        {error && (
          <FormControl.Error>
            <FormControl.Error.Text>{error}</FormControl.Error.Text>
          </FormControl.Error>
        )}
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <FormControl.Label.Text>Password</FormControl.Label.Text>
        </FormControl.Label>
        <Input>
          <InputField
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            type="password"
            editable={!loading}
          />
        </Input>
      </FormControl>

      <Button
        onPress={handleSubmit}
        disabled={!email || !password || loading}
        className="mt-4"
      >
        <ButtonText>{loading ? 'Logging in...' : 'Login'}</ButtonText>
      </Button>
    </VStack>
  );
}
```

**Reglas**:
- Un componente por archivo
- Componentes pequeños y reutilizables
- Props bien tipadas
- Usar Gluestack UI como base
- Comentar lógica compleja

### 6. Screens (Pantallas completas)

**Ubicación**: `src/features/[feature]/screens/`

**Patrón**:

```typescript
// src/features/auth/screens/LoginScreen.tsx
'use client';

import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { LoginForm } from '../components/LoginForm';

export function LoginScreen() {
  const handleLoginSuccess = () => {
    // Navegar a la siguiente pantalla
    // router.push('/(tabs)/dashboard');
  };

  return (
    <Box className="flex-1 bg-white">
      <VStack
        space="lg"
        className="flex-1 justify-center p-6"
      >
        <Heading size="2xl" className="text-center mb-8">
          Welcome Back
        </Heading>

        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </VStack>
    </Box>
  );
}
```

**Reglas**:
- Screens componen componentes más pequeños
- Manejan navegación
- Integran múltiples features si es necesario
- Una screen por ruta

### 7. Barrel Exports

**Patrón**:

```typescript
// src/features/auth/index.ts
export { LoginScreen, SignupScreen } from './screens';
export { LoginForm, LoginButton } from './components';
export { useLogin, useAuthStatus } from './hooks';
export type { User, LoginCredentials, AuthResponse } from './types';
export { useAuthStore } from './store';
```

**Beneficios**:
- Imports limpios: `import { LoginScreen } from '@/features/auth'`
- Control de qué exporta cada feature
- Fácil refactorizar internamente

---

## Patrones de comunicación entre features

### Feature sin dependencias

```typescript
// auth feature - completamente independiente
src/features/auth/
```

### Feature que depende de otra

```typescript
// profile feature depende de auth (necesita usuario)
src/features/profile/

// En profile/hooks.ts
import { useAuthStatus } from '@/features/auth';

export function useProfile() {
  const { user } = useAuthStatus();
  // ... usar user
}
```

**Reglas**:
- Importar desde barrel exports
- Nunca importar internals de otra feature
- Máximo 2-3 niveles de dependencia
- Evitar dependencias circulares

---

## Estructura de carpetas compartidas

### `src/shared/`

```
src/shared/
├── hooks/                          # Hooks genéricos
│   ├── useAsync.ts
│   ├── useDebounce.ts
│   └── index.ts
├── context/                        # Context API si es necesario
│   ├── ThemeContext.tsx
│   └── index.ts
└── index.ts
```

### `components/shared/`

```
components/shared/
├── ErrorBoundary.tsx              # Para manejo de errores
├── LoadingOverlay.tsx             # Overlay de carga global
├── EmptyState.tsx                 # Estado vacío genérico
└── index.ts
```

### `src/config/`

```
src/config/
├── supabase.ts                    # Cliente Supabase
├── constants.ts                   # Constantes de la app
└── env.ts                         # Variables de entorno tipadas
```

---

## Flujo de datos

```
┌─────────────────────────────────────┐
│         Screen/Component             │
│  (ui/features/[feature]/screens)    │
└────────────┬────────────────────────┘
             │ usa
             ▼
┌─────────────────────────────────────┐
│      Custom Hooks                   │
│  (features/[feature]/hooks.ts)      │
└────────────┬────────────────────────┘
             │ llama
             ▼
┌─────────────────────────────────────┐
│      API Functions                  │
│  (features/[feature]/api.ts)        │
└────────────┬────────────────────────┘
             │ fetches
             ▼
┌─────────────────────────────────────┐
│      External Services              │
│  (Supabase, etc.)                   │
└─────────────────────────────────────┘

Estado:
┌─────────────────────────────────────┐
│      Zustand Store                  │
│  (features/[feature]/store.ts o     │
│   src/store/)                       │
└─────────────────────────────────────┘
                │
                ▼
        Accedido por Hooks
        y Componentes
```

---

## Convenciones de naming

### Carpetas

```
✅ features/auth
✅ components/LoginForm
✅ hooks/useLogin
❌ features/authentication
❌ components/LoginFormComponent
❌ hooks/LoginHook
```

### Archivos

```
✅ LoginForm.tsx (componentes)
✅ api.ts (API calls)
✅ hooks.ts (custom hooks)
✅ types.ts (tipos)
✅ store.ts (Zustand stores)
❌ LoginForm.component.tsx
❌ auth.api.ts
❌ auth.hooks.ts
```

### Variables y funciones

```
✅ const user = ...
✅ function handleSubmit() {}
✅ const useLogin = () => {}
✅ interface User {}
✅ type AuthState = {}
❌ const userData = ...
❌ function onClickSubmit() {}
❌ const AuthLogin = () => {}
```

---

## Best practices para agentes IA

### 1. Al crear una nueva feature

```
✅ Crear estructura completa:
  - api.ts
  - hooks.ts
  - types.ts
  - components/
  - screens/
  - store.ts (si es necesario)
  - index.ts (barrel export)

❌ No crear un archivo suelto
❌ No mezclar features
```

### 2. Al agregar componentes

```
✅ Verificar si el componente es:
  - Específico de la feature → features/[feature]/components/
  - Compartido entre features → components/shared/

✅ Usar tipos importados de features/[feature]/types.ts

❌ No poner lógica de negocio en componentes
❌ No hacer imports circulares
```

### 3. Al manejar estado

```
✅ Estado local del componente → useState
✅ Estado compartido en la feature → feature/store.ts
✅ Estado global de la app → src/store/
❌ Props drilling profundo
❌ Context para estado simple
```

### 4. Al integrar con APIs

```
✅ Todas las llamadas en api.ts
✅ Manejo de errores explícito
✅ Retornos tipados

❌ Llamadas directas en hooks
❌ Manejo de errores genérico
```

### 5. Al importar

```
✅ Importar desde barrel exports:
   import { LoginForm } from '@/features/auth'

✅ Importar de config:
   import { supabase } from '@/config/supabase'

❌ Importar detalles internos:
   import { LoginForm } from '@/features/auth/components/LoginForm'

❌ Importes relativos largos:
   import { ... } from '../../../features/auth'
```

---

## Ejemplo completo: Feature Dashboard

### Estructura

```
src/features/dashboard/
├── api.ts
├── hooks.ts
├── types.ts
├── store.ts
├── components/
│   ├── DashboardCard.tsx
│   ├── StatBox.tsx
│   └── index.ts
├── screens/
│   ├── DashboardScreen.tsx
│   └── index.ts
└── index.ts
```

### Implementación

```typescript
// src/features/dashboard/types.ts
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: Activity[];
}
```

```typescript
// src/features/dashboard/api.ts
import { supabase } from '@/config/supabase';
import type { DashboardData } from './types';

export async function fetchDashboardData(): Promise<DashboardData> {
  const { data, error } = await supabase
    .from('dashboard')
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data;
}
```

```typescript
// src/features/dashboard/hooks.ts
import { useEffect, useState } from 'react';
import { useDashboardStore } from './store';
import * as dashboardAPI from './api';

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const data = useDashboardStore((state) => state.data);
  const setData = useDashboardStore((state) => state.setData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await dashboardAPI.fetchDashboardData();
        setData(dashboardData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setData]);

  return { data, loading };
}
```

```typescript
// src/features/dashboard/components/StatBox.tsx
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatBox({ label, value, icon }: StatBoxProps) {
  return (
    <Card className="p-4 flex-1">
      <VStack space="sm">
        {icon && <Box className="text-2xl">{icon}</Box>}
        <Text className="text-gray-600">{label}</Text>
        <Heading size="lg" className="text-gray-900">
          {value}
        </Heading>
      </VStack>
    </Card>
  );
}
```

```typescript
// src/features/dashboard/screens/DashboardScreen.tsx
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { useDashboard } from '../hooks';
import { StatBox } from '../components/StatBox';

export function DashboardScreen() {
  const { data, loading } = useDashboard();

  if (loading) return <LoadingSpinner />;
  if (!data) return <EmptyState />;

  return (
    <Box className="flex-1 bg-gray-50 p-4">
      <VStack space="lg">
        <HStack space="md">
          <StatBox label="Users" value={data.stats.totalUsers} />
          <StatBox label="Active" value={data.stats.activeUsers} />
        </HStack>
        <HStack space="md">
          <StatBox label="Revenue" value={`$${data.stats.revenue}`} />
          <StatBox label="Growth" value={`${data.stats.growth}%`} />
        </HStack>
      </VStack>
    </Box>
  );
}
```

---

## Checklist para crear una nueva feature

Cuando crees una nueva feature, verifica:

- ✅ Carpeta `src/features/[nombre-feature]/` creada
- ✅ `types.ts` con interfaces bien definidas
- ✅ `api.ts` con funciones de API
- ✅ `hooks.ts` con custom hooks
- ✅ `store.ts` con Zustand (si necesita estado persistente)
- ✅ `components/` con componentes reutilizables
- ✅ `screens/` con pantalla principal
- ✅ `index.ts` con barrel exports
- ✅ Imports tipados y claros
- ✅ Manejo de errores
- ✅ Documentación de funciones complejas

---

## Resumen ejecutivo

**Estructura vertical basada en features:**

1. ✅ **Una carpeta por feature de negocio**
2. ✅ **Contiene: api, hooks, types, componentes, screens**
3. ✅ **Comunicación a través de barrel exports**
4. ✅ **Estado con Zustand (local o global)**
5. ✅ **Componentes con Gluestack UI**
6. ✅ **Tipos TypeScript en todo**
7. ✅ **API calls centralizadas en api.ts**
8. ✅ **Features independientes, máximo 2-3 dependencias**

**Esto permite:**
- 🚀 Escalabilidad sin acoplamiento
- 🔍 Fácil ubicación de código
- ♻️ Reutilización clara
- 🤝 Trabajo paralelo sin conflictos
- 📚 Documentación autoexplicativa

---

_Última actualización: 2026-04-07_
_Versión: 1.0_
_Mantenido por: Equipo Azkali_
