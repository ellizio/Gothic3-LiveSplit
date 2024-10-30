import {HELPER_FILENAME, HELPER_URL, SCRIPT_FILENAME, SPLITS_FILENAME} from "../consts";

export class Downloader {
    static downloadScript(script: string) {
        const file = new Blob([script], { type: 'text/plain' });
        this.downloadBlob(file, SCRIPT_FILENAME)
    }

    static downloadHelper() {
        fetch(HELPER_URL)
            .then(response => response.blob())
            .then(blob => this.downloadBlob(blob, HELPER_FILENAME))
        // TODO: catch
    }

    static downloadSplits(splits: string) {
        const file = new Blob([splits], { type: 'text/plain' });
        this.downloadBlob(file, SPLITS_FILENAME)
    }

    private static downloadBlob(blob: Blob, filename: string) {
        const element = document.createElement("a");
        const object = element.href = URL.createObjectURL(blob);
        element.download = filename;

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element)
        URL.revokeObjectURL(object)
    }
}