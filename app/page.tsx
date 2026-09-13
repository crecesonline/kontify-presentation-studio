'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Copy, Download, Edit3, FileText, Maximize2, MoreHorizontal, Play, Plus, Save, Sparkles, Trash2 } from 'lucide-react'
import { createDemoPresentation, generatePresentation, type Presentation, type Slide, type SlideType } from '@/lib/presentation-model'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000003ae481f5bc5cb70c13c22a2b-diqfpuoqhA0qZXOk3wALDcYVjzzBY2.png'

function Brand() {
  return <div className="brand"><img src={logoUrl} alt="Kontify" /><span>Presentation Studio</span></div>
}

function SlideCanvas({ slide, number, total, presenting = false }: { slide: Slide; number: number; total: number; presenting?: boolean }) {
  return <div className={`slide-canvas slide-${slide.type} ${presenting ? 'presenting' : ''}`}>
    <div className="slide-top"><img src={logoUrl} alt="Kontify" /><span>{String(number).padStart(2, '0')}</span></div>
    <div className="slide-content">
      {slide.type === 'cover' && <div className="cover-mark">KONTIFY<br /><small>ACADEMY</small></div>}
      {slide.type === 'figure' && <div className="eyebrow">CIFRA PROTAGONISTA</div>}
      {slide.type === 'provocation' && <div className="eyebrow">CONFRONTA</div>}
      <h1>{slide.title.split('\n').map((part, index) => <span key={part + index}>{part}{index < slide.title.split('\n').length - 1 && <br />}</span>)}</h1>
      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
      {slide.items && <div className={`slide-items items-${Math.min(slide.items.length, 5)}`}>
        {slide.items.map((item, index) => <div className="slide-item" key={item.label + index}><div className="item-index">{slide.type === 'cards' && slide.items!.length === 4 ? index + 1 : ''}</div><strong>{item.value || item.label}</strong>{item.value && <span>{item.label}</span>}{item.detail && <small>{item.detail}</small>}</div>)}
      </div>}
      {slide.body && <div className="slide-body">{slide.accent && <b>{slide.accent} </b>}{slide.body}</div>}
      {slide.type === 'reveal' && <div className="reveal-orb" aria-hidden="true" />}
      {slide.type === 'action' && <div className="action-line" aria-hidden="true" />}
    </div>
    <div className="slide-footer">KONTIFY ACADEMY <span>Decisiones con Claridad</span></div>
    {slide.hypothetical && <div className="hypothetical">CASO HIPOTÉTICO</div>}
  </div>
}

function SlideThumbnail({ slide, index, selected, onClick }: { slide: Slide; index: number; selected: boolean; onClick: () => void }) {
  return <button className={`thumbnail ${selected ? 'selected' : ''}`} onClick={onClick}><SlideCanvas slide={slide} number={index + 1} total={10} /><span>{String(index + 1).padStart(2, '0')}</span></button>
}

function Home({ onGenerate, onOpenDemo }: { onGenerate: (p: Presentation) => void; onOpenDemo: () => void }) {
  const [form, setForm] = useState({ title: '', audience: '', duration: '25 minutos', level: 'Básico', objective: '' })
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  return <main className="home-shell"><header className="topbar"><Brand /><div className="saved-pill"><span className="status-dot" /> Borrador local</div></header><section className="home-grid"><div className="home-copy"><p className="overline">KONTIFY PRESENTATION STUDIO</p><h1>Ideas que se convierten en <em>decisiones.</em></h1><p className="lede">Crea presentaciones ejecutivas y pedagógicas con la metodología KONTIFY. Una idea principal por diapositiva. Una decisión al final.</p><div className="method"><span>CONFRONTA</span><i>→</i><span>DESCUBRE</span><i>→</i><span>ACTÚA</span></div></div><form className="prompt-card" onSubmit={(event) => { event.preventDefault(); onGenerate(generatePresentation({ ...form, title: form.title || 'El misterio del dinero invisible' })) }}><div className="card-heading"><div><p className="overline">NUEVA PRESENTACIÓN</p><h2>¿Qué necesitas explicar?</h2></div><Sparkles size={19} /></div><label>TEMA<input required value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Ej. Utilidad vs. flujo de efectivo" /></label><div className="two-col"><label>AUDIENCIA<input value={form.audience} onChange={(e) => update('audience', e.target.value)} placeholder="Dueños de PyMEs" /></label><label>DURACIÓN<select value={form.duration} onChange={(e) => update('duration', e.target.value)}><option>15 minutos</option><option>25 minutos</option><option>45 minutos</option><option>60 minutos</option></select></label></div><div className="two-col"><label>NIVEL<select value={form.level} onChange={(e) => update('level', e.target.value)}><option>Básico</option><option>Intermedio</option><option>Avanzado</option></select></label><label>OBJETIVO<input value={form.objective} onChange={(e) => update('objective', e.target.value)} placeholder="Qué debe poder decidir" /></label></div><button className="primary-button" type="submit">GENERAR PRESENTACIÓN KONTIFY <ChevronRight size={17} /></button><button className="demo-button" type="button" onClick={onOpenDemo}><Play size={15} /> Abrir presentación demo</button></form></section><footer className="home-footer"><span>ADN VISUAL KONTIFY</span><span>20 COMPONENTES · 16:9 · MÉTODO PEDAGÓGICO</span></footer></main>
}

function Editor({ presentation, onBack }: { presentation: Presentation; onBack: () => void }) {
  const [deck, setDeck] = useState(presentation)
  const [selected, setSelected] = useState(0)
  const [mode, setMode] = useState<'edit' | 'present'>('edit')
  const slide = deck.slides[selected]
  const [saved, setSaved] = useState(false)
  const updateSlide = (patch: Partial<Slide>) => setDeck((current) => ({ ...current, slides: current.slides.map((item, index) => index === selected ? { ...item, ...patch } : item) }))
  const move = (direction: -1 | 1) => setDeck((current) => { const slides = [...current.slides]; const next = selected + direction; if (next < 0 || next >= slides.length) return current; [slides[selected], slides[next]] = [slides[next], slides[selected]]; setSelected(next); return { ...current, slides } })
  const duplicate = () => setDeck((current) => ({ ...current, slides: [...current.slides.slice(0, selected + 1), { ...current.slides[selected], id: `slide-${Date.now()}` }, ...current.slides.slice(selected + 1)] }))
  const remove = () => setDeck((current) => ({ ...current, slides: current.slides.filter((_, index) => index !== selected) }))
  const add = () => setDeck((current) => ({ ...current, slides: [...current.slides, { id: `slide-${Date.now()}`, type: 'figure', title: 'Nueva idea protagonista', body: 'Edita esta diapositiva para desarrollar tu argumento.', speakerNotes: 'Añade aquí el guion del expositor.' }] }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200) }
  const present = mode === 'present'
  if (present) return <div className="present-view"><button className="exit-present" onClick={() => setMode('edit')}><ArrowLeft size={16} /> Salir</button><SlideCanvas slide={slide} number={selected + 1} total={deck.slides.length} presenting /><div className="present-controls"><button onClick={() => setSelected(Math.max(0, selected - 1))}><ChevronLeft /></button><span>{selected + 1} / {deck.slides.length}</span><button onClick={() => setSelected(Math.min(deck.slides.length - 1, selected + 1))}><ChevronRight /></button></div></div>
  return <main className="studio-shell"><header className="studio-topbar"><button className="back-button" onClick={onBack}><ArrowLeft size={16} /> Mis presentaciones</button><Brand /><div className="studio-actions"><button className="ghost-button" onClick={() => setMode('present')}><Play size={15} /> Presentar</button><button className="save-button" onClick={save}><Save size={15} /> {saved ? 'Guardado' : 'Guardar'}</button><button className="icon-button" aria-label="Más opciones"><MoreHorizontal size={18} /></button></div></header><div className="studio-body"><aside className="slides-rail"><div className="rail-heading"><span>DIAPOSITIVAS <b>{deck.slides.length}</b></span><button className="icon-button" onClick={add} aria-label="Agregar diapositiva"><Plus size={17} /></button></div><div className="thumbnail-list">{deck.slides.map((item, index) => <SlideThumbnail key={item.id} slide={item} index={index} selected={selected === index} onClick={() => setSelected(index)} />)}</div></aside><section className="canvas-area"><div className="canvas-toolbar"><div><p className="overline">EDITAR DIAPOSITIVA {String(selected + 1).padStart(2, '0')}</p><h1>{deck.title}</h1></div><div className="canvas-tools"><button onClick={duplicate}><Copy size={15} /> Duplicar</button><button onClick={() => move(-1)} disabled={selected === 0}><ChevronLeft size={15} /> Mover</button><button onClick={() => move(1)} disabled={selected === deck.slides.length - 1}><ChevronRight size={15} /></button><button onClick={remove} disabled={deck.slides.length <= 1}><Trash2 size={15} /></button></div></div><div className="main-canvas"><SlideCanvas slide={slide} number={selected + 1} total={deck.slides.length} /></div><div className="editor-panel"><div className="panel-tabs"><button className="active">Contenido</button><button>Notas del expositor</button><button>Layout</button><button>Visual</button></div><label>TÍTULO<textarea rows={2} value={slide.title} onChange={(e) => updateSlide({ title: e.target.value })} /></label><label>SUBTÍTULO<textarea rows={2} value={slide.subtitle || ''} onChange={(e) => updateSlide({ subtitle: e.target.value })} /></label><label>CONTENIDO VISIBLE<textarea rows={3} value={slide.body || ''} onChange={(e) => updateSlide({ body: e.target.value })} /></label><label>NOTAS DEL EXPOSITOR<textarea rows={4} value={slide.speakerNotes} onChange={(e) => updateSlide({ speakerNotes: e.target.value })} /></label></div></section></div></main>
}

export default function Page() {
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const demo = useMemo(() => createDemoPresentation(), [])
  return presentation ? <Editor presentation={presentation} onBack={() => setPresentation(null)} /> : <Home onGenerate={setPresentation} onOpenDemo={() => setPresentation(demo)} />
}
