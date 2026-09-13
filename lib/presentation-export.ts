"use client"

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import pptxgen from 'pptxgenjs'

const WIDTH = 1600
const HEIGHT = 900

async function captureSlides(selector = '.export-slide') {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
  if (!nodes.length) throw new Error('No hay diapositivas disponibles para exportar.')
  return Promise.all(nodes.map(async (node) => {
    const canvas = await html2canvas(node, { scale: 2, width: WIDTH, height: HEIGHT, backgroundColor: '#03100b', useCORS: true, logging: false })
    return canvas.toDataURL('image/png', 1)
  }))
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export async function exportPresentationPdf(title: string) {
  const images = await captureSlides()
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [WIDTH, HEIGHT], compress: true })
  images.forEach((image, index) => { if (index) pdf.addPage([WIDTH, HEIGHT], 'landscape'); pdf.addImage(image, 'PNG', 0, 0, WIDTH, HEIGHT, undefined, 'FAST') })
  pdf.save(`${title.replace(/[^a-z0-9áéíóúñü]+/gi, '-').replace(/^-|-$/g, '') || 'kontify-presentacion'}.pdf`)
}

export async function exportPresentationPptx(title: string) {
  const images = await captureSlides()
  const pptx = new pptxgen()
  pptx.layout = 'LAYOUT_WIDE'
  pptx.author = 'KONTIFY Presentation Studio'
  pptx.subject = title
  pptx.title = title
  pptx.company = 'KONTIFY'
  pptx.lang = 'es-MX'
  images.forEach((image) => { const slide = pptx.addSlide(); slide.background = { color: '03100B' }; slide.addImage({ data: image, x: 0, y: 0, w: 13.333, h: 7.5 }) })
  await pptx.writeFile({ fileName: `${title.replace(/[^a-z0-9áéíóúñü]+/gi, '-').replace(/^-|-$/g, '') || 'kontify-presentacion'}.pptx` })
}

export function exportLimitations() {
  return 'PDF y PowerPoint usan una captura PNG de alta resolución del WebRenderer compartido para conservar el diseño con fidelidad. El PPTX es válido y editable a nivel de diapositiva, pero los elementos complejos se entregan como composición visual para evitar pérdidas de layout.'
}

export { WIDTH, HEIGHT }
