import { INote } from "src/interfaces/INote";

export async function readNoteFile(note: INote) : Promise<INote> {
    const activeFile = await this.app.workspace.getActiveFile();
    const loadedNote : INote = await JSON.parse(await this.app.vault.read(activeFile));
    note = loadedNote;

    return note;
}

export async function modifiyNoteFile(note: INote) {
    const activeFile = await this.app.workspace.getActiveFile();

    await this.app.vault.modify(activeFile, JSON.stringify(note));
}

export async function clearNoteFile(note: INote) {
    note.elements = [];
    await modifiyNoteFile(note);
}