import { App, ColorComponent, ExtraButtonComponent, Modal, Setting } from "obsidian";

/*
interface PDF {
    title: string;
    type: string;
    format: string;
    orientation: string;
    path: string;
}*/

export class createPDFModal extends Modal {
    title: string;
    type: string;
    orientation: string;
    onSubmit: (title: string, type: string, orientation: string) => void;

    constructor(app: App, onSubmit: (title: string, type: string, orientation: string) => void) {
        super(app);
        this.onSubmit = onSubmit
    }

    onOpen() {
        const { contentEl } = this;
    
        contentEl.createEl("h1", { text: "Create new PDF-File" });
    
        new Setting(contentEl)
          .setName("Title:")
          .addText((text) =>
            text.onChange((value) => {
              this.title = value
            }));

        new Setting(contentEl)
        .setName("Orientation:")
        .addDropdown( (dropdown) => {
          //add dropdown page types
          dropdown.addOption("horizontal", "horizontal")
          dropdown.addOption("vertical", "vertical")

          dropdown.setValue("vertical");
          this.orientation = "vertical";

          dropdown.onChange((value) => {
            this.orientation = value;
          })
        });

        new Setting(contentEl)
        .setName("Type:")
        .addDropdown( (dropdown) => {
          //add dropdown page types
          dropdown.addOption("squared", "squared")
          dropdown.addOption("lined", "lined")
          dropdown.addOption("dotted", "dotted")
          dropdown.addOption("blank", "blank")

          dropdown.setValue("squared");
          this.type = "squared";
          
          dropdown.onChange((value) => {
            this.type = value;
          })
        });

        new Setting(contentEl)
          .addButton((btn) =>
            btn
              .setButtonText("Submit")
              .setCta()
              .onClick(() => {
                this.close();
                this.onSubmit(this.title, this.type, this.orientation);
              }));
      }
    
      onClose() {
        let { contentEl } = this;
        contentEl.empty();
      }
}