import { normalizePath, Notice } from "obsidian";
import { createNoteModal } from "./modals/createNoteModal";
import { Note } from "./interfaces/note";

export async function createNote(filePath: string) {

    new createNoteModal(this.app, async (title, type, orientation) => {
       filePath = filePath.concat(`${title}`, ".pdfnotes")

        const note : Note = {
            orientation: orientation,
            type: type,
            countPage: 1,
            elements: []
        };
        
        const JSONNote = JSON.stringify(note);
    
        if(!(await this.app.vault.adapter.exists(normalizePath(filePath)))){
            await this.app.vault.create(filePath, JSONNote)
        } else {
            new Notice("File already exists");
        }
    }).open();
}

export async function encodeBinary(data: any): Promise<ArrayBuffer> {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(jsonString).buffer;
    return binaryData;
}

export async function decodeBinary(binaryData: ArrayBuffer): Promise<any> {
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(binaryData);
    const jsonData = JSON.parse(jsonString);
    return jsonData;
}


export function replaceLastSegment(inputString: string) {
    const regex = /[^/]+$/;

    // Replace the matched segment with the given replacement
    const result = inputString.replace(regex, '');
    return result;
}



