import React from "react";

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import {HELPER_FILENAME, SCRIPT_FILENAME} from "../../consts";

declare type DownloadProps = {
    script: string
}

export const Download: React.FC<DownloadProps> = (props) => {
    const onDownloadScriptClicked = () => {
        const file = new Blob([props.script], { type: 'text/plain' });

        const element = document.createElement("a");
        const object = element.href = URL.createObjectURL(file);
        element.download = SCRIPT_FILENAME;

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element)
        URL.revokeObjectURL(object)
    }

    const onDownloadHelperClicked = () => {
        fetch('https://raw.githubusercontent.com/ellizio/odata-cli-ui/refs/heads/master/CHANGELOG.md') // TODO: url from consts
            .then(response => response.blob())
            .then(blob => {
                const element = document.createElement("a");
                const object = element.href = URL.createObjectURL(blob)
                element.download = HELPER_FILENAME;

                document.body.appendChild(element);
                element.click();

                document.body.removeChild(element)
                URL.revokeObjectURL(object)
            })
            // TODO: catch
    }

    return (
        <div>
            <p className="text-6xl mb-5">
                Download the files and place them into Components in your LiveSplit directory
            </p>
            <Panel className='mb-5 inline-block'
                   header='For example'>
                <p>
                    C:\LiveSplit\Components\{SCRIPT_FILENAME}
                </p>
                <p>
                    C:\LiveSplit\Components\{HELPER_FILENAME}
                </p>
            </Panel>
            <div className='flex justify-content-center gap-8'>
                <Button icon="pi pi-download" label={`Download ${SCRIPT_FILENAME}`} onClick={onDownloadScriptClicked}/>
                <Button icon="pi pi-download" label={`Download ${HELPER_FILENAME}`} onClick={onDownloadHelperClicked}/>
            </div>
        </div>
    );
}

// export const DownloadSlide = Object.assign(Download, {
//     Help: <Button></Button>
// })