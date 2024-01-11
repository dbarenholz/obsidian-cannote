import { normalizePath, Notice, TFile } from "obsidian";
import { createNoteModal } from "./modals/createNoteModal";


export async function createNote(filePath: string) {


    new createNoteModal(this.app, async (title, type, orientation) => {
        //Currently no PDF Functionallity -> only blank canvas
        //const pdfTemplate = await this.app.vault.adapter.readBinary(normalizePath(`./.obsidian/plugins/obsidian-pdf-notes/templates/${orientation}/A4/${type}.pdf`));  

        filePath = filePath.concat(`${title}`, ".pdfnotes")

        // Create data object to store the necessary information in custom file
        const data = {
            context: null, 
            orientation: orientation,
            type: type,
        };

        const binaryData = encodeBinary(data);       
    
        if(!(await this.app.vault.adapter.exists(normalizePath(filePath)))){
            await app.vault.createBinary(filePath, binaryData);
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

export function encodeBinary(data : any) : ArrayBuffer {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(jsonString).buffer;
    return binaryData;
}

export function decodeBinary(binaryData : ArrayBuffer) : any {
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(binaryData);
    const fileData = JSON.parse(jsonString);
    return fileData;
}

/*
export async function addNewPDFPage(file : TFile) {
        
    const pdfFile = await this.app.vault.adapter.readBinary(normalizePath(file.path));

    const loadPDFFile = await PDFDocument.load(pdfFile);
    const pages = loadPDFFile.getPages()
    const lastPage = pages.last();
    loadPDFFile.addPage(lastPage)
    const test = await loadPDFFile.save()

    app.vault.modifyBinary(file, test);
    console.log("successfull")
}
*/



