export function streamPDF(doc: PDFKit.PDFDocument):Promise<Buffer>{
    return new Promise((resolve, reject)=>{
        const chunks: Buffer[] = [];
        doc.on("data", chunk => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);
        doc.end();
    })
}