import React from "react";

import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-amber/theme.css";
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";

declare type PanelProps = {
    helpEnabled: boolean,

    onHelpClick?: () => void,
    onNextClick?: () => void
}

export const Panel: React.FC<PanelProps> = (props) => {
    return (
        <div className="flex overflow-hidden p-4">
            <div className="flex-grow-1 flex" />
            <Button disabled={!props.helpEnabled} icon="pi pi-info-circle" label="Help" onClick={props.onHelpClick} />
            <div className="flex-grow-1 flex" />
            <Button icon="pi pi-arrow-right" iconPos="right" label="Next" onClick={props.onNextClick} />
            <div className="flex-grow-1 flex" />
        </div>
    );
}

export default Panel;