import { normalizePath, Notice, Plugin, TFile, TFolder } from 'obsidian';
import { createPDF, replaceLastSegment } from 'src/utils';


export default class PDFNotes extends Plugin {

	onload() {
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


		//Event to register, when a PDF-File is open
		//Futher, integrate a Button, to start annotation of PDF over a button in the tool bar
		//Missing Implementation of button
		this.app.workspace.on('file-open', (file) => {
			if(file?.extension == 'pdf') {
				//console.log("It's a PDF-File")
			}
		});
	}
}