'use client'

import jsPDF from 'jspdf'

export interface PDFArticle {
  title: string
  author: string
  category: string
  date: string
  excerpt: string
  content: string
  views?: number
}

export function generateArticlePDF(article: PDFArticle): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const margin = 20

  // Header bar
  pdf.setFillColor(10, 61, 122)
  pdf.rect(0, 0, pageW, 28, 'F')

  // Gold accent line
  pdf.setFillColor(201, 162, 39)
  pdf.rect(0, 28, pageW, 3, 'F')

  // Magazine name (using Latin chars for PDF compat)
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Al-Razi School Magazine', margin, 18)

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Halqa Thania - Boys School, Dubai, UAE', pageW - margin, 18, { align: 'right' })

  // Category badge
  pdf.setFillColor(201, 162, 39)
  pdf.roundedRect(margin, 40, 50, 8, 2, 2, 'F')
  pdf.setTextColor(10, 61, 122)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text(article.category, margin + 25, 45.5, { align: 'center' })

  // Title area
  pdf.setTextColor(10, 61, 122)
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  const titleLines = pdf.splitTextToSize(article.title, pageW - margin * 2)
  pdf.text(titleLines, margin, 60)

  const titleHeight = titleLines.length * 8
  let y = 60 + titleHeight + 5

  // Divider
  pdf.setDrawColor(201, 162, 39)
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, pageW - margin, y)
  y += 6

  // Meta info
  pdf.setTextColor(90, 106, 138)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`Author: ${article.author}`, margin, y)
  pdf.text(`Date: ${article.date}`, pageW / 2, y, { align: 'center' })
  pdf.text(`Views: ${article.views || 0}`, pageW - margin, y, { align: 'right' })
  y += 10

  // Excerpt box
  pdf.setFillColor(244, 247, 252)
  pdf.setDrawColor(10, 61, 122)
  pdf.setLineWidth(0.3)
  pdf.rect(margin, y, pageW - margin * 2, 20, 'FD')
  pdf.setTextColor(10, 61, 122)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'italic')
  const excerptLines = pdf.splitTextToSize(article.excerpt, pageW - margin * 2 - 8)
  pdf.text(excerptLines.slice(0, 2), margin + 4, y + 7)
  y += 26

  // Content
  pdf.setTextColor(26, 26, 46)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')

  // Strip HTML tags
  const cleanContent = article.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const contentLines = pdf.splitTextToSize(cleanContent, pageW - margin * 2)

  for (const line of contentLines) {
    if (y > pageH - 30) {
      // Footer before new page
      addPDFFooter(pdf, pageW, pageH, margin)
      pdf.addPage()
      // Header on new page
      pdf.setFillColor(10, 61, 122)
      pdf.rect(0, 0, pageW, 12, 'F')
      pdf.setFillColor(201, 162, 39)
      pdf.rect(0, 12, pageW, 1.5, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Al-Razi School Magazine', margin, 8)
      y = 22
    }
    pdf.text(line, margin, y)
    y += 6
  }

  // Footer on last page
  addPDFFooter(pdf, pageW, pageH, margin)

  pdf.save(`${article.title.slice(0, 30).replace(/\s+/g, '-')}.pdf`)
}

function addPDFFooter(pdf: jsPDF, pageW: number, pageH: number, margin: number) {
  pdf.setFillColor(10, 61, 122)
  pdf.rect(0, pageH - 14, pageW, 14, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Al-Razi School Magazine © 2026 | Dubai, UAE', margin, pageH - 5)
  pdf.text(`Page ${pdf.getCurrentPageInfo().pageNumber}`, pageW - margin, pageH - 5, { align: 'right' })
}

export function generateMagazinePDF(articles: PDFArticle[], issueNumber: number = 17): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  // === COVER PAGE ===
  pdf.setFillColor(10, 61, 122)
  pdf.rect(0, 0, pageW, pageH, 'F')

  // Gold decorative lines
  pdf.setFillColor(201, 162, 39)
  pdf.rect(0, pageH * 0.55, pageW, 2, 'F')
  pdf.rect(0, pageH * 0.57, pageW, 0.5, 'F')

  // Cover title
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(36)
  pdf.setFont('helvetica', 'bold')
  pdf.text('AL-RAZI', pageW / 2, pageH * 0.3, { align: 'center' })

  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'normal')
  pdf.text('SCHOOL MAGAZINE', pageW / 2, pageH * 0.38, { align: 'center' })

  pdf.setTextColor(201, 162, 39)
  pdf.setFontSize(13)
  pdf.text(`Issue #${issueNumber} | May 2026`, pageW / 2, pageH * 0.46, { align: 'center' })

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(11)
  pdf.text('Halqa Thania - Boys School', pageW / 2, pageH * 0.62, { align: 'center' })
  pdf.setFontSize(10)
  pdf.text('Dubai, United Arab Emirates', pageW / 2, pageH * 0.67, { align: 'center' })

  pdf.setFontSize(9)
  pdf.setTextColor(201, 162, 39)
  pdf.text(`${articles.length} Articles | Educational Excellence Since 2010`, pageW / 2, pageH * 0.85, { align: 'center' })

  // TOC Page
  pdf.addPage()
  pdf.setFillColor(10, 61, 122)
  pdf.rect(0, 0, pageW, 20, 'F')
  pdf.setFillColor(201, 162, 39)
  pdf.rect(0, 20, pageW, 2, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Table of Contents', 20, 13)

  let tocY = 35
  pdf.setTextColor(26, 26, 46)
  pdf.setFontSize(11)
  articles.forEach((art, i) => {
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(10, 61, 122)
    pdf.text(`${i + 1}.`, 20, tocY)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(26, 26, 46)
    const shortTitle = art.title.length > 60 ? art.title.slice(0, 60) + '...' : art.title
    pdf.text(shortTitle, 30, tocY)
    pdf.setTextColor(90, 106, 138)
    pdf.setFontSize(9)
    pdf.text(art.category, 30, tocY + 5)
    pdf.setFontSize(11)
    tocY += 14
  })

  // Article pages
  articles.forEach((article) => {
    pdf.addPage()
    const margin = 18

    pdf.setFillColor(10, 61, 122)
    pdf.rect(0, 0, pageW, 22, 'F')
    pdf.setFillColor(201, 162, 39)
    pdf.rect(0, 22, pageW, 2, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Al-Razi School Magazine', margin, 14)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.text(article.category, pageW - margin, 14, { align: 'right' })

    // Title
    pdf.setTextColor(10, 61, 122)
    pdf.setFontSize(15)
    pdf.setFont('helvetica', 'bold')
    const tLines = pdf.splitTextToSize(article.title, pageW - margin * 2)
    pdf.text(tLines, margin, 34)

    let y = 34 + tLines.length * 7 + 4

    pdf.setDrawColor(201, 162, 39)
    pdf.setLineWidth(0.4)
    pdf.line(margin, y, pageW - margin, y)
    y += 5

    pdf.setTextColor(90, 106, 138)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`By ${article.author}  |  ${article.date}`, margin, y)
    y += 8

    const cleanContent = article.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const lines = pdf.splitTextToSize(cleanContent, pageW - margin * 2)
    pdf.setTextColor(26, 26, 46)
    pdf.setFontSize(10)
    lines.forEach((line: string) => {
      if (y > pageH - 20) { addPDFFooter(pdf, pageW, pageH, margin); pdf.addPage(); y = 20 }
      pdf.text(line, margin, y)
      y += 5.5
    })

    addPDFFooter(pdf, pageW, pageH, margin)
  })

  pdf.save(`al-razi-magazine-issue-${issueNumber}.pdf`)
}
