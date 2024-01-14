import { normalizePath, Notice } from "obsidian";
import { createNoteModal } from "./modals/CreateNoteModal";
import { INote } from "./interfaces/INote";
import { EXTENSION_TYPE_NOTES } from "./constants";

export async function createNote(filePath: string) {

    new createNoteModal(this.app, async (title, type, orientation) => {
       filePath = filePath.concat(`${title}`, ".", EXTENSION_TYPE_NOTES)

        const note : INote = {
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

export function replaceLastSegment(inputString: string) {
    const regex = /[^/]+$/;

    // Replace the matched segment with the given replacement
    const result = inputString.replace(regex, '');
    return result;
}



