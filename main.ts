import { normalizePath, Notice, Plugin, TFile, TFolder, View, WorkspaceLeaf } from 'obsidian';
import { createNote, replaceLastSegment } from 'src/utils';
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
				createNote(currentFilePath);
			} else {
				createNote(normalizePath("/"));
			}
		})

		this.app.workspace.on('file-menu', (menu, file) => {
			if(file instanceof TFolder) {
				menu.addItem((item) => {
					item.setTitle("Create new Drawing");
					item.setSection("Notes");
					item.setIcon("pen")
					item.onClick(async () => {
						createNote(file.path);
					});
				});
			} 

			if(file instanceof TFile) {

				file == null ? console.log(null) : console.log(file);

				if(file.extension == 'pdfnotes') {
					menu.addItem((item) => {
						item.setTitle("Edit Drawing");
						item.setSection("Notes");
						item.setIcon("pen")
						item.onClick(async () => {
							//Creates new PDF-File
							console.log('Edit a drawing in folder:', file.path);
						});
					});
				}
			}
		});

		this.app.workspace.on("file-open", (file) => {
			console.log("FILE OPEN: " + file?.basename)
			if(file != null && file.extension == "pdfnotes") {
				this.activateView();
			}
		})		
	}

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

}