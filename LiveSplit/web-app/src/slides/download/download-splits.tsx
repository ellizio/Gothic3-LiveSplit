import React from "react";

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import {SPLITS_FILENAME} from "../../consts";

declare type DownloadSplitsProps = {
    splits: string
}

export const DownloadSplits: React.FC<DownloadSplitsProps> = (props) => {
    const onDownloadSplitsClicked = () => {
        const file = new Blob([props.splits], { type: 'text/plain' });

        const element = document.createElement("a");
        const object = element.href = URL.createObjectURL(file);
        element.download = SPLITS_FILENAME;

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element)
        URL.revokeObjectURL(object)
    }

    return (
        <div>
            <p className="text-6xl mb-5">
                Download generated splits or create your own
            </p>
            <Panel className='mb-5 inline-block'
                   header='For example'>
                <img src='/Gothic3-LiveSplit/splits-example.png' alt='example' />
            </Panel>
            <div className='flex justify-content-center gap-8'>
                <Button icon="pi pi-download" label={`Download ${SPLITS_FILENAME}`} onClick={onDownloadSplitsClicked}/>
            </div>
        </div>
    );
}

// export const DownloadSlide = Object.assign(Download, {
//     Help: <Button></Button>
// })