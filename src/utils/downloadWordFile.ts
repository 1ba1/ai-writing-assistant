import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver' // Optional: For easier file saving

export function downloadWordFile(responseText: string) {
  // Create a new document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'AI Response',
                bold: true,
                size: 28, // Font size in half-points (14pt = 28)
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: responseText,
                size: 24, // Font size (12pt = 24)
              }),
            ],
          }),
        ],
      },
    ],
  })

  // Generate the .docx file
  Packer.toBlob(doc).then((blob) => {
    // Save the file
    saveAs(blob, 'AI_Response.docx')
  })
}
