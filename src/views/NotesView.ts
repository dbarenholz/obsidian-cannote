import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { createElement, readNoteFile } from "src/DrawingCanvas";
import { NoteElement } from "src/interfaces/NoteElement";
import { handleMouseDown, handleMouseMove, handleMouseUp, handleResetCanvas } from "src/DrawingCanvas";

export const VIEW_TYPE_NOTES = "notes-view";

export class NotesView extends FileView {

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_NOTES;
    }

    getDisplayText() {
        return "Note";
    }

    async onOpen() { 
        
        this.app.workspace.onLayoutReady(() => {
            const container = this.containerEl.children[1];
            container.empty();

            const toolbarDiv = container.createDiv({
                cls: "toolbar",
                attr: {
                    id: "toolbar"
                }
            });

            const colorDiv = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "color"
                }
            })
            
            colorDiv.createEl("input", {
                type: "color",
                cls: "color-input",
                value: "#000000",
                attr: {
                    id: "color-input"
                },
            })

            const lineDiv = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "line"
                }
            })

            lineDiv.createEl("input", {
                type: "radio",
                cls: "line-input",
                value: "line-input",
                attr: {
                    id: "line-input",
                    name: "select-tool"
                }
            })

            lineDiv.createEl("label", {
                text: "Line",
            });

            const rectangleDiv = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "rectangle"
                }
            })

            rectangleDiv.createEl("input", {
                type: "radio",
                cls: "rectangle-input",
                value: "rectangle-input",
                attr: {
                    id: "rectangle-input",
                    name: "select-tool"
                }
            })

            rectangleDiv.createEl("label", {
                text: "Rectangle",
            });

            const pencilDvi = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "pencil"
                }
            })

            pencilDvi.createEl("input", {
                type: "radio",
                cls: "pencil-input",
                value: "pencil-input",
                attr: {
                    id: "pencil-input",
                    name: "select-tool"
                }
            })

            pencilDvi.createEl("label", {
                text: "Pencil",
            });

            const resetCanvasButton = toolbarDiv.createEl("button", {
                cls: "reset-canvas",
                text: "Clear Drawings",
                attr: {
                    id: "reset-button"
                }
            })

            resetCanvasButton.addEventListener("click", resetCanvas)
    
            const canvas = container.createEl("canvas", {
                cls: "note-canvas", 
                attr: {
                    id: "note-canvas",
                    width: 800,
                    height: 800,
                },
            });

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

function resetCanvas (event : MouseEvent) {
    handleResetCanvas(event);
}