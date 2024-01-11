import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import { decodeBinary, encodeBinary } from "src/utils";

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
        const container = this.containerEl.children[1];
        container.empty();
        
        container.createEl("h1", {text: "Notes View!"} )

        /*
        const canvas = container.createEl("canvas", {
            attr: {
                id: "the-canvas"
            },
            cls: "the-canvas"
        });
    
        
        // Set canvas size to A4 paper size in pixels
        const a4WidthInPixels = 595; // A4 width in pixels (assuming 1mm = 1 pixel)
        const a4HeightInPixels = 842; // A4 height in pixels
    
        canvas.width = a4WidthInPixels;
        canvas.height = a4HeightInPixels;

        const activeFile = this.app.workspace.getActiveFile();
        console.log(activeFile)
        
        if(activeFile != null) {
            const fileDataBinary = await this.app.vault.readBinary(activeFile);
            const fileData = decodeBinary(fileDataBinary);

            var context = null;

            if(fileData.context != null) {
                context = fileData.context;
            } else {
                context = canvas.getContext("2d");
            }

            const data = {
                context: context, 
                orientation: fileData.orientation,
                type: fileData.orientation
            };

            this.app.vault.modifyBinary(activeFile, encodeBinary(data));
        } 
        */
    }
    
    
 
    async onClose() {
        // Nothing to clean up.
    }    
}