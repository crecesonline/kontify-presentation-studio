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

export type VisualType = 'hero_image' | 'diagram' | 'cards' | 'comparison' | 'big_number' | 'iconography' | 'typographic'
export type VisualLayout = 'hero' | 'big_number' | 'diagnostic_scale' | 'comparison' | 'process' | 'cause_effect' | 'decision_board' | 'number_breakdown' | 'risk_map' | 'checklist' | 'level_matrix' | 'traffic_light' | 'timeline' | 'before_after' | 'myth_reality' | 'find_error' | 'concept_map' | 'action_matrix' | 'reveal' | 'closing_decision'
export type VisualPlacement = 'background' | 'right' | 'left' | 'center' | 'none'

import type { KontifyIconKey } from './kontify-icons'

export type VisualStrategy = {
  layout: VisualLayout
  iconKey?: KontifyIconKey
  visualType: VisualType
  visualPrompt?: string
  visualPlacement: VisualPlacement
  textSafeArea: 'left' | 'right' | 'center' | 'full'
  overlay?: 'dark_green_gradient' | 'none'
  visualPriority: 'primary' | 'supporting' | 'none'
  concept: string
}

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
  visualStrategy?: VisualStrategy
  visualAsset?: { src: string; alt: string }
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
    title: "Utilidad no es efectivo.\nMira dónde está la diferencia.",
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
    slides: withArtDirection(baseSlides.map((slide) => ({ ...slide, items: slide.items?.map((item) => ({ ...item })) })), 'utilidad vs. flujo de efectivo'),
  }
}

function clean(value: string, fallback: string) {
  const result = value.trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  return result || fallback
}

function short(value: string, limit: number) {
  return value.length > limit ? value.slice(0, limit).trimEnd() : value
}

function makeTitle(topic: string) {
  const words = topic.split(' ')
  return words.length > 7 ? words.slice(0, 7).join(' ') : topic
}

function createVisualStrategy(type: SlideType, index: number, topic: string): VisualStrategy {
  const concept = topic.toLowerCase()
  const layouts: VisualLayout[] = ['hero', 'big_number', 'comparison', 'process', 'number_breakdown', 'decision_board', 'reveal', 'checklist', 'action_matrix', 'closing_decision']
  const layout = layouts[index % layouts.length]
  const fiscal = concept.includes('iva') || concept.includes('sat') || concept.includes('impuesto')
  const iconKey = fiscal ? (type === 'decision' ? 'calculate' : type === 'comparison' ? 'compare' : type === 'action' ? 'review' : 'iva') : (type === 'decision' ? 'decide' : type === 'comparison' ? 'compare' : type === 'action' ? 'next_step' : type === 'figure' ? 'process' : 'idea')
  const heroConcepts = ['descubrimiento y tensión', 'consecuencia visible', 'acción y avance']
  if (type === 'cover' || type === 'reveal' || type === 'action') {
    const hero = heroConcepts[index === 0 ? 0 : index === 6 ? 1 : 2]
    return {
      layout,
      iconKey,
      visualType: 'hero_image',
      concept: `${hero} alrededor de ${concept}`,
      visualPrompt: `cinematic conceptual editorial scene representing ${hero} around ${concept}, dark near-black green environment, controlled lime illumination, premium business photography, clean composition, negative space for typography, no text, no logos, no people smiling at camera, no multicolor stock aesthetic`,
      visualPlacement: 'right',
      textSafeArea: 'left',
      overlay: 'dark_green_gradient',
      visualPriority: 'primary',
    }
  }
  if (type === 'comparison') return { layout, iconKey, visualType: 'comparison', concept: `contraste entre dos lecturas de ${concept}`, visualPlacement: 'center', textSafeArea: 'full', visualPriority: 'supporting' }
  if (type === 'figure') return { layout, iconKey, visualType: 'diagram', concept: `secuencia visual para entender ${concept}`, visualPlacement: 'center', textSafeArea: 'full', visualPriority: 'supporting' }
  if (type === 'decision') return { layout, iconKey, visualType: 'iconography', concept: `alternativas de decisión sobre ${concept}`, visualPlacement: 'right', textSafeArea: 'left', visualPriority: 'supporting' }
  if (type === 'provocation') return { layout, iconKey, visualType: 'big_number', concept: `tensión principal de ${concept}`, visualPlacement: 'right', textSafeArea: 'left', visualPriority: 'supporting' }
  if (type === 'cards') return { layout, iconKey, visualType: 'cards', concept: `mapa de ideas accionables sobre ${concept}`, visualPlacement: 'center', textSafeArea: 'full', visualPriority: 'supporting' }
  return { layout, visualType: 'typographic', concept: `idea esencial de ${concept}`, visualPlacement: 'none', textSafeArea: 'full', visualPriority: 'none' }
}

function isIvaTopic(topic: string) {
  const normalized = topic.toLowerCase()
  return normalized.includes('iva') || normalized.includes('sat') || normalized.includes('impuesto al valor agregado')
}

function withArtDirection(slides: Slide[], topic: string) {
  return slides.map((slide, index) => ({ ...slide, visualStrategy: createVisualStrategy(slide.type, index, topic) }))
}

function createIvaPresentation(input: Omit<Presentation, 'id' | 'slides'>): Presentation {
  const topic = '¿El SAT se está quedando con tu IVA o tú lo estás calculando mal?'
  const slides: Slide[] = [
    { id: 'slide-1', type: 'cover', title: '¿EL SAT SE ESTÁ\nQUEDANDO CON TU IVA?', subtitle: '¿O lo estás calculando mal?', speakerNotes: 'Abre con la tensión entre el dinero que entra y el IVA que debe separarse. Aclara que la sesión es educativa y que los criterios fiscales actuales deben verificarse en fuentes oficiales.' },
    { id: 'slide-2', type: 'provocation', title: 'COBRASTE MÁS\nDE LO QUE PUEDES GASTAR', subtitle: 'El IVA cobrado no es ingreso propio: es un importe trasladado que debe separarse.', items: [{ label: 'Cobro total', value: '$116,000' }, { label: 'Venta antes de IVA', value: '$100,000' }, { label: 'IVA trasladado', value: '$16,000' }], body: 'CASO HIPOTÉTICO · ¿Qué parte del cobro no deberías tratar como dinero disponible?', speakerNotes: 'Presenta las cantidades como un caso hipotético. No afirmes una obligación concreta sin revisar el periodo y la normativa aplicable.' , hypothetical: true },
    { id: 'slide-3', type: 'comparison', title: 'TRES CANTIDADES\nQUE NO SIGNIFICAN LO MISMO', items: [{ label: 'Precio antes de IVA', detail: 'El valor de la operación antes del impuesto.' }, { label: 'IVA trasladado', detail: 'El impuesto cobrado al cliente en la operación.' }, { label: 'IVA acreditable', detail: 'El impuesto de compras que podría disminuir el IVA a cargo si cumple los requisitos aplicables.' }], body: 'Confundirlas hace que el saldo bancario parezca mayor de lo que realmente puedes disponer.', speakerNotes: 'Distingue cada concepto sin convertir la diapositiva en una asesoría fiscal. Marca que el acreditamiento depende de requisitos y debe verificarse oficialmente.' },
    { id: 'slide-4', type: 'problem', title: 'EL ERROR NO ESTÁ\nEN LA CALCULADORA', subtitle: 'Está en tratar todo el cobro como ingreso propio.', accent: 'Confusión habitual', body: 'Si una venta es de $100,000 más $16,000 de IVA, el banco recibe $116,000, pero esos $16,000 deben identificarse por separado del precio de la venta.', speakerNotes: 'Pide que señalen qué importe usarían para calcular ventas y qué importe separarían como IVA trasladado. Caso hipotético, no regla universal.' , hypothetical: true },
    { id: 'slide-5', type: 'figure', title: 'DEL COBRO AL IVA\nA CARGO INICIAL', subtitle: 'Cálculo simplificado de este caso hipotético, antes de otros ajustes aplicables.', items: [{ label: '1 · IVA trasladado', detail: '$16,000 cobrado a clientes.' }, { label: '2 · IVA acreditable hipotético', detail: '$9,600 de compras que suponemos acreditable para explicar el mecanismo.' }, { label: '3 · Diferencia inicial', detail: '$16,000 − $9,600 = $6,400.' }], body: 'La cifra es una ilustración pedagógica: verifica requisitos, periodo y reglas vigentes con una fuente oficial.', speakerNotes: 'Explica la resta paso a paso. Recalca que $6,400 es el resultado del caso hipotético, no una declaración fiscal ni una obligación automática.', hypothetical: true },
    { id: 'slide-6', type: 'decision', title: 'AHORA DECIDE TÚ', subtitle: 'CASO HIPOTÉTICO · Tu negocio cobró $116,000 a sus clientes este mes.', items: [{ label: 'Venta antes de IVA', value: '$100,000' }, { label: 'IVA trasladado', value: '$16,000' }, { label: 'IVA acreditable hipotético', value: '$9,600' }], body: '¿Cuánto deberías considerar inicialmente como IVA a cargo, antes de otros ajustes aplicables?\n\nA) $16,000    B) $6,400    C) $9,600', speakerNotes: 'Da tiempo para elegir. La respuesta del ejemplo es B: $6,400, calculado como $16,000 menos $9,600. No presentes esto como cálculo fiscal completo.', hypothetical: true },
    { id: 'slide-7', type: 'reveal', title: 'LA RESPUESTA DEL CASO\nES B) $6,400', subtitle: '$16,000 de IVA trasladado − $9,600 de IVA acreditable hipotético = $6,400.', body: 'La lógica separa el IVA cobrado del precio de venta y después muestra la resta del ejemplo. Otros ajustes y requisitos pueden cambiar el resultado aplicable.', speakerNotes: 'Revela la operación y vuelve a nombrar cada importe. Indica que una persona especialista debe validar el cálculo real y la normativa vigente.', hypothetical: true },
    { id: 'slide-8', type: 'cards', title: 'CÓMO EVITAR\nLA CONFUSIÓN', items: [{ label: 'Separa', detail: 'Registra el IVA trasladado fuera del ingreso propio.' }, { label: 'Identifica', detail: 'Distingue compras y el IVA acreditable hipotético.' }, { label: 'Revisa', detail: 'Comprueba requisitos y periodo antes de concluir.' }, { label: 'Protege', detail: 'No gastes el IVA cobrado como si fuera margen.' }], speakerNotes: 'Convierte el aprendizaje en una rutina de revisión. Evita afirmar obligaciones que no estén verificadas oficialmente.' },
    { id: 'slide-9', type: 'action', title: 'ACTÚA ANTES\nDE PRESENTAR', subtitle: 'Construye una conciliación simple del periodo.', body: 'Separa ventas antes de IVA, IVA trasladado e IVA de compras. Después marca qué importes requieren verificación oficial antes de usarlos en una declaración.', speakerNotes: 'Pide que definan una acción concreta para su siguiente cierre. La acción es de control interno, no una instrucción fiscal personalizada.' },
    { id: 'slide-10', type: 'closing', title: 'EL IVA COBRADO\nNO ES TODO TUYO', items: [{ label: 'Entiende', detail: 'Precio antes de IVA no es lo mismo que cobro total.' }, { label: 'Calcula', detail: 'Trasladado menos acreditable hipotético explica este caso.' }, { label: 'Verifica', detail: 'La aplicación real requiere revisar fuentes oficiales.' }], speakerNotes: 'Cierra con la diferencia entre cobro, ingreso propio y cálculo ilustrativo. Pide que la audiencia repita qué dato separará en su próximo cierre.' },
  ]
  return { ...input, id: `presentation-${Date.now()}`, title: topic, objective: input.objective || 'Comprender el IVA trasladado, el IVA acreditable y su efecto en el flujo de efectivo.', slides: withArtDirection(slides, topic) }
}

export function generatePresentation(input: Omit<Presentation, "id" | "slides">): Presentation {
  if (isIvaTopic(input.title)) return createIvaPresentation(input)
  const topic = clean(input.title, 'el tema central')
  const audience = clean(input.audience, 'tu audiencia')
  const objective = clean(input.objective, `entender ${topic} y actuar con claridad`)
  const level = clean(input.level, 'Básico')
  const duration = clean(input.duration, '25 minutos')
  const subject = makeTitle(topic)
  const slides: Slide[] = [
    { id: 'slide-1', type: 'cover', title: `${subject}`, subtitle: `¿Qué cambia cuando ${topic.toLowerCase()} deja de ser una idea y se convierte en una decisión?`, speakerNotes: `Abre con la pregunta y pide a ${audience} que describa qué está en juego.` },
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
  return { ...input, id: `presentation-${Date.now()}`, title: topic, audience, duration, level, objective, slides: slides.map((slide, index) => ({ ...slide, visualStrategy: createVisualStrategy(slide.type, index, topic) })) }
}
