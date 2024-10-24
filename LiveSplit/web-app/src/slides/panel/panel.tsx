import React from "react";

import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-amber/theme.css";
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";

export const Panel: React.FC = () => {
    return (
        <div className="flex overflow-hidden p-4">
            <div className="flex-grow-1 flex"/>
            <Button icon="pi pi-info-circle" label="Help"/>
            <div className="flex-grow-1 flex"/>
            <Button icon="pi pi-arrow-right" iconPos="right" label="Next"/>
            <div className="flex-grow-1 flex"/>
        </div>
    );
}

export default Panel;