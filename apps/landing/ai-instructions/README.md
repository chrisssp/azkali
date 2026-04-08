# 🤖 AI instructions directory

## Propósito

Esta carpeta contiene documentación especializada diseñada para **nutrir agentes de IA** con conocimientos específicos sobre las arquitecturas, patrones, y herramientas utilizadas en el proyecto Azkali Landing (Next.js).

## ¿Por qué existe esta carpeta?

Los agentes de IA (como Copilot, Claude, ChatGPT, etc.) pueden generar código más preciso y consistente cuando tienen acceso a:

- ✅ **Guías de arquitectura específicas del proyecto**
- ✅ **Patrones de código establecidos**
- ✅ **Convenciones de nomenclatura**
- ✅ **Restricciones y mejores prácticas**
- ✅ **Ejemplos de implementación**

Al proporcionar estos documentos, los agentes pueden:

- Generar código que siga las convenciones del proyecto
- Sugerir soluciones arquitectónicamente correctas
- Reducir la necesidad de correcciones manuales
- Mantener consistencia en el código generado

## 📄 Documentos disponibles

### `gluestack-ui-guide.md`

Guía completa sobre cómo utilizar Gluestack UI como biblioteca de componentes principal en Next.js:

- Filosofía copy-paste de componentes
- 30+ componentes disponibles
- Patrones de composición
- Estilos con Tailwind CSS
- Cuándo y cómo crear componentes personalizados
- Best practices para agentes IA
- Ejemplos de código Next.js

**Usar cuando**: Necesites generar UI, componentes visuales, o páginas

## 🎯 Cómo usar esta carpeta

### Para desarrolladores humanos

1. **Lee los documentos** antes de solicitar ayuda a agentes IA
2. **Comparte los archivos** con el agente en el prompt/contexto
3. **Referencia documentos específicos** cuando pidas código relacionado

Ejemplo:
```
@ai-instructions/gluestack-ui-guide.md 
Crea un componente de hero section para la landing
```

### Para agentes IA

Cuando recibas una tarea relacionada con UI en este proyecto:

1. **Lee el documento relevante** de esta carpeta
2. **Sigue los patrones** y convenciones especificadas
3. **Utiliza los ejemplos** como referencia
4. **Respeta las restricciones** mencionadas

## 📚 Estructura futura

A medida que el proyecto crezca, esta carpeta puede incluir:

```
ai-instructions/
├── README.md                          # Este archivo
├── gluestack-ui-guide.md             # ✅ Disponible
├── next-js-conventions.md            # 🔜 Próximamente
├── routing-strategy.md               # 🔜 Próximamente
├── seo-guidelines.md                 # 🔜 Próximamente
├── performance-optimization.md       # 🔜 Próximamente
└── deployment-procedures.md          # 🔜 Próximamente
```

## 🔄 Mantenimiento

### Actualización de documentos

Los documentos deben actualizarse cuando:

- Cambian las versiones de las bibliotecas
- Se establecen nuevos patrones de arquitectura
- Se agregan nuevas herramientas o frameworks
- Se descubren mejores prácticas

### Versionado

Cada documento debe incluir al final:

```markdown
---

_Última actualización: YYYY-MM-DD_
_Versión: X.X_
_Mantenido por: [Equipo/Persona]_
```

## 💡 Mejores prácticas

### Al crear nuevos documentos

1. **Sé específico**: Enfócate en un tema claro
2. **Incluye ejemplos**: El código habla más que las palabras
3. **Estructura clara**: Usa secciones y subsecciones
4. **Contexto primero**: Explica el "por qué" antes del "cómo"
5. **Referencias**: Enlaza a documentación oficial cuando sea relevante

### Al actualizar documentos

1. **Marca cambios importantes**: Indica breaking changes
2. **Mantén historial**: Considera usar comentarios para rastrear cambios
3. **Notifica al equipo**: Comunica actualizaciones importantes
4. **Valida ejemplos**: Asegúrate que el código de ejemplo funcione

## 🚀 Contribuciones

Si identificas:
- Patrones que deberían documentarse
- Mejoras a documentos existentes
- Errores o información desactualizada
- Nuevos temas que necesitan cobertura

**Acción recomendada**: 
1. Crea un issue en el repositorio
2. O envía un PR con el documento/cambio propuesto

## 🤝 Integración con el workflow

Esta carpeta complementa:
- **CONTRIBUTING.md**: Flujo de trabajo y convenciones de Git
- **README.md**: Documentación general del proyecto
- **Código fuente**: La implementación real

No reemplaza la documentación técnica estándar, sino que la **aumenta** con contexto específico para agentes IA.

---

**Nota**: Esta carpeta es parte de la infraestructura del proyecto y no debe eliminarse. Los documentos aquí son tan importantes como el código mismo para mantener la calidad y consistencia del proyecto.

---

_Creado: 2026-04-07_
_Propósito: Mejorar la colaboración humano-IA en el desarrollo_
