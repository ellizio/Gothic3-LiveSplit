import React from "react";

import { Button } from 'primereact/button';

declare type PanelProps = {
    generateEnabled: boolean,
    onGenerateClick: () => void
}

export const Panel: React.FC<PanelProps> = (props) => {
    return (
        <div className="flex justify-content-center p-4">
            <Button icon="pi pi-sync"
                    label="Generate"
                    disabled={!props.generateEnabled}
                    onClick={props.onGenerateClick} />
        </div>
    );
}

export default Panel;