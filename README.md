<div align="center">

# 🐢 Azkali

**Frena el impulso. Acelera tu futuro.**

Copiloto conductual interactivo de educación e inclusión financiera para la Generación Z, desarrollado para el **Talent Hackathon 2026** — Track Grupo Salinas / Banco Azteca.

[![React Native](https://img.shields.io/badge/React_Native-Expo-blue?logo=expo)](https://expo.dev)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ecf8e?logo=supabase)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/AI-Gemini_2.5-4285F4?logo=google)](https://ai.google.dev)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com)

</div>

---

## Problema

El ecosistema digital está diseñado para que un joven se endeude en un clic. Más del **40% de los usuarios de tarjetas de crédito en México** son "no totaleros" (Banxico/CONDUSEF), y casi el **50% de la población no lleva registro de sus gastos** (ENIF/INEGI). La educación financiera tradicional falla porque exige que el usuario abandone su flujo natural; Azkali lleva la intervención **directo a la interfaz de usuario**, en el momento exacto de la toma de decisiones.

## Solución

Azkali es una app móvil guiada por **Kali**, una IA empática que genera "fricción cognitiva just-in-time" para interceptar decisiones de gasto impulsivo antes de que se concreten.

### Funciones clave (MVP)

| Módulo | Descripción |
|---|---|
| **Kali — Copiloto financiero** | Resolutor de dudas y guía financiero autónomo. El usuario puede consultar requisitos para créditos, cómo emprender, etc., directamente desde su smartphone. |
| **Escáner de Impulsividad** | La IA cruza el costo de un artículo contra el perfil del usuario mediante un micro-chat, arrojando un porcentaje de "riesgo de impulsividad" y mostrando el costo de oportunidad. |
| **Gamificación transaccional** | Motor de recompensas con "Tokens de Resiliencia" que premia el uso consciente de los productos de Banco Azteca (débito → crédito), incentivando el upselling orgánico. |

### Modelo Freemium

- **Usuario no bancarizado** → Acceso al copiloto Kali y al Escáner de Impulsividad. Sin gamificación; Kali lo invita a abrir una cuenta en Banco Azteca.
- **Usuario bancarizado** → Acceso total + participación en el ecosistema de gamificación con acumulación de tokens.

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                     Usuario                          │
│                  (Mateo / Abigail)                    │
└──────────────────────┬──────────────────────────────┘
                       │
           ┌───────────▼───────────┐
           │      Mobile App       │
           │  React Native + Expo  │
           └───┬───────────────┬───┘
               │               │
    ┌──────────▼──────┐  ┌─────▼──────────────┐
    │  Supabase (BaaS)│  │ Orquestador de IA  │
    │  Auth + API + RLS│  │    (FastAPI)       │
    └──────┬──────────┘  └─────┬──────────────┘
           │                   │
    ┌──────▼──────────┐  ┌─────▼──────────────┐
    │   PostgreSQL    │  │     LLM API        │
    │  (via Supabase) │  │  Gemini 2.5 Flash  │
    └─────────────────┘  └────────────────────┘
```

## Stack tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| Frontend | **React Native + Expo** | App móvil multiplataforma (iOS/Android) |
| UI | **Gluestack UI + NativeWind** | Sistema de diseño y estilos utilitarios |
| BaaS | **Supabase** | Auth (JWT), PostgreSQL, RLS, APIs REST |
| IA | **FastAPI** | Orquestador del microservicio cognitivo |
| LLM | **Gemini 2.5 Flash-Lite** | Dynamic System Prompting, visión artificial |
| Landing | **Next.js** | Página de promoción y waitlist |
| Video | **Remotion** | Generación de video promocional |

## Estructura del monorepo

```
azkali/
├── apps/
│   ├── mobile/          # App React Native + Expo
│   └── landing/         # Landing page Next.js
├── services/
│   ├── ai-engine/       # Microservicio FastAPI (orquestador IA)
│   └── core-api/        # API transaccional
├── supabase/            # Migraciones y configuración de Supabase
├── video/               # Video promocional con Remotion
└── docs/                # Propuesta y documentación
```

## Inicio rápido

### Prerrequisitos

- Node.js ≥ 18
- [pnpm](https://pnpm.io/) como gestor de paquetes
- [Expo Go](https://expo.dev/go) en tu dispositivo móvil
- Cuenta de Supabase configurada

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/azkali.git
cd azkali

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp apps/mobile/.env.example apps/mobile/.env
# Editar .env con tus keys de Supabase y Gemini

# Iniciar la app móvil
cd apps/mobile
npx expo start
```

## Gamificación — Matriz de tokens

| Producto Banco Azteca | Tokens / $1,000 MXN |
|---|---|
| Guardadito / Débito Digital | 2.00 |
| Débito Azteca / Cuenta Somos | 2.50 |
| Tarjeta Azteca (TAZ) | 5.00 |
| ABCredit Básica | 8.00 |
| Tarjeta Oro (Garantizada) | 12.00 |

> Los valores son ilustrativos para el MVP. La configuración final queda sujeta a las políticas de Banco Azteca.

## Roadmap post-MVP

- [ ] Finanzas sociales y leaderboards (metas de ahorro grupales)
- [ ] Mapa de nodos y máquina del tiempo (visualización de interés compuesto)
- [ ] Score de confianza (puntaje alternativo para inclusión financiera)
- [ ] Migración a Java Spring Boot + Oracle Database (grado bancario)
- [ ] Contenedores Docker + Rancher + CI/CD Jenkins

## Equipo — VibeCoders

| Nombre | Rol |
|---|---|
| Jorge Christian Serrano Puertos | Líder de proyecto y frontend |
| Alejandro Ortiz Pérez | Diseño UI/UX y QA |
| Erick Ernesto López Valdés | Arquitectura y backend |
| José Eduardo Chávez Moreno | DevOps e integración de seguridad |
| Misrael Florentino Altamirano | Backend — Lógica de negocio |

## Licencia

Ver [LICENSE](LICENSE) para más detalles.
