import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { createElement, readNoteFile } from "src/DrawingCanvas";
import { NoteElement } from "src/interfaces/NoteElement";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "src/DrawingCanvas";

export const VIEW_TYPE_PDFNOTES = "pdfnotes-view";

export class PDFNotesView extends FileView {

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_PDFNOTES;
    }

    getDisplayText() {
        return "Note";
    }

    async onOpen() { 
        
        this.app.workspace.onLayoutReady(() => {
            const container = this.containerEl.children[1];
            container.empty();
    
            const canvas = container.createEl("canvas", {
                attr: {
                    id: "note-canvas",
                },
                cls: "note-canvas", 
            });
    
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
            canvas.addEventListener('mousedown', mouseDown)
            canvas.addEventListener('mousemove', mouseMove)
            canvas.addEventListener('mouseup', mouseUp)
        })
    }

    async onClose() {
       
    }
          
}

function mouseDown(event : MouseEvent) {
    handleMouseDown(event);
}


function mouseMove(event : MouseEvent) {
    handleMouseMove(event);
}


function mouseUp (event : MouseEvent) {
    handleMouseUp(event);
}