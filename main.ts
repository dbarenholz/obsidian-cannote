import { normalizePath, Notice, Plugin, TFile, TFolder, View, WorkspaceLeaf } from 'obsidian';
import { createPDF, replaceLastSegment } from 'src/utils';
import { PDFNotesView, VIEW_TYPE_PDFNOTES } from 'src/views/PDFNotesView';


export default class PDFNotes extends Plugin {

	onload() {

		this.registerView(
			VIEW_TYPE_PDFNOTES,
			(leaf) => new PDFNotesView(leaf)
		);

		this.registerExtensions(["pdfnotes"], VIEW_TYPE_PDFNOTES);

		this.addRibbonIcon('file', 'Create new PDF', () => {

			const curretFile = this.app.workspace.getActiveFile();
			if(curretFile != null) {
				const currentFilePath = replaceLastSegment(curretFile.path);
				createPDF(currentFilePath);
			} else {
				createPDF(normalizePath("/"));
			}
		})

		this.app.workspace.on('file-menu', (menu, file) => {
			if(file instanceof TFolder) {
				menu.addItem((item) => {
					item.setTitle("Create new Drawing");
					item.setSection("PDF-Notes");
					item.setIcon("pen")
					item.onClick(async () => {
						//Creates new PDF-File
						createPDF(file.path);
					});
				});
			} 

			if(file instanceof TFile) {
				if(file.extension == 'pdf') {
					menu.addItem((item) => {
						item.setTitle("Edit Drawing");
						item.setSection("PDF-Notes");
						item.setIcon("pen")
						item.onClick(async () => {
							//Creates new PDF-File
							console.log('Edit a drawing in folder:', file.path);
						});
					});
				}
			}
		});

		/*
		this.addCommand({
			id: 'add new page',
			name: 'Add a new Page at the bottom of the file',
			checkCallback: (checking: boolean) => {
				const currentFile = this.app.workspace.getActiveFile();
				if(currentFile) {
					if(!checking) {
						if(currentFile.extension == 'pdf') {
							addNewPDFPage(currentFile)
							return true;
						} 
					}
				}
				return false;
			}
		});
		*/
	}


	/*
	FROM OBSIDIAN DOCUMENTATION OF "VIEWS"

	async activateView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_PDFNOTES);
	
		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];
		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  leaf = workspace.getRightLeaf(false);
		  await leaf.setViewState({ type: VIEW_TYPE_PDFNOTES, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	  }
	  */
}