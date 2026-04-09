TALENT HACKATHON 2026

Track: Grupo Salinas Banco Azteca - Innovación tecnológica para la educación e
inclusión financiera en México




Propuesta: Azkali



Equipo: VibeCoders



Integrantes del equipo:

   ●​ Jorge Christian Serrano Puertos

   ●​ Alejandro Ortiz Pérez

   ●​ Erick Ernesto López Valdés

   ●​ José Eduardo Chávez Moreno

   ●​ Misrael Florentino Altamirano
Índice

TALENT HACKATHON 2026.......................................................................................................... 0
  1. Identificación del problema del track................................................................................................... 2
       1.1 Problema principal....................................................................................................................................2
       1.2 Contexto del track.....................................................................................................................................2
       1.3 Evidencia cuantitativa............................................................................................................................2
  2. Usuario objetivo y escenario de uso...................................................................................................... 3
       2.1 User persona 1............................................................................................................................................. 3
       2.2 User persona 2........................................................................................................................................... 4
  3. Escenario de uso (Happy Path).................................................................................................................5
       3.1 Descripción del flujo: Kali y el modelo Freemium..............................................................5
       3.2 Gamificación: Lealtad transaccional y gasto consciente.............................................. 5
  4. Propuesta de solución (alto nivel).......................................................................................................... 6
       4.2 Funciones clave (core features):.................................................................................................... 7
       4.3 Implementaciones a futuro (Roadmap post-MVP):........................................................ 7
  5. Arquitectura y stack tecnológico.............................................................................................................8
       5.1 Frontend (MVP): React Native + Expo.........................................................................................8
       5.2 BaaS, base de datos y arquitectura “Open Banking”......................................................8
       5.3 Integración de IA y microservicio (FastAPI)........................................................................... 8
       5.4 LLMs y prompt engineering............................................................................................................ 8
       5.5 Metodología, diseño y control de versiones.......................................................................... 9
       5.6 Roadmap tecnológico Post-MVP (escalabilidad empresarial)................................. 9
  6. Arquitectura o flujo técnico.......................................................................................................................10
       6.1 Diagrama......................................................................................................................................................10
       6.2 Descripción del flujo............................................................................................................................ 10
  7. Viabilidad cuantitativa y riesgos............................................................................................................. 12
       7.1 Alcance del MVP (Entregable de 72 horas)............................................................................12
       7.2 Gestión de riesgos y mitigación................................................................................................... 12
  8. Impacto y escalabilidad (medible)....................................................................................................... 13
       8.1 Del riesgo moratorio al Customer Lifetime Value (CLTV)............................................ 13
       8.2 Escalabilidad y negocio..................................................................................................................... 13
  9. Equipo de trabajo.............................................................................................................................................14
  10. Referencias..........................................................................................................................................................15




                                                                                                                                                                           1
1. Identificación del problema del track

1.1 Problema principal

El ecosistema digital está perfectamente diseñado para que un joven se endeude en
un clic, condenándolo a meses de estrés y ansiedad financiera por un impulso que
duró solo tres segundos.



1.2 Contexto del track

Para un universitario, ganar $3,000 pesos a la quincena cuesta decenas de horas de
sudor, pero gastarlos toma un simple reconocimiento facial. La verdadera barrera en
México es la "ilusión de liquidez": a los 21 años, una tarjeta con el 82% de interés no se
ve como una deuda, sino como "dinero extra" para comprar estatus.

El e-commerce exprime el "sesgo del presente" con compras a 1-clic, dejando al joven
en ceros para el día 20 y atrapado en "abonos chiquitos". La educación financiera
tradicional falla aquí; pedirle a un joven impulsivo que lea un PDF bancario antes de
comprar es como darle un manual de nutrición cuando ya mordió la hamburguesa.
Por eso, la intervención debe ser directo en la trinchera: la interfaz de usuario.



1.3 Evidencia cuantitativa

   ●​ Esclavos del pago mínimo: De acuerdo con Banxico y CONDUSEF, más del
      40% de los usuarios de tarjetas de crédito en México son "no totaleros".¹ Para
      un joven, esto significa que una compra impulsiva de $2,799 MXN no le cuesta
      dinero, le cuesta meses enteros de su vida laboral regalados al banco en puros
      intereses.

   ●​ Vulnerabilidad ante el entorno digital: Reportes de la AMVO (Asociación
      Mexicana de Venta Online) señalan que la tarjeta de crédito es el método de
      pago dominante en el e-commerce.² Estamos arrojando a usuarios sin
      madurez emocional-financiera a un entorno hiper-optimizado para maximizar
      su sobreendeudamiento.

   ●​ Analfabetismo del flujo de caja: La Encuesta Nacional de Inclusión Financiera
      (ENIF) del INEGI revela una cruda realidad: casi el 50% de la población no lleva
      un registro de sus gastos.³ Cuando la notificación del banco llega avisando del
      saldo insuficiente, el daño psicológico y económico ya está hecho.




                                                                                        2
2. Usuario objetivo y escenario de uso




                             Ilustración 1. User Persona 1.

2.1 User persona 1

Mateo, el comprador compulsivo

Tiene 21 años, es estudiante universitario y empleado de medio tiempo con ingresos
de $7,500 MXN mensuales. Es un usuario altamente digitalizado y bancarizado
(cuenta básica y tarjeta de crédito de bajo límite). Conoce el e-commerce a la
perfección, pero ignora por completo los blogs o módulos tradicionales de educación
financiera porque le resultan aburridos y lo sacan completamente de su flujo de
navegación.

  ●​ Dolor principal (Pain point): Sufre de un "sesgo del presente" crítico. Prioriza la
     gratificación instantánea y el estatus, lo que lo lleva a comprar artículos
     sobrevalorados (como ecosistemas tecnológicos caros o moda en tendencia)
     usando su tarjeta de crédito. Su falta de visibilidad sobre el impacto real de los
     "pagos mínimos" y los intereses capitalizables provoca que su liquidez
     desaparezca el día 20 del mes, atrapándolo en un ciclo de deuda a corto plazo y
     estrés financiero.



3. Escenario de uso (Happy Path)

                                                                                      3
3.1 Descripción del flujo: Kali y el modelo Freemium

Azkali opera bajo un modelo de adquisición con dos perfiles de usuario:

   ●​ Usuario no bancarizado: Puede acceder a la app e interactuar con el copiloto
      Kali para resolver dudas financieras (ej. "¿Cómo inicio un emprendimiento?").
      También tiene acceso al Escáner de Impulsividad, una herramienta donde el
      usuario ingresa lo que desea comprar, la IA le hace preguntas de contexto y
      calcula un porcentaje de "riesgo de impulsividad", mostrándole en qué más
      podría usar ese dinero (costo de oportunidad). Este usuario no tiene acceso a
      la gamificación; para ganar tokens, Kali lo invitará a abrir una cuenta digital en
      Banco Azteca.

   ●​ Usuario bancarizado: Inicia sesión vinculando su número de cuenta de Banco
      Azteca. Este usuario tiene acceso total a las funciones cognitivas y, además,
      está habilitado para participar en el ecosistema de Gamificación, ganando
      tokens por sus buenas decisiones financieras.

3.2 Gamificación: Lealtad transaccional y gasto consciente

El sistema de retención de Azkali funciona a través de un Programa de Lealtad por
Niveles (Tiered Loyalty Program) anclado directamente al portafolio real de
productos de Banco Azteca.

Una vez que el Escáner de Impulsividad ayuda al usuario a evitar gastos innecesarios,
el sistema lo incentiva a canalizar su liquidez hacia un "gasto consciente" utilizando
los plásticos del banco. El usuario acumula tokens automáticamente por cada
transacción. La tasa de acumulación está diseñada algorítmicamente para incentivar
el Upselling: migrar al usuario de cuentas de débito sin comisiones hacia líneas de
crédito que generan mayor rentabilidad para el ecosistema.



Matriz de acumulación de tokens (basada en el portafolio de Banco Azteca):

Nivel 1: Cuentas de débito (transaccionalidad a la vista)

   ●​ Cuenta Guardadito / Débito Digital: 2.00 tokens por cada $1,000 MXN
      gastados. (Fomenta la digitalización y el uso sin sucursal).
   ●​ Débito Azteca / Cuenta Somos: 2.50 tokens por cada $1,000 MXN gastados.
      (Premia el uso de la cuenta principal y productos segmentados con
      asistencias).

Nivel 2: Tarjetas de crédito (incentivo al financiamiento responsable)

   ●​ Tarjeta Azteca (TAZ): 5.00 tokens por cada $1,000 MXN gastados. (Incentiva el

                                                                                      4
      consumo interno dentro del ecosistema Elektra).
   ●​ ABCredit Básica: 8.00 tokens por cada $1,000 MXN gastados. (Fomenta la
      entrada al crédito bancario de forma segura).
   ●​ Tarjeta Oro (y Garantizada): 12.00 tokens por cada $1,000 MXN gastados.
      (Máxima recompensa para clientes con mayor capacidad y línea de crédito).

Visión de negocio: Esta estructura transparente gamifica la madurez financiera. Un
usuario (como el "Perfil Mateo") visualizará en la app que, si mejora su
comportamiento y migra de su Guardadito a una ABCredit Básica o Tarjeta Oro, sus
beneficios transaccionales se multiplicarán drásticamente, beneficiando tanto su
economía como la colocación de productos crediticios de Banco Azteca.

Nota: Los valores de los tokens asignados, las categorías de actividades y el catálogo
de premios presentados en este documento son de carácter ilustrativo para
demostrar la viabilidad tecnológica del MVP. La configuración final de la economía
de la aplicación (tasas de acumulación y valor de canje) quedará sujeta a las métricas
de rentabilidad y las políticas de negocio vigentes de Banco Azteca.

4. Propuesta de solución (alto nivel)

4.1 Identidad de la aplicación y diseño centrado en el usuario

Azkali no es una enciclopedia financiera pasiva, es un copiloto conductual interactivo.
Los recursos educativos tradicionales exigen que el usuario abandone su flujo
natural; Azkali invierte este paradigma llevando la educación financiera al momento
exacto de la toma de decisiones. Guiado por Kali (una IA empática y objetiva), el
sistema genera "fricción cognitiva just-in-time" interceptando las decisiones de gasto
impulsivo antes de que se concreten. Su objetivo es romper la "ilusión de liquidez" de
la Generación Z en tiempo real, bajo el lema: "Frena el impulso. Acelera tu futuro."




                             Ilustración 3. Mascota “Kali”.

4.2 Funciones clave (core features):

Para garantizar un producto robusto, libre de errores y 100% funcional durante la
demostración, el desarrollo del MVP se centra estratégicamente en dos pilares

                                                                                      5
fundamentales:

  ●​ Kali como "Sucursal Cero":

        ○​ El copiloto: Kali actúa como un resolutor de dudas y guía financiero
           autónomo, permitiendo al usuario realizar consultas (ej. requisitos para
           un crédito o cómo emprender) directamente desde su smartphone,
           mitigando la fricción de visitar una sucursal física.

        ○​ El escáner: Cuando el usuario desea realizar un gasto, la IA cruza el
           costo del artículo contra el perfil del usuario mediante un micro-chat,
           arrojando un veredicto estructurado y un porcentaje de "riesgo de
           impulsividad", mostrándole el costo de oportunidad de ese dinero.




                             Ilustración 4. Diagrama.




                                                                                      6
   ●​ Ecosistema de retención y lealtad transaccional:

         ○​ Un motor de recompensas que registra y centraliza el uso de la tarjeta
            del usuario. La aplicación lee el volumen de transacciones (simulado vía
            Supabase) y asigna tokens automáticamente dependiendo del tipo de
            plástico que posea el cliente (desde Débito Guardadito hasta Oro
            Garantizada). El usuario puede monitorear su acumulación en tiempo
            real, lo que fomenta la fidelización hacia los métodos de pago de Banco
            Azteca por encima de la competencia.



4.3 Implementaciones a futuro (Roadmap post-MVP):

La arquitectura de Azkali está diseñada para escalar. Una vez consolidada la base de
usuarios y la retención con el MVP, el roadmap contempla integrar las siguientes
soluciones de Economía Conductual avanzada:

   ●​ Finanzas sociales y leaderboards: Metas de ahorro grupales y rankings
      basados en la disciplina (días de racha) y no en el capital aportado,
      democratizando el esfuerzo.

   ●​ Mapa de nodos y máquina del tiempo: Un lienzo visual y predictivo que
      altera gráficamente el tamaño de las deudas vs. ahorro, demostrando el
      impacto del interés compuesto a futuro.

   ●​ Score de confianza (Inclusión financiera): Conversión de los meses de
      disciplina y tokens acumulados en un puntaje alternativo, desbloqueando el
      primer microcrédito formal para usuarios hoy invisibles para el buró (Perfil
      Abigail).



5. Arquitectura y stack tecnológico

5.1 Frontend (MVP): React Native + Expo

Se utiliza para garantizar una compilación ágil y un despliegue nativo fluido tanto en
iOS como en Android. Este stack permite manejar la lógica de estados necesaria para
el micro-chat y las animaciones de la interfaz sin comprometer el rendimiento.




                                                                                     7
5.2 BaaS, base de datos y arquitectura “Open Banking”

Para el MVP, Supabase no solo provee el motor relacional (PostgreSQL), sino que
actúa como nuestra capa de simulación bajo el estándar de Open Banking.
Despliega APIs RESTful instantáneas que imitan la forma en que una aplicación de
terceros (Azkali) consumiría los datos bancarios de un usuario (saldos, movimientos)
de manera segura. La autenticación (JWT) y las políticas de acceso (Row Level
Security) configuradas en Supabase demuestran que nuestra arquitectura es
plug-and-play: en un entorno de producción, la base de datos simulada se sustituiría
fácilmente por una conexión real a las APIs de Banco Azteca mediante protocolos
OAuth2, garantizando el aislamiento y la privacidad de los datos financieros del
cliente.

5.3 Integración de IA y microservicio (FastAPI)

Aísla la lógica cognitiva de la transaccional. Es un entorno hiper-rápido que prepara
la infraestructura para, en un futuro, integrar librerías de Machine Learning predictivo
(Scikit-learn, Pandas) sin afectar el rendimiento de la base de datos principal.

5.4 LLMs y prompt engineering

Kali cobra vida mediante el modelo Gemini 2.5 Flash-Lite. Se utiliza una arquitectura
de Dynamic System Prompting para personalizar la experiencia:

   ●​ Contexto en tiempo real: El sistema inyecta automáticamente el nombre del
      usuario, sus ingresos y metas financieras en cada turno, logrando que Kali
      responda de forma hiper-personalizada.
   ●​ Manejo de atajos (shortcuts): Se implementan "hints" dinámicos para los
      flujos de recordatorios, seguimiento de metas y reportes financieros. Estos
      hints guían al modelo para mantener la coherencia en el flujo seleccionado
      por el usuario.
   ●​ Visión artificial: A través de la capacidad de análisis de imágenes de Gemini,
      Kali puede procesar capturas de tickets o estados de cuenta (vía Base64) para
      explicar cargos complejos en lenguaje sencillo.

5.5 Metodología, diseño y control de versiones

   ●​ Metodología: El desarrollo se gestiona mediante Kanban, priorizando la
      entrega continua de módulos funcionales. Se aplica Design Thinking (basado
      en el modelo de comportamiento de BJ Fogg) para asegurar que cada
      interacción reduzca la fricción o aumente la motivación.

   ●​ Diseño: El prototipado y la arquitectura visual se definieron mediante
      Excalidraw, permitiendo una iteración rápida de los flujos.


                                                                                      8
   ●​ Control de versiones: Se utiliza GitHub bajo la metodología Git Flow,
      separando las ramas de desarrollo y producción para garantizar la estabilidad
      del código.

   ●​ Testing y Debugging: Las pruebas de flujo y validación de componentes se
      realizan directamente en dispositivos físicos utilizando la consola de Expo Go.
      Esto permite monitorear en tiempo real los logs de estado del cliente.

5.6 Roadmap tecnológico Post-MVP (escalabilidad empresarial)

Azkali está diseñado para evolucionar hacia una infraestructura de grado bancario
total:

    Categoría        Tecnología                      Rol en Producción



  Microservicios   Java Spring Boot         Lógica de negocio robusta y escalable.



  IA Avanzada      Python + FastAPI   Microservicio optimizado para modelos predictivos.



                                        Alineación con la infraestructura core de Banco
  Base de Datos    Oracle Database
                                                             Azteca.



  Contenedores     Docker + Rancher    Orquestación y despliegue elástico de servicios.



     CI/CD         Jenkins + GitLab    Automatización total de integración y despliegue.




                                                                                           9
6. Arquitectura o flujo técnico

6.1 Diagrama




                              Ilustración 5. Diagrama.




                                                         10
6.2 Descripción del flujo

El sistema del MVP sigue una arquitectura Serverless / BaaS ágil, orquestada
directamente desde el cliente móvil para eliminar latencias intermedias durante la
demostración. El flujo de información se divide en dos vías principales: el
procesamiento cognitivo (vía SDK) y el almacenamiento transaccional (vía Supabase).

Paso 1: Interacción inicial y contexto del usuario (Mobile App) El usuario interactúa
con la aplicación construida en React Native. Cuando inicia sesión, la aplicación
consulta a Supabase los datos financieros simulados del usuario (saldos, ingresos,
perfil). Estos datos se inyectan en los componentes de la interfaz y sirven como base
de contexto para el agente virtual.

Paso 2: Procesamiento Cognitivo y Fricción (Mobile ↔ Gemini API) Cuando el
usuario entra al chat o al Escáner de impulsividad, no se pasa por un backend
tradicional. La aplicación utiliza el hook centralizado (useKaliChat.ts) para
comunicarse de forma directa con la API de Google Gemini utilizando el SDK nativo.

   ●​ Dynamic System Prompting: Antes de enviar el mensaje, el cliente construye
      el system prompt dinámicamente inyectando los datos del usuario (ej.
      nombre, ingresos y saldo actual).
   ●​ Atajos y Visión: Si el usuario utiliza atajos (como subir un ticket de compra), la
      app convierte la imagen a Base64 y la envía directamente a Gemini.
   ●​ El modelo procesa la petición y retorna un veredicto estructurado (en JSON
      Mode si es el escáner, o en texto si es conversación), el cual la interfaz
      renderiza inmediatamente sin romper la UI.

Paso 3: Lógica Transaccional y Gamificación (Mobile ↔ Supabase) Paralelo a la IA,
cuando el usuario completa una actividad (ej. decide no comprar un artículo
impulsivo basándose en el análisis de Kali), el cliente dispara una petición
HTTPS/REST hacia Supabase para registrar el evento. Supabase gestiona la emisión
de los "Tokens de Resiliencia" y actualiza el balance de la billetera del usuario.

Paso 4: Persistencia y Seguridad (Supabase → PostgreSQL) Todos los eventos
transaccionales persisten en PostgreSQL a través de Supabase. La seguridad de este
flujo se garantiza mediante Row Level Security (RLS), asegurando que cada usuario
(ej. Mateo o Abigail) solo pueda leer y modificar sus propios balances y tokens. Esta
capa es la que, en producción, se sustituiría por la conexión OAuth2 al core bancario
(Open Banking).




                                                                                       11
7. Viabilidad cuantitativa y riesgos

7.1 Alcance del MVP (Entregable de 72 horas)

Para asegurar la entrega de un producto 100% funcional y sin caídas durante la
demostración, el desarrollo se divide en tres frentes estratégicos:

   ●​ Módulo 1 (core cognitivo y fricción): Lógica funcional del "Escáner de
      impulsividad" y el asistente "Kali". Conecta la aplicación en React Native con un
      microservicio backend desarrollado en Python (FastAPI). Este microservicio
      orquesta de forma segura la comunicación con el modelo Gemini 2.5 Flash
      Lite para el procesamiento de lenguaje natural y visión, demostrando en vivo
      la ruptura de la "ilusión de liquidez" sin exponer la lógica de negocio en el lado
      del cliente.

   ●​ Módulo 2 (core transaccional y gamificación): Integración con Supabase
      (PostgreSQL) para gestionar la identidad de los usuarios (UUID), el registro de
      la lealtad transaccional y la actualización en tiempo real de los balances de
      "Tokens de Resiliencia".

   ●​ Módulo 3 (flujos UI/UX Frontend-First): Las vistas secundarias (perfil, catálogo
      de recompensas ilustrativo) se maquetan en React Native utilizando estados
      locales para optimizar la UX, garantizando una navegación fluida sin saturar
      las peticiones a la base de datos.

7.2 Gestión de riesgos y mitigación

   ●​ Caída de servicios (BaaS/Supabase): La aplicación integra estados
      pre-cargados (caché local) en la gestión de tokens y recompensas para que la
      demostración del ecosistema pueda continuar sin interrupciones en caso de
      una caída del servidor.

   ●​ Latencia o límite de cuota en el LLM: Al depender de un microservicio
      centralizado (FastAPI) que consume la API de Gemini, se centralizó y optimizó
      la inyección de contexto (System Prompts) en el backend para reducir el uso
      de tokens. Como redundancia, la arquitectura maneja un fallback de
      respuestas estáticas en caso de que la API de Google agote su cuota o sufra
      timeouts durante la evaluación.

   ●​ Falla de red (Wi-Fi de la sede): El equipo contará con redundancia mediante
      hotspots móviles preconfigurados en los dispositivos físicos de prueba.

   ●​ Ruptura de código (efecto demo): En lugar de depender de emuladores
      frágiles, el flujo crítico se prueba y depura directamente sobre el hardware de
      dispositivos físicos (iOS/Android) utilizando la consola de Expo Go,

                                                                                      12
      garantizando que el comportamiento mostrado al jurado sea idéntico al de un
      entorno de producción nativo.

8. Impacto y escalabilidad (medible)

8.1 Del riesgo moratorio al Customer Lifetime Value (CLTV)

Existe el mito de que a los bancos les convienen los usuarios ignorantes porque
generan intereses moratorios. Sin embargo, a largo plazo, este perfil incrementa
drásticamente el riesgo de Cartera Vencida, donde el banco asume la pérdida total
del capital prestado. Azkali cambia este paradigma: al educar al usuario de la
Generación Z, transformamos un perfil de alto riesgo en un cliente hiper-rentable. Un
usuario educado y con finanzas sanas no solo evita el impago, sino que consume
más productos financieros a lo largo de su vida (tarjetas, créditos automotrices,
inversión), asegurando un flujo de capital constante y seguro para Banco Azteca.

8.2 Escalabilidad y negocio

   ●​ Integración white-label y arquitectura desacoplada: Al estar construido
      sobre componentes modulares y APIs ligeras (el cliente en React Native, el
      motor transaccional en Supabase y el motor cognitivo en FastAPI), Banco
      Azteca podrá integrar el Escáner de Impulsividad y a Kali directamente en su
      app principal sin alterar su código core. La separación del microservicio de IA
      en Python permite escalar las peticiones de lenguaje natural de manera
      totalmente independiente al servidor de bases de datos.

   ●​ Integración bajo estándar Open Banking: Al haber construido la
      comunicación cliente-servidor simulando un entorno de banca abierta con
      Supabase, garantizamos que Azkali no es un sistema monolítico cerrado.
      Banco Azteca puede decidir si lanzar Azkali como una app satélite conectada
      a sus APIs, o si absorber los módulos de React Native y FastAPI directamente
      en su app principal, reduciendo el Time-to-Market a semanas en lugar de
      meses.

   ●​ Despliegue   cloud: Empaquetado en contenedores para escalar
      horizontalmente de manera independiente al core bancario transaccional.

   ●​ Reducción de riesgo crediticio: Educar a la Generación Z de forma temprana
      y conductual reducirá los índices futuros de cartera vencida, convirtiendo la
      herramienta en una inversión de alta rentabilidad para Grupo Salinas.

Nuestra arquitectura garantiza que Azkali no nazca para ser una app satélite más. La
visión a largo plazo plantea la posibilidad de una integración nativa (plug-and-play)
directamente en la aplicación principal de Banco Azteca, transformando su
ecosistema actual en una plataforma proactiva. El MVP demuestra la viabilidad del

                                                                                   13
motor conductual, entregando a la dirección técnica y comercial la decisión
estratégica de absorber esta solución o desplegarla como una marca independiente.



9. Equipo de trabajo


        Nombre                   Rol                  Responsabilidades


    Jorge Christian      Líder de proyecto y   Gestión del tiempo y entregables,
    Serrano Puertos           frontend         preparación del pitch final ante los
                                                 jueces, y desarrollo de vistas y
                                                  navegación en React Native.


                                                Creación del prototipo interactivo
                           Diseño UI/UX y      en Figma de los flujos secundarios,
 Alejandro Ortiz Pérez    control de calidad    maquetación de la interfaz móvil,
                                (QA)           diseño de experiencia de usuario y
                                                      ejecución de pruebas
                                                  automatizadas para blindar el
                                                          Happy Path.

                                                 Configuración y despliegue del
  Erick Ernesto López      Arquitectura y      entorno en Supabase (PostgreSQL)
         Valdés          desarrollo backend       y desarrollo del microservicio
                                                   orquestador de Inteligencia
                                                   Artificial en FastAPI para la
                                                   comunicación con Gemini.

                              DevOps e              Despliegue del entorno,
 José Eduardo Chávez                            configuración de la API Gateway,
                           integración de
       Moreno                                  implementación de autenticación
                             seguridad
                                                  segura (JWT) y manejo de la
                                                 comunicación cliente-servidor.

                                                 Desarrollo backend (Lógica de
   Misrael Florentino    Desarrollo backend      negocio). Programación de los
      Altamirano         (Lógica de negocio)   flujos de gamificación, gestión de
                                               variables de estado de los usuarios
                                                  y estructuración del motor de
                                                 recompensas transaccionales.



                                                                                  14
10. Referencias

   ●​ Banxico (2023): Reporte de Indicadores Básicos de Tarjetas de Crédito. Datos
      sobre la prevalencia de usuarios "No-Totaleros".

   ●​ AMVO (2024): Estudio de Venta Online México. Análisis de métodos de pago y
      comportamiento de consumo digital.

   ●​ INEGI / CONDUSEF (2023): Encuesta Nacional sobre Salud Financiera
      (ENSAFI). Estadísticas sobre control de ingresos y egresos en la población
      adulta.

   ●​ Banco Santander (2021). Así influye el sesgo del presente en nuestras finanzas
      personales.

   ●​ BBVA (2024). Cómo impacta la economía del comportamiento en las finanzas.

   ●​ Coneval (2020). ¿Qué funciona y qué no en inclusión financiera? Guías
      prácticas de políticas públicas.

   ●​ Consejo Ciudadano para la Seguridad y Justicia de la CDMX (2023): Reporte
      sobre extorsión digital y "monta deudas". Análisis de la vulnerabilidad crediticia
      en usuarios excluidos del sistema bancario tradicional.

   ●​ Banco Mundial (2022). Finanzas conductuales y gamificación. Estrategias
      tecnológicas para incentivar la resiliencia financiera y el ahorro en jóvenes de
      mercados emergentes.

   ●​ OIT (Organización Internacional del Trabajo) (2023): El trabajo en
      plataformas digitales y la economía gig en América Latina. Desafíos de
      inclusión financiera y evaluación de ingresos variables.

   ●​ CNBV (2024): Reporte Nacional de Inclusión Financiera (RNIF). Evolución del
      crédito, barreras de entrada por falta de historial y adopción de canales
      digitales en sectores populares.

   ●​ Banco Azteca (2026). Portal Oficial y Catálogo de Productos Financieros.
      Especificaciones técnicas y beneficios de productos de captación y crédito
      (Cuenta Guardadito, ABCredit, Tarjeta Azteca, Tarjeta VAS, Oro Garantizada).

   ●​ Fogg, B. J. (2009). A Behavior Model for Persuasive Design. Stanford
      University / Proceedings of the 4th International Conference on Persuasive
      Technology.

   ●​ Diario Oficial de la Federación (DOF) / Secretaría de Hacienda y Crédito
      Público (SHCP) (2020). Disposiciones de carácter general relativas a las

                                                                                      15
   Interfaces de Programación de Aplicaciones Informáticas Estandarizadas
   (APIs). Marco regulatorio de Open Banking en México.

●​ McKinsey & Company (2023). The future of retail banking: Loyalty, Upselling,
   and Customer Lifetime Value (CLTV). Análisis sobre estrategias de fidelización
   y rentabilidad a largo plazo en la banca de consumo.




                                                                               16
