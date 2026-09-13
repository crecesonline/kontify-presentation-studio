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

export function generatePresentation(input: Omit<Presentation, "id" | "slides">): Presentation {
  const demo = createDemoPresentation()
  const topic = input.title.trim() || demo.title
  if (topic.toLowerCase().includes("dinero") || topic.toLowerCase().includes("flujo")) {
    return { ...demo, ...input, id: `presentation-${Date.now()}` }
  }
  return {
    ...demo,
    ...input,
    id: `presentation-${Date.now()}`,
    title: topic,
    slides: demo.slides.map((slide, index) => index === 0
      ? { ...slide, title: `${topic}\npara decidir mejor`, subtitle: input.objective }
      : slide),
  }
}
