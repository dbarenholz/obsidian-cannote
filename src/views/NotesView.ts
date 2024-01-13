import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { createElement, readNoteFile } from "src/DrawingCanvas";
import { NoteElement } from "src/interfaces/NoteElement";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "src/DrawingCanvas";

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
			console.log(`[NotesView] onOpen() - layout ready`)

            const container = this.containerEl.children[1];

            container.empty();

			// Create many extra elements

            const toolbarDiv = container.createDiv({
                cls: "toolbar",
                attr: {
                    id: "toolbar"
                }
            });

            const colorDiv = toolbarDiv.createDiv({
                cls: "color",
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
                cls: "line",
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
                cls: "rectangle",
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

            const pencilDiv = toolbarDiv.createDiv({
                cls: "pencil",
                attr: {
                    id: "pencil"
                }
            })

            pencilDiv.createEl("input", {
                type: "radio",
                cls: "pencil-input",
                value: "pencil-input",
                attr: {
                    id: "pencil-input",
                    name: "select-tool"
                }
            })

            pencilDiv.createEl("label", {
                text: "Pencil",
            });

    
            const canvas = container.createEl("canvas", {
                cls: "note-canvas", 
                attr: {
                    id: "note-canvas",
                }
            });
			console.log(canvas)
			console.log(canvas.getBoundingClientRect())
    
            canvas.width = 900;
            canvas.height = 900;
    
            canvas.addEventListener('mousedown', mouseDown)
            canvas.addEventListener('mousemove', mouseMove)
            canvas.addEventListener('mouseup', mouseUp)
        })
    }

    async onClose() {
		console.log(`[NotesView] onClose()`)
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
