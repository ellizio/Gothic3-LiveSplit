import React, {useState} from "react";

import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import "primereact/resources/themes/lara-light-amber/theme.css";
import "/node_modules/primeflex/primeflex.css";

export const Download: React.FC = () => {
    const onDownloadScriptClicked = () => {
        const texts = ["line 1", "line 2", "line 3"]
        const file = new Blob(texts, {type: 'text/plain'});

        const element = document.createElement("a");
        const object = element.href = URL.createObjectURL(file);
        element.download = "100ideas-" + Date.now() + ".txt";

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element)
        URL.revokeObjectURL(object)
    }

    const onDownloadHelperClicked = () => {
        fetch('https://raw.githubusercontent.com/ellizio/odata-cli-ui/refs/heads/master/CHANGELOG.md')
            .then(response => response.blob())
            .then(blob => {
                const element = document.createElement("a");
                const object = element.href = URL.createObjectURL(blob)
                element.download = "100ideas-" + Date.now() + ".md";

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
                Download the files and place them in the Components in your LiveSplit directory
            </p>
            <Panel className='mb-5 inline-block'
                   header='For example'>
                <p>
                    D:\LiveSplit\Components\script.asl
                </p>
                <p>
                    D:\LiveSplit\Components\helper.dll
                </p>
            </Panel>
            <div className='flex justify-content-center gap-8'>
            <Button icon="pi pi-download" label="Download script" onClick={onDownloadScriptClicked}/>
                <Button icon="pi pi-download" label="Download helper" onClick={onDownloadHelperClicked}/>
            </div>
        </div>
    );
}

export default Download;