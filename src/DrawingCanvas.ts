import rough from "roughjs";

import { NoteElement } from "./interfaces/NoteElement";
import { Note } from "./interfaces/Note";

const generator = rough.generator();

let drawing : boolean = false;
let colorInput : HTMLInputElement | null = null;

let note : Note = {
    orientation: "",
    type: "",
    countPage: 0,
    elements: []
} 

export async function drawCanvas() {
	console.log(`[DrawingCanvas] drawCanvas()`)
    const canvas = document.getElementById("note-canvas") as HTMLCanvasElement;

    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);

    colorInput = document.getElementById("color-input") as HTMLInputElement;
    
    if (context) {
        const roughCanvas = rough.canvas(canvas);
        note.elements.forEach((element) => roughCanvas.draw(element.canvasElement));
        await modifiyNoteFile();
    } else {
        console.error("Unable to get 2D context for canvas");
    }
    
}

export function createElement(x1: number, y1: number, x2: number, y2: number) : NoteElement {
    const canvasElement = generator.line(x1, y1, x2, y2, {
        stroke: colorInput == null ? "#000000" : colorInput.value,
        strokeWidth: 2
    });

    return {x1, y1, x2, y2, canvasElement}
}

export async function readNoteFile() {
    const activeFile = await this.app.workspace.getActiveFile();
    const loadedNote : Note = await JSON.parse(await this.app.vault.read(activeFile));
    note = loadedNote;
    await drawCanvas()
}

export async function modifiyNoteFile() {
    const activeFile = await this.app.workspace.getActiveFile();

    await this.app.vault.modify(activeFile, JSON.stringify(note));
}

export function handleMouseDown(event : MouseEvent) {
    drawing = true;

    const {clientX, clientY} = event;
	console.log(`mouseDown: x=${clientX}, y=${clientY}`)

    const element : NoteElement = createElement(clientX, clientY, clientX, clientY);
    note.elements.push(element);

    drawCanvas();
}

export function handleMouseMove(event : MouseEvent) {
    if(!drawing) return;
    
    const {clientX, clientY} = event;
	console.log(`mouseMove: cX=${clientX}, cY=${clientY}`)

    const index = note.elements.length - 1;
    const { x1, y1 } = note.elements[index];

	console.log(`mouseMove: x1=${clientX}, y1=${clientY}`)

    const updatedElement = createElement(x1, y1, clientX, clientY);

    // update last element
    note.elements[index] = updatedElement;

    drawCanvas();
}

export function handleMouseUp(event : MouseEvent) {
    drawing = false;
}
