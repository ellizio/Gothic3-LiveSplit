import React, {useState} from "react";

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import "primereact/resources/themes/lara-light-amber/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./style.css"
import {Condition, Split} from "../../types";
import SplitComponent from "./elems/split/split-component";

export const Generator: React.FC = () => {
    const [splits, setSplits] = useState<Split[]>([createSplit()]);

    const onNameChanged = (split: Split, name: string) => {
        split.name = name
        setSplits([...splits])
    }

    const onConditionsChanged = (split: Split, conditions: Condition[]) => {
        split.conditions = conditions
        setSplits([...splits])
    }

    const onSplitDeleted = (index: number) => setSplits(splits.filter(((s, i) => i !== index)))

    const addSplit = () => setSplits([...splits, createSplit()])

    return (
        <div>
            <ScrollPanel style={{minWidth: '36vw', height: '85vh'}}>
                {
                    splits.map((s, i) => (
                        <SplitComponent className='mb-4'
                                        name={s.name}
                                        onNameChange={(name) => onNameChanged(s, name)}
                                        conditions={s.conditions}
                                        onConditionsChange={(conditions) => onConditionsChanged(s, conditions)}
                                        deleteEnabled={i !== 0}
                                        onDelete={() => onSplitDeleted(i)}
                        />
                    ))
                }
                <Button
                    className='flex ml-1 mb-1'
                    icon="pi pi-plus"
                    label="Add split"
                    text
                    onClick={addSplit}
                />
            </ScrollPanel>
        </div>
    );
}

function createSplit(): Split {
    return {
        name: '',
        conditions: [
            createCondition()
        ]
    }
}

function createCondition(): Condition {
    return {
        type: '',
        value: ''
    }
}

export default Generator;