import rough from "roughjs";
import { INote } from "../interfaces/INote";
import { Notice } from "obsidian";
import { INoteElement } from "../interfaces/INoteElement";
import { readNoteFile, modifiyNoteFile, clearNoteFile } from "./NoteFile";
import { IPoint } from "src/interfaces/IPoint";
import doc from "pdfkit";
import { Drawable } from "roughjs/bin/core";

const generator = rough.generator();
const seed = rough.newSeed();

var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var selectedTool: string;
var color: string;

var drawing: boolean = false;

var note: INote = {
    orientation:"",
    type: "",
    countPage: 0,
    elements: []
}

export async function initCanvas() {
    canvas = document.getElementById("note-canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    selectedTool = "line";
    color = "#000000";
    
    note = await readNoteFile(note);
    await drawElements();
}

export async function drawElements() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (context) {
        const roughCanvas = rough.canvas(canvas);         

        note.elements.forEach( (element : INoteElement) => {
          
            const {finalPoint1, finalPoint2} = calculateOffset(element);

            switch(element.shapeElement.shape) {
                case "line" : {
                    roughCanvas.line(finalPoint1.x, finalPoint1.y, finalPoint2.x, finalPoint2.y, {
                        seed: seed,
                        stroke: element.color
                    })
                    break;
                }
                case "rectangle" : {
                    roughCanvas.rectangle(finalPoint1.x, finalPoint1.y, finalPoint2.x - finalPoint1.x, finalPoint2.y - finalPoint1.y, {
                        seed: seed,
                        stroke: element.color
                    })
                    break;
                }  
            }
        })

        await modifiyNoteFile(note);
    } else {
        new Notice("Unable to get 2D context for canvas");
    }  
}

function createElement(x1: number, y1: number, x2: number, y2: number) : INoteElement {
    // TODO: check radio button which shape should be drawn

    var shapeElement : Drawable;

    switch(selectedTool) {
        case "line": {
            shapeElement = generator.line(x1, y1, x2, y2, {
                seed: seed
            });
            break;
        }
        case "rectangle": {
            shapeElement = generator.rectangle(x1, y1, x2, y2, {
                seed: seed
            });
            break;
        }
        default: {
            console.error("Invald tool choosen");
            shapeElement = generator.line(x1, y1, x2, y2, {
                seed: seed
            });
            break;
        }
    }

    const { left, top }: DOMRect = canvas.getBoundingClientRect();

    const point1: IPoint = {x: x1, y: y1};
    const point2: IPoint = {x: x2, y: y2};
    const offsetPoint : IPoint = {x: left, y: top};

    return {point1, point2, offsetPoint, shapeElement, color, seed, pageNum: 1}
}

export function handleMouseDown(event : MouseEvent) {
    drawing = true;

    const {clientX, clientY} = event;

    const element : INoteElement = createElement(clientX, clientY, clientX, clientY);
    note.elements.push(element);

    drawElements();
}

export function handleMouseMove(event : MouseEvent) {
    if(!drawing) return;
    
    const {clientX, clientY} = event;

    const index = note.elements.length - 1;
    const { point1 } = note.elements[index];
    const updatedElement = createElement(point1.x, point1.y, clientX, clientY);

    note.elements[index] = updatedElement;

    drawElements();
}

export function handleMouseUp(event : MouseEvent) {
    drawing = false;
}

export async function handleResetCanvas(event: MouseEvent) {
    await clearNoteFile(note);
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export function handleInputChange(event: MouseEvent) {
    const input = event.target;

    if(input.name == "select-tool") {   
        if(input.id == "pencil-input") {
            new Notice("Pencil not implemented")
            selectedTool = "line";
            return;
        }
        selectedTool = input.value;
    } else if (input.name == "color-selection") {
        color = input.value;
    }
}


function calculateOffset(element: INoteElement): { finalPoint1: IPoint; finalPoint2: IPoint } {

    const finalPoint1 = {
        x: element.point1.x - element.offsetPoint.x,
        y: element.point1.y - element.offsetPoint.y
    }

    const finalPoint2 = {
        x: element.point2.x - element.offsetPoint.x,
        y: element.point2.y - element.offsetPoint.y
    }

    return {finalPoint1, finalPoint2}
}