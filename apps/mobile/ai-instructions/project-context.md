# contexto del proyecto azkali

## visión general

Azkali es una plataforma de educación financiera conductual diseñada para la Generación Z mexicana. Bajo el lema **"Frena el impulso. Acelera tu futuro"**, utiliza fricción cognitiva just-in-time para interceptar decisiones de gasto impulsivo, romper la "ilusión de liquidez" y construir hábitos de ahorro sostenibles.

La solución fue desarrollada como propuesta para el Talent Hackathon 2026 (Track: Grupo Salinas Banco Azteca) por el equipo VibeCoders, con el objetivo de resolver dos dolores principales:

1. **Mateo (comprador compulsivo)**: Joven de 21 años, universitario, impulsivo con tarjeta de crédito. Prioriza gratificación instantánea sobre visibilidad financiera. Sufre el "sesgo del presente" y endeudamiento de corto plazo.

2. **Abigail (joven invisible)**: Freelancer de 22 años, disciplinada pero rechazada por el sistema bancario formal por falta de comprobantes tradicionales. Invisible para el buró de crédito, vulnerable ante prestamistas informales.

---

## stack tecnológico

### frontend: react native + expo

- Compilación ultra-rápida, experiencia nativa iOS/Android
- Microinteracciones lúdicas y animaciones de retención
- Gestor de estado: **Zustand** (local por feature + global)
- Componentes: **Gluestack UI** + personalizados si es necesario
- Router: **Expo Router** para navegación file-based
- Arquitectura: **Vertical features-based** (auto-contenidas, escalables)

### backend: supabase + postgresql

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

## funcionalidades por fase

### fase 1: mvp (implementado en 72h hackathon)

**[REAL - Completamente funcional]**

#### 1. análisis de compras & "la nevera"

El núcleo de fricción cognitiva del sistema.

**Flujo:**
1. Usuario intenta compra impulsiva (ej. tenis $2,799 MXN)
2. Intercepta antes del checkout → Módulo "Vamos a atar cabos"
3. IA genera 3 preguntas reflexivas personalizadas (micro-chat)
4. Veredicto visual: % impulsividad (ej. "89% Impulsiva")
5. Traducción a métricas de vida diaria (87 horas trabajadas, 1 año de recibos de luz)
6. Opciones:
   - **Congelar impulso**: Envía compra a "Tu nevera" x 24h → Convierte en meta de ahorro
   - **Proceder**: El capital se redirige al ahorro si supera tentación

**Persistencia:**
- PostgreSQL: historial de compras analizadas, impulsos congelados, metas automáticas
- Frontend: Zustand local store para estado real-time

**Responsables (Hackathon):**
- Backend: Erick (FastAPI + lógica matemática) + Misrael (endpoints "Tu Nevera")
- Frontend: Jorge (React Native) + Alejandro (maquetación)

---

#### 2. finanzas sociales & rachas individuales/colaborativas

Retención mediante presión social positiva.

**Flujo individual:**
1. Usuario crea "Reto Personal" con meta (ej. $5,000 MXN para viaje)
2. IA asigna misiones diarias de micro-ahorro (ej. "¡Ahorra $50 MXN hoy!")
3. Racha visual de fuego (streak) se mantiene o se rompe
4. Dashboard real-time de progreso
5. Notificaciones conductuales si se rompe racha

**Flujo grupal:**
1. Usuario invita amigos a "Reto Grupal" (ej. viaje compartido)
2. Bóveda compartida transparente y social
3. Leaderboard colaborativo basado en **días de disciplina** (no montos = equitativo)
4. Al cumplir hitos (30 días, 50% meta, 100% meta):
   - IA otorga insignias, medallas, recompensas
5. Meta alcanzada: Puente directo a producto formal de Banco Azteca

**Persistencia:**
- PostgreSQL: metas compartidas, leaderboards, rachas, notificaciones
- Frontend: Zustand para progreso en tiempo real + animaciones

**Responsables:**
- Backend: Erick (Supabase + lógica de rachas)
- Frontend: Jorge + Alejandro (dashboard colaborativo)

---

#### 3. ecosistema de recompensas (grupo salinas)

Motor de fidelización mediante tokens.

**Flujo:**
1. Usuario mantiene rachas o consolida fondos en "La Nevera"
2. IA emite **"Tokens de Resiliencia"** (descuento ficticio para MVP)
3. Acceso a Marketplace exclusivo de la app
4. Canje visual y gamificado:
   - Café gratis (gracias a socios)
   - Descuentos streaming
   - Descuentos retail (Elektra, Italika, Totalplay)

**MVP (Hackathon 72h):**
- **Lógica de emisión**: Determinística (X tokens por X días de racha)
- **Visualización**: Marketplace UI con precios en tokens
- **Canje**: Simulado/mockup para demostración en vivo
- **Post-MVP**: Integración real con wallet de Grupo Salinas

**Persistencia:**
- PostgreSQL: balance de tokens, historial de canje, validaciones

**Responsables:**
- Backend: Misrael (lógica de emisión)
- Frontend: Alejandro (Marketplace UI)

---

#### 4. agente kali (mascota ia conductual)

Copiloto empático y objetivo. Guía todo el journey del usuario.

**Responsabilidades:**
- Respuestas reflexivas al análisis de compras (micro-chat)
- Mensajes motivacionales en rachas
- Notificaciones conductuales ("¿Retomamos tu racha?")
- Validaciones de hitos en finanzas sociales
- Explicaciones de conceptos financieros en lenguaje Z

**Implementación MVP:**
- **Fallback determinístico**: Árbol de decisiones lógico (cero latencia en demostración)
- **LLM-ready**: Arquitectura preparada para integrar OpenAI/Claude post-hackathon
- **JSON Mode**: Salidas estructuradas para consumo determinista del frontend

**Responsables:**
- Backend: Erick (System Prompts + integración LLM)
- Contingencia: Misrael (árbol de decisiones estático)

---

### fase 2: roadmap post-mvp (futuro, simulado en frontend)

**[FUTURO - No implementado en 72h, posible simulación visual en front]**

#### 1. mapa de nodos & máquina del tiempo

Sustitución del estado de cuenta tradicional.

**Visión:**
- Lienzo de grafos (React Flow): Deudas vs. ahorro como nodos conectados
- Slider temporal: Mueve el tiempo hacia adelante → visualiza crecimiento interés compuesto
- Impacto visual matemático: "En 12 meses: $2,799 → $4,200 (50% interés)"

**MVP Frontend (Simulado):**
- Mockup visual de la máquina del tiempo (sin cálculos reales en Supabase)
- Demostración del concepto con datos estatales
- Arquitectura backend ready para escalar post-hackathon

**Post-MVP (Real):**
- Cálculos de interés compuesto integrados
- Predicciones basadas en histórico del usuario

---

#### 2. inclusión financiera: score de confianza & microcrédito

Conversión de disciplina en acceso crediticio formal.

**Visión:**
- Meses de disciplina en "La Nevera" → Generan un **"Score de Confianza"**
- Usuarios "invisibles" (como Abigail) desbloquean primer microcrédito de Grupo Salinas
- Alternativa: Producto formal de Banco Azteca (cuenta, inversión, tarjeta)

**MVP (Simulado):**
- Backend: Lógica de cálculo del Score de Confianza (basada en rachas + monto ahorrado)
- Frontend: UI que muestra progreso hacia "Score Desbloqueado"
- Botón ficticio: "Solicitar microcrédito" (redirige a formulario mockup)
- Demostración de concepto: "Abigail completó 60 días, Score = 850, Microcrédito aprobado"

**Post-MVP (Real):**
- Integración real con scoring de Banco Azteca
- APIs de solicitud de crédito
- Validación con CNBV/Buró de Crédito

---

#### 3. integraciones avanzadas

**No en MVP, pero arquitectura soporta:**

- **Conexión con nómina**: Sueldos automáticos → Liquider predictivo
- **Detección de gastos recurrentes**: ML básico → Presupuestos automáticos
- **Notificaciones predictivas**: "Tu tarjeta sube intereses en 3 días, congelemos compras"
- **Comunidades por profesión**: Chats de freelancers, estudiantes, trabajadores formales
- **APIs bancarias abiertas (Open Banking)**: Importar extractos de otros bancos
- **Socios de integración**: Spotify, Netflix, Uber → Tracking de suscripciones

---

## arquitectura de datos (simplificada)

### Entidades principales (PostgreSQL)

```
usuarios
├── id (UUID, PK)
├── email (unique, auth supabase)
├── perfil (mateo | abigail | otro)
├── liquidez_actual (decimal)
├── ingreso_mensual (decimal)
├── gastos_fijos (decimal)
├── score_confianza (0-1000, futuro)
├── balance_tokens (decimal)
└── created_at, updated_at

compras_analizadas
├── id (UUID, PK)
├── usuario_id (FK)
├── monto (decimal)
├── categoria (string)
├── veredicto_ia (json: {impulsividad_%, razon, recomendacion})
├── congelada (boolean)
├── en_nevera_hasta (timestamp)
└── created_at

rachas
├── id (UUID, PK)
├── usuario_id (FK)
├── dias_consecutivos (int)
├── meta_id (FK, optional)
├── roto_en (timestamp, null si activa)
└── updated_at

metas_ahorro
├── id (UUID, PK)
├── usuario_id (FK)
├── titulo (string)
├── monto_meta (decimal)
├── monto_acumulado (decimal)
├── fecha_limite (date)
├── tipo (personal | grupal)
├── grupal_miembros (array de UUIDs si grupal)
└── updated_at

tokens_resiliencia
├── id (UUID, PK)
├── usuario_id (FK)
├── cantidad (decimal)
├── razon_emision (racha | nevera | hito_grupal)
├── canjeado (boolean)
└── created_at

notificaciones
├── id (UUID, PK)
├── usuario_id (FK)
├── tipo (racha_rota | hito_alcanzado | micro_ahorro | motivacion)
├── leida (boolean)
└── created_at
```

### Row Level Security (RLS)

Cada usuario ve **solo su propia información**:
- Políticas de SELECT: `auth.uid() = usuario_id`
- Políticas de UPDATE: `auth.uid() = usuario_id`
- Políticas de DELETE: `auth.uid() = usuario_id`

---

## guía para agentes ia

### qué implementar en el mvp

✅ **Prioridad alta:**
- La Nevera (interceptar compras, congelar, sugerir ahorro)
- Rachas (individuales + grupales, leaderboard simple)
- Microinteracciones de Kali (respuestas reflexivas, notificaciones)
- Recompensas básicas (emisión + visualización mockup)

✅ **Prioridad media:**
- Dashboard de progreso personal
- Invitación a retos grupales
- Animaciones de "fuego" al mantener racha

⚠️ **Prioridad baja (solo si hay tiempo):**
- Integraciones con LLM reales (fallback a árbol determinístico)
- Cálculos complejos de interés compuesto
- Exportación de reportes

### qué simular o dejar para post-mvp

❌ **No implementar en 72h:**
- Máquina del tiempo (solo concepto/mockup visual)
- Score de Confianza real (lógica existe, validación ficticia)
- APIs de Banco Azteca reales
- Integraciones con billeteras de Grupo Salinas
- LLMs dinámicos (usar árbol de decisiones como contingencia)

💡 **Filosofía:**
- MVP demuestra viabilidad tecnológica del motor de fricción cognitiva
- Arquitectura está lista para plug-and-play post-MVP
- No simular datos que generen false positives en métricas

---

## diferenciador

A diferencia de apps bancarias tradicionales:

1. **Educación en tiempo real**: No es un PDF aburrido. Intervención en el checkout.
2. **Gamificación social**: Competencia sana, comunidad, badges.
3. **Accesibilidad financiera**: Rachas equitativas (días, no montos) + vía a inclusión.
4. **Diseño generacional**: Lenguaje Gen Z, microinteracciones, mascota empática.
5. **Escalabilidad plug-and-play**: Desacoplada de Banco Azteca pero lista para absorción.

---

## métricas de éxito (kpis)

- **Tasa de completado de simulaciones**: % usuarios que terminen análisis de compra
- **Retención (DAU/MAU)**: Usuarios activos diarios/mensuales
- **Conversión a inclusión financiera**: % usuarios que mejoren Score y soliciten producto formal
- **Racha promedio**: Días de disciplina consecutivos
- **Canje de tokens**: % tokens emitidos que se canjearon

---

## consideraciones de seguridad

- ✅ JWT vía Supabase Auth (tokens con expiry)
- ✅ RLS en PostgreSQL (cada usuario aislado)
- ✅ HTTPS en todas las APIs
- ✅ Datos financieros nunca en caché local sin cifrado
- ✅ Validación server-side de todas las transacciones
- ✅ Contingencia offline: JSONs locales (no datos sensibles)

---

## próximos pasos post-hackathon

1. **Validar métricas del MVP** en demostración en vivo
2. **Feedback de jueces y stakeholders** de Grupo Salinas
3. **Decisión estratégica**: ¿Absorber en app principal o marca blanca satélite?
4. **Integración real con sistemas de Banco Azteca**
5. **Escala horizontal**: LLMs dinámicos, APIs reales, ML predictivo

---

## referencias internas

- `apps/mobile/ai-instructions/architecture-patterns.md` → Estructura vertical features-based
- `apps/mobile/ai-instructions/gluestack-ui-guide.md` → Componentes disponibles
- `.github/PULL_REQUEST_TEMPLATE.md` → Proceso de contribución
- `CONTRIBUTING.md` → Git Flow y convenciones
