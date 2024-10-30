import React, {useState} from "react";

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import {Condition, Split} from "../../types";

import "primereact/resources/themes/lara-light-amber/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./style.css"
import {Panel} from "primereact/panel";



export const Guide: React.FC = () => {
    return (
        <div>
            <p className="text-6xl mb-4 mt-0">
                Setup LiveSplit
            </p>
            <ScrollPanel style={{height: '80vh', marginBottom: '40px'}}>
                <Panel className='mb-5'
                       header='For example'>
                    <img src='/Gothic3-LiveSplit/splits-example.png' alt='example'/>
                </Panel>
                <Panel className='mb-5'
                       header='For example'>
                    <img src='/Gothic3-LiveSplit/splits-example.png' alt='example'/>
                </Panel>
            </ScrollPanel>
        </div>
    );
}

export default Guide;