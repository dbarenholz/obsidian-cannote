import { normalizePath, Plugin, TFile, TFolder, WorkspaceLeaf } from 'obsidian';
import { drawCanvas, readNoteFile } from 'src/DrawingCanvas';
import { EXTENSION_TYPE_NOTES } from 'src/constants';
import { createNote, replaceLastSegment } from 'src/utils';
import { NotesView, VIEW_TYPE_NOTES } from 'src/views/NotesView';


export default class PDFNotes extends Plugin {

	onload() {

		this.registerView(
			VIEW_TYPE_NOTES,
			(leaf) => new NotesView(leaf),
		);

		this.registerExtensions([EXTENSION_TYPE_NOTES], VIEW_TYPE_NOTES);

		this.addRibbonIcon('file', 'Create new Drawing', () => {

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
		});

		this.app.workspace.on("file-open", async (file)  => {
			if(file != null && file.extension == EXTENSION_TYPE_NOTES) {
				this.activateView();	

				const view = this.app.workspace.getLeavesOfType(VIEW_TYPE_NOTES)[0];
				if (view != null) {
					await readNoteFile();
					await drawCanvas();
				}
			}
		})

	}

	
	async activateView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_NOTES);
	
		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];
		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  leaf = workspace.getRightLeaf(false);
		  await leaf.setViewState({ type: VIEW_TYPE_NOTES, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	  }
	
}