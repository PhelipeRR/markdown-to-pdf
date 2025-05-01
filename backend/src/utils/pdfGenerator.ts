import puppeteer from "puppeteer";

export const generatePDF = async (markdownHtml: string, css: string): Promise<Buffer> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = `<html><head><style>${css}</style></head><body>${markdownHtml}</body></html>`;
    await page.setContent(content);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();
    return Buffer.from(pdfBuffer);
};
