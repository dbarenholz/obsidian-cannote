import { NoteElement } from "./NoteElement";

export interface Note {
    orientation: string;
    type: string;
    countPage: number;
    elements: NoteElement[]; 
}