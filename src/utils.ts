import { normalizePath, Notice } from "obsidian";
import { createPDFModal } from "./modals/createPDFModal";

export async function createPDF(filePath: string) {

    new createPDFModal(this.app, async (title, type, orientation) => {
        console.log(normalizePath(`./.obsidian/plugins/obsidian-pdf-notes/templates/${orientation}/A4/${type}.pdf`));
        const pdfFile = await this.app.vault.adapter.readBinary(normalizePath(`./.obsidian/plugins/obsidian-pdf-notes/templates/${orientation}/A4/${type}.pdf`));
        filePath = filePath.concat("/", `${title}`, ".pdf")
    
        if(!(await this.app.vault.adapter.exists(normalizePath(filePath)))){
            this.app.vault.createBinary(filePath, pdfFile);
        } else {
            new Notice("File already exists");
        }
    }).open();
}

export function replaceLastSegment(inputString: string) {
    const regex = /[^/]+$/;

    // Replace the matched segment with the given replacement
    const result = inputString.replace(regex, '');
    
    return result;
}