export type SlideType =
  | "cover"
  | "provocation"
  | "figure"
  | "comparison"
  | "problem"
  | "decision"
  | "reveal"
  | "cards"
  | "action"
  | "closing"

export type Slide = {
  id: string
  type: SlideType
  title: string
  kicker?: string
  subtitle?: string
  body?: string
  accent?: string
  items?: { label: string; value?: string; detail?: string }[]
  speakerNotes: string
  hypothetical?: boolean
}

export type Presentation = {
  id: string
  title: string
  audience: string
  duration: string
  level: string
  objective: string
  slides: Slide[]
}

const baseSlides: Slide[] = [
  {
    id: "slide-1",
    type: "cover",
    title: "El misterio del\ndinero invisible",
    subtitle: "¿Por qué una empresa puede tener utilidades y no tener dinero en el banco?",
    speakerNotes: "Abre con la tensión central. No definas todavía: pide al grupo que imagine una empresa que acaba de cerrar un gran mes.",
  },
  {
    id: "slide-2",
    type: "provocation",
    title: "Una buena noticia…\n¿o un problema?",
    subtitle: "Tu empresa tuvo un gran mes.",
    items: [
      { label: "Ventas", value: "$500,000" },
      { label: "Costos y gastos", value: "$400,000" },
      { label: "Utilidad neta", value: "$100,000" },
    ],
    body: "Entonces… ¿por qué solo tienes $2,000 en el banco?",
    speakerNotes: "Haz una pausa después de cada cifra. Invita a la audiencia a explicar la aparente contradicción antes de mostrar la respuesta.",
    hypothetical: true,
  },
  {
    id: "slide-3",
    type: "comparison",
    title: "Utilidad vs. flujo de efectivo",
    items: [
      { label: "UTILIDAD", detail: "Resultado contable. Mide si tu modelo de negocio funciona." },
      { label: "FLUJO DE EFECTIVO", detail: "Movimiento real de dinero. Mide si puedes pagar, operar y crecer." },
    ],
    body: "Puedes tener utilidad y aun así no tener dinero.",
    speakerNotes: "Presenta ambos conceptos como lentes distintos, no como conceptos opuestos. La utilidad explica desempeño; el flujo explica capacidad de acción.",
  },
  {
    id: "slide-4",
    type: "problem",
    title: "La trampa más común",
    subtitle: "“Vendo más, luego tengo más dinero.”",
    accent: "Falso.",
    body: "Las ventas pueden generar utilidad en el futuro, pero el dinero no siempre llega al mismo tiempo.",
    speakerNotes: "Conecta ventas a crédito, inventario y pagos anticipados con el desfase de caja. Mantén el lenguaje simple.",
  },
  {
    id: "slide-5",
    type: "cards",
    title: "¿Dónde se queda el dinero?",
    subtitle: "Tu utilidad se puede absorber por:",
    items: [
      { label: "Cuentas por cobrar" },
      { label: "Inventario" },
      { label: "Pagos anticipados" },
      { label: "Impuestos" },
      { label: "Nómina y gastos fijos" },
    ],
    speakerNotes: "Pide ejemplos de cada categoría. La participación transforma una explicación contable en una lectura operativa del negocio.",
  },
  {
    id: "slide-6",
    type: "decision",
    title: "El caso de la\nComercializadora Delta",
    subtitle: "¿Aceptas el contrato?",
    items: [
      { label: "Valor del contrato", value: "$1,000,000" },
      { label: "Utilidad estimada", value: "30%" },
      { label: "Plazo de pago", value: "90 días" },
      { label: "Saldo en banco", value: "$50,000" },
    ],
    body: "A. Sí, lo tomo.  B. Solo si me dan anticipo.  C. No, mejor lo rechazo.",
    speakerNotes: "Lee el escenario como caso hipotético. Pide que elijan A, B o C antes de revelar la respuesta. No hay una única respuesta sin conocer las condiciones de caja.",
    hypothetical: true,
  },
  {
    id: "slide-7",
    type: "reveal",
    title: "La respuesta correcta: NO",
    subtitle: "Sin anticipo o financiamiento estructurado, ese contrato puede quebrar tu empresa en 30 días.",
    body: "La utilidad esperada no paga la nómina de hoy.",
    speakerNotes: "Revela la lógica, no una regla universal. El aprendizaje es evaluar el tiempo del efectivo antes de celebrar la utilidad.",
    hypothetical: true,
  },
  {
    id: "slide-8",
    type: "cards",
    title: "Los 4 blindajes\nde tesorería",
    items: [
      { label: "Flujo a 4 semanas", detail: "Anticipa necesidades de efectivo." },
      { label: "Cobranza en venta", detail: "Asegura anticipos o condiciones claras." },
      { label: "Auditoría inventario", detail: "Evita dinero atrapado en stock." },
      { label: "Retiros condicionados", detail: "Separa el dinero del negocio y el personal." },
    ],
    speakerNotes: "Convierte la explicación en hábitos. Elige solo uno para implementar esta semana y explica por qué.",
  },
  {
    id: "slide-9",
    type: "action",
    title: "Tu decisión hoy\nconstruye el mañana",
    subtitle: "Utilidad sin liquidez es crecimiento en riesgo.",
    body: "Gestiona tu efectivo con la misma disciplina con la que gestionas tus ventas.",
    speakerNotes: "Pide una acción concreta: construir el flujo de cuatro semanas, revisar cobranza o separar retiros.",
  },
  {
    id: "slide-10",
    type: "closing",
    title: "No enseñamos para memorizar.\nEnseñamos para decidir mejor.",
    items: [
      { label: "Las ventas", detail: "son una oportunidad." },
      { label: "La utilidad", detail: "es un resultado." },
      { label: "El flujo de efectivo", detail: "es la realidad." },
    ],
    speakerNotes: "Cierra regresando a la pregunta inicial. Pide que cada persona complete la frase: ‘A partir de hoy voy a…’.",
  },
]

export function createDemoPresentation(): Presentation {
  return {
    id: "demo-dinero-invisible",
    title: "El misterio del dinero invisible",
    audience: "Dueños de PyMEs",
    duration: "25 minutos",
    level: "Básico",
    objective: "Comprender utilidad vs. flujo y tomar mejores decisiones financieras.",
    slides: baseSlides.map((slide) => ({ ...slide, items: slide.items?.map((item) => ({ ...item })) })),
  }
}

function clean(value: string, fallback: string) {
  const result = value.trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  return result || fallback
}

function short(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit - 1).trim()}…` : value
}

function makeTitle(topic: string) {
  const words = topic.split(' ')
  return words.length > 7 ? `${words.slice(0, 6).join(' ')}…` : topic
}

export function generatePresentation(input: Omit<Presentation, "id" | "slides">): Presentation {
  const topic = clean(input.title, 'el tema central')
  const audience = clean(input.audience, 'tu audiencia')
  const objective = clean(input.objective, `entender ${topic} y actuar con claridad`)
  const level = clean(input.level, 'Básico')
  const duration = clean(input.duration, '25 minutos')
  const subject = makeTitle(topic)
  const slides: Slide[] = [
    { id: 'slide-1', type: 'cover', title: `${subject}\npara decidir mejor`, subtitle: `¿Qué cambia cuando ${topic.toLowerCase()} deja de ser una idea y se convierte en una decisión?`, speakerNotes: `Abre con la pregunta y pide a ${audience} que describa qué está en juego.` },
    { id: 'slide-2', type: 'provocation', title: 'La tensión que nadie puede ignorar', subtitle: `En ${topic.toLowerCase()}, saber más no siempre significa decidir mejor.`, body: `La pregunta clave: ¿qué estamos interpretando mal antes de actuar?`, speakerNotes: `Pide una respuesta rápida. No corrijas todavía: usa las respuestas para revelar el problema.` },
    { id: 'slide-3', type: 'problem', title: 'El costo de mirar solo una parte', subtitle: `Tres señales suelen confundirse cuando hablamos de ${topic.toLowerCase()}.`, items: [{ label: 'Lo visible', detail: 'Lo que parece urgente hoy.' }, { label: 'Lo importante', detail: 'La causa que mueve el resultado.' }, { label: 'Lo decisivo', detail: 'La acción que cambia el siguiente paso.' }], speakerNotes: 'Explica que el marco separa síntomas, causas y decisiones para evitar conclusiones rápidas.' },
    { id: 'slide-4', type: 'comparison', title: 'Dos formas de leer el mismo escenario', items: [{ label: 'Reacción', detail: 'Resolver lo que acaba de ocurrir.' }, { label: 'Criterio', detail: 'Entender el patrón y anticipar.' }], body: `Para ${audience}, el salto no es tener más información: es usarla con un criterio común.`, speakerNotes: 'Contrasta las dos miradas y conecta la segunda con el objetivo de la sesión.' },
    { id: 'slide-5', type: 'figure', title: 'El marco en tres movimientos', subtitle: `Una ruta simple para trabajar ${topic.toLowerCase()}.`, items: [{ label: '1. Observa', detail: 'Nombra el hecho sin interpretarlo.' }, { label: '2. Explica', detail: 'Encuentra la relación que importa.' }, { label: '3. Decide', detail: 'Elige una acción verificable.' }], speakerNotes: 'Recorre el marco con un ejemplo de la audiencia y confirma que cada paso produce una salida distinta.' },
    { id: 'slide-6', type: 'decision', title: 'Ahora llevémoslo a la práctica', subtitle: `Caso de trabajo: aplicar el criterio a ${topic.toLowerCase()}.`, items: [{ label: 'Contexto', value: short(`Una situación real de ${audience}`, 42) }, { label: 'Reto', value: 'Elegir qué atender primero' }, { label: 'Criterio', value: 'Impacto y capacidad de acción' }], body: 'A. Mantener el plan  B. Ajustar el enfoque  C. Detener y volver a diagnosticar', speakerNotes: 'Pide que elijan una opción y justifiquen su decisión con evidencia, no con intuición.', hypothetical: true },
    { id: 'slide-7', type: 'reveal', title: 'La decisión mejora cuando el criterio es explícito', subtitle: `El objetivo no es predecir todo: es reducir la ambigüedad antes de actuar.`, body: short(`Por eso la respuesta más sólida para ${topic.toLowerCase()} combina contexto, evidencia y un siguiente paso observable.`, 180), speakerNotes: 'Revela el criterio y vuelve al caso. Pregunta qué dato faltaba para decidir con confianza.' },
    { id: 'slide-8', type: 'cards', title: 'Lo que debes llevarte', items: [{ label: 'Una idea', detail: short(`La clave de ${topic.toLowerCase()} es mirar el sistema completo.`, 85) }, { label: 'Un criterio', detail: 'Prioriza lo que cambia la decisión.' }, { label: 'Una práctica', detail: 'Convierte el análisis en un siguiente paso.' }, { label: 'Una señal', detail: 'Mide si la acción produjo el efecto esperado.' }], speakerNotes: 'Pide a cada persona que elija la tarjeta más útil para su contexto.' },
    { id: 'slide-9', type: 'action', title: 'Tu siguiente paso empieza hoy', subtitle: `En las próximas 24 horas, convierte ${topic.toLowerCase()} en una acción concreta.`, body: short(`Define qué observarás, qué decisión tomarás y cómo sabrás que avanzaste hacia: ${objective}.`, 190), speakerNotes: 'Da dos minutos para escribir la acción. Pide que incluya responsable, fecha y señal de avance.' },
    { id: 'slide-10', type: 'closing', title: 'Entender es el principio.\nDecidir es el resultado.', items: [{ label: 'Contexto', detail: `Nivel: ${level} · Duración: ${duration}` }, { label: 'Objetivo', detail: short(objective, 105) }, { label: 'Resultado', detail: 'Una decisión más clara y accionable.' }], speakerNotes: 'Cierra retomando la pregunta inicial y pide una frase: A partir de hoy voy a…' },
  ]
  return { ...input, id: `presentation-${Date.now()}`, title: topic, audience, duration, level, objective, slides }
}
