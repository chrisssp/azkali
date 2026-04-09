# Remotion - Motion Screen Recording style

Proyecto base en Remotion para producir un estilo tipo **Screen Studio**:

- suavizado del movimiento del cursor
- zooms automáticos con easing
- padding dinámico sobre fondo estilizado

## Comandos

```bash
npm run dev
```

```bash
npx remotion render ScreenStudioStyle out/screen-studio-style.mp4
```

## Personalizar con tu captura

La composición se llama `ScreenStudioStyle` y está en `src/Composition.tsx`.

Puedes pasar la captura como prop al render:

```bash
npx remotion render ScreenStudioStyle out/prototype.mp4 --props='{"screenshotSrc":"https://example.com/mi-captura.png"}'
```

Para usar una imagen local, colócala en `public/` y pasa una ruta pública (por ejemplo `/screen.png`).

## IA / Integraciones

- MCP de documentación de Remotion: `@remotion/mcp@latest`
- Skills oficiales: `remotion-dev/skills` (incluye `remotion-best-practices`)
- Referencias:
  - https://www.remotion.dev/docs/ai/
  - https://www.remotion.dev/docs/ai/mcp
  - https://www.remotion.dev/docs/ai/skills
