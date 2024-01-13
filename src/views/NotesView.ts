import { FileView, TFile, WorkspaceLeaf } from "obsidian";
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

            const line = lineDiv.createEl("input", {
                type: "radio",
                cls: "line-input",
                value: "line-input",
                attr: {
                    id: "line-input",
                    name: "select-tool",
                }
            })           

            lineDiv.createEl("label", {
                text: "Line",
                attr: {
                    for: "line-input"
                }
            });

            const rectangleDiv = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "rectangle"
                }
            })

            const rectangle = rectangleDiv.createEl("input", {
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
                attr: {
                    for: "rectangle-input"
                }
            });

            const pencilDiv = toolbarDiv.createDiv({
                cls: "item",
                attr: {
                    id: "pencil"
                }
            })

            const pencil = pencilDiv.createEl("input", {
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
                attr: {
                    for: "pencil-input"
                }
            });

            const resetCanvasButton = toolbarDiv.createEl("button", {
                cls: "reset-canvas",
                text: "Clear Drawings",
                attr: {
                    id: "reset-button"
                }
            })

            resetCanvasButton.addEventListener("click", resetCanvas)
    
            const canvasDiv = container.createDiv({
                cls: "canvas-div"
            });

            const canvas = canvasDiv.createEl("canvas", {
                cls: "note-canvas", 
                attr: {
                    id: "note-canvas",
                    width: 800,
                    height: 800,
                },
            });

            canvas.width = 794;
            canvas.height =  1123;

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