# Integración de GlobalHeader y ScreenWrapper

## Pantallas con Integración Completa

### Tabs (ChatScreen, AIChat, RewardsScreen, ClaimTokensScreen)
- ✅ Usan `ScreenWrapper` con prop `header`
- ✅ Usan `GlobalHeader` en modo "tokens" o "settings"
- ✅ Contenido con padding automático 16px lateral + 16px superior

### Settings Screens
- ✅ **SettingsScreen**: Usa `ScreenWrapper + GlobalHeader mode="back"`
- ✅ **PersonalizeScreen**: Usa `ScreenWrapper + GlobalHeader mode="back"`
- ✅ Padding consistente

## Pantallas con Headers Personalizados (NO usar GlobalHeader aquí)

### Auth/Onboarding (Diseño especial con animaciones)
- ❌ LoginScreen - Header animado personalizado
- ❌ RegisterScreen (RegisterLayout) - Header animado + progress bar
- ❌ VerifyScreen - Header animado
- ❌ WelcomeScreen - AnimatedHero component

Estas pantallas tienen diseño específico con morfing de curvas y animaciones que no deben reemplazarse.

## Resumen de Uso

### ✅ Pantallas que SÍ deben usar GlobalHeader + ScreenWrapper
```tsx
<ScreenWrapper header={<GlobalHeader mode="back|settings|tokens" {...props} />}>
  {/* Contenido - COM padding automático */}
</ScreenWrapper>
```

### ❌ Pantallas que NO deben modificarse
- Login, Register, Verify (tienen animaciones personalizadas)
- Welcome (tiene AnimatedHero)
- Chat (usa GlobalHeader pero OK así)

## Beneficios Implementados
✅ Estandarización de padding (16px lateral, 16px top)
✅ Separación clara: header sin padding, contenido con padding
✅ Headers con ancho completo
✅ Código limpio y mantenible
