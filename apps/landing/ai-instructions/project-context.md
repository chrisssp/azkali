# contexto del proyecto azkali

## visión general

Azkali es una plataforma de educación financiera conductual diseñada para la Generación Z mexicana. Bajo el lema **"Frena el impulso. Acelera tu futuro"**, utiliza fricción cognitiva just-in-time para interceptar decisiones de gasto impulsivo, romper la "ilusión de liquidez" y construir hábitos de ahorro sostenibles.

La solución fue desarrollada como propuesta para el Talent Hackathon 2026 (Track: Grupo Salinas Banco Azteca) por el equipo VibeCoders, con el objetivo de resolver dos dolores principales:

1. **Mateo (comprador compulsivo)**: Joven de 21 años, universitario, impulsivo con tarjeta de crédito. Prioriza gratificación instantánea sobre visibilidad financiera. Sufre el "sesgo del presente" y endeudamiento de corto plazo.

2. **Abigail (joven invisible)**: Freelancer de 22 años, disciplinada pero rechazada por el sistema bancario formal por falta de comprobantes tradicionales. Invisible para el buró de crédito, vulnerable ante prestamistas informales.

---

## stack tecnológico

### landing: next.js + react server components

- Optimización nativa: `next/image`, metadata SEO, streaming SSR
- Componentes: **Gluestack UI** adaptados para web + personalizados si es necesario
- Estilos: Tailwind CSS + NativeWind
- Tipado: TypeScript end-to-end
- Gestión de estado: React hooks + Context API (no Zustand, es mobile-first)
- Renderizado: Server Components por defecto, Client Components solo donde sea necesario

### backend (shared): supabase + postgresql

- BaaS con APIs RESTful/GraphQL autogeneradas
- Autenticación segura vía JWT (Supabase Auth)
- Control de acceso: Row Level Security (RLS)
- Persistencia: PostgreSQL (transacciones ACID, grado empresarial)
- Futuro: Migración plug-and-play a infraestructura de Grupo Salinas

### microservicio ia: python + fastapi

- Aislamiento de lógica cognitiva vs. transaccional
- Integración con LLMs (OpenAI/Claude) vía API
- System Prompting + inyección de contexto financiero
- Salidas estructuradas en JSON Mode
- Fallback: Árbol de decisiones determinístico local (cero latencia)

---

## propósito de la landing

El landing de Azkali cumple múltiples roles en la estrategia post-hackathon:

1. **Marketing & Onboarding**: Explica el problema, solución y diferenciador a prospects
2. **Educación conductual**: Introduce conceptos (sesgo del presente, ilusión de liquidez)
3. **Call-to-Action**: Descarga de app mobile, registro de early access, newsletter
4. **Showcase técnico**: Demuestra viabilidad y escalabilidad a stakeholders técnicos
5. **Dashboard público (futuro)**: Estadísticas de impacto, testimonios, métricas de usuarios

### secciones del landing (recomendadas)

- **Hero**: Valor único, CTA principal (descargar app)
- **Problema**: El sesgo del presente y la ilusión de liquidez (Gen Z relatable)
- **Solución**: La Nevera, rachas, recompensas (con animaciones)
- **Funcionalidades**: MVP vs. Roadmap (clara distinción)
- **Testimonios/Impacto**: Casos de Mateo y Abigail
- **Integración con Banco Azteca**: Ventajas de estar en el ecosistema
- **Pricing/Acceso**: Freemium o gratis (aún no definido)
- **FAQ**: Preguntas sobre seguridad, datos, privacidad
- **CTA final**: Registrarse para early access

---

## funcionalidades por fase

### fase 1: mvp (implementado en 72h hackathon)

**[REAL - Completamente funcional en app mobile; landing muestra conceptos]**

#### 1. análisis de compras & "la nevera"

El núcleo de fricción cognitiva del sistema.

**Flujo en app mobile:**

1. Usuario intenta compra impulsiva (ej. tenis $2,799 MXN)
2. Intercepta antes del checkout → Módulo "Vamos a atar cabos"
3. IA genera 3 preguntas reflexivas personalizadas (micro-chat)
4. Veredicto visual: % impulsividad (ej. "89% Impulsiva")
5. Traducción a métricas de vida diaria (87 horas trabajadas, 1 año de recibos de luz)
6. Opciones:
   - **Congelar impulso**: Envía compra a "Tu nevera" x 24h → Convierte en meta de ahorro
   - **Proceder**: El capital se redirige al ahorro si supera tentación

**Representación en landing:**

- Mockups interactivos (video o carousel animado)
- Explicación del impacto psicológico
- CTA: "Prueba el análisis en la app"

---

#### 2. finanzas sociales & rachas individuales/colaborativas

Retención mediante presión social positiva.

**Flujo en app mobile:**

- Retos personales o grupales con metas de ahorro
- Leaderboard basado en disciplina (días), no dinero
- Notificaciones motivacionales
- Insignias y medallas por hitos

**Representación en landing:**

- Explica el poder de la comunidad en educación financiera
- Mockup de leaderboard colaborativo
- Historia de caso: "Abigail y sus amigas ahorraron para viaje"

---

#### 3. ecosistema de recompensas (grupo salinas)

Motor de fidelización mediante tokens.

**Flujo en app mobile:**

- Mantener rachas = Tokens de Resiliencia
- Canje en Marketplace (café, descuentos, streaming)
- Mockup para MVP (canje real post-hackathon)

**Representación en landing:**

- Explica cómo la disciplina se convierte en poder adquisitivo
- Logos de socios (Elektra, Italika, Totalplay, etc.)
- Tabla de ejemplo: "30 días racha = X tokens = Café gratis"

---

#### 4. agente kali (mascota ia conductual)

Copiloto empático y objetivo.

**En app mobile:**

- Respuestas reflexivas al análisis de compras
- Mensajes motivacionales
- Notificaciones conductuales

**En landing:**

- Presentación de la mascota
- Video: "Un día en la vida de Kali"
- Muestra de diálogos ejemplo

---

### fase 2: roadmap post-mvp (futuro, simulado en landing)

**[FUTURO - No implementado en 72h, se comunica en landing como roadmap]**

#### 1. mapa de nodos & máquina del tiempo

Sustitución del estado de cuenta tradicional.

**Visión:**

- Lienzo de grafos: Deudas vs. ahorro como nodos conectados
- Slider temporal: Mueve el tiempo → visualiza crecimiento interés compuesto
- Impacto visual: "En 12 meses: $2,799 → $4,200"

**En landing:**

- Animación conceptual (no funcional)
- Explicación: "Visualiza el futuro de tus finanzas"
- Roadmap: "Disponible en Q3 2026"

---

#### 2. inclusión financiera: score de confianza & microcrédito

Conversión de disciplina en acceso crediticio formal.

**Visión:**

- Meses de disciplina → Score de Confianza
- Usuarios "invisibles" desbloquean microcrédito formal

**En landing:**

- Explica el problema de exclusión (Abigail case study)
- Muestra cómo Azkali abre puertas
- Destacar partnership con Banco Azteca

---

### Row Level Security (RLS)

Cada usuario ve **solo su propia información**:

- Políticas de SELECT: `auth.uid() = usuario_id`
- Políticas de UPDATE: `auth.uid() = usuario_id`

---

## guía para agentes ia en landing

### qué implementar en el landing

✅ **Contenido de marketing:**

- Hero section con lema y valor único
- Explicación accesible del problema (sesgo del presente)
- Mockups/videos de funcionalidades MVP
- Testimonios o case studies (Mateo, Abigail)
- FAQ sobre seguridad y datos
- Blog: Artículos educativos sobre educación financiera

✅ **Elementos interactivos (servidor):**

- Newsletter signup (Supabase)
- Early access form (captura de leads)
- Contador de usuarios simulado o real
- Analytics: Mixpanel, Plausible

✅ **Performance:**

- `next/image` para optimización automática
- Metadata dinámica por página (SEO)
- Streaming SSR para lazy load
- Lighthouse 90+

⚠️ **No incluir en MVP landing:**

- Dashboard en tiempo real (es solo marketing site)
- Integración de pagos (no hay monetización MVP)
- Chatbot en vivo (solo email + formulario)
- Simulador interactivo completo (costoso)

---

## diferenciador en landing

El landing debe comunicar por qué Azkali es diferente:

1. **Educación en el momento exacto**: "No esperamos a que lean un PDF aburrido"
2. **Gamificación social**: "Competencia sana, comunidad, diversión"
3. **Inclusión real**: "Para Abigails del mundo que el banco rechaza"
4. **Diseño Gen Z**: "Lenguaje que entienden, interfaz que aman"
5. **Integración bancaria**: "Abierto a absorción en Banco Azteca"

---

## consideraciones técnicas para landing

- ✅ Tipado TypeScript end-to-end
- ✅ Componentes reutilizables (Gluestack)
- ✅ Rendimiento: ISR (Incremental Static Regeneration) para páginas estáticas
- ✅ Accesibilidad: WCAG 2.1 AA (forms, navigation, colores)
- ✅ SEO: Metadata dinámicas, schema.org, sitemap
- ✅ Analytics: Eventos de conversión (signup, descargar app)

---

## api consumption desde landing

El landing puede hacer llamadas server-side a Supabase para:

- **Mostrar estadísticas públicas**: "5,000+ usuarios en beta"
- **Suscripciones a newsletter**: POST `/auth/signup` + tabla `newsletter_subscribers`
- **Early access requests**: POST `/early_access` (tabla con leads)
- **Testimonios**: GET `/testimonials` (si tienes tabla de reviews)

**Alternativa segura:**

- Usar Server Components con `fetch()` directamente a Supabase API
- No exponer claves públicas en el cliente
- RLS policies: Permitir SELECT público a tabla de testimonios, denegar inserts

---

## próximos pasos post-hackathon

1. **Validar MVP en demostración en vivo**
2. **Lanzar landing con early access form**
3. **Recopilar feedback de jueces y Grupo Salinas**
4. **Decidir: ¿Absorber en app Banco Azteca o satélite marca blanca?**
5. **Escala**: Integración real con LLMs, APIs de crédito, ML predictivo

---

## referencias internas

- `apps/mobile/ai-instructions/architecture-patterns.md` → Estructura vertical features-based
- `apps/mobile/ai-instructions/gluestack-ui-guide.md` → Componentes (mobile)
- `apps/landing/ai-instructions/gluestack-ui-guide.md` → Componentes (web adaptados)
- `.github/PULL_REQUEST_TEMPLATE.md` → Proceso de contribución
- `CONTRIBUTING.md` → Git Flow y convenciones
