import { INoteElement } from "./INoteElement";

/**
 * Represents a note
 *
 * @interface INote
 * @field {Orientation} orientation of the paper
 * @field {Type} type of the paper
 * @field {number} count number of pages
 * @field {NoteElement[]} all elements in the note
 */

export interface INote {
    orientation: string;
    type: string;
    countPage: number;
    elements: INoteElement[]; 
}