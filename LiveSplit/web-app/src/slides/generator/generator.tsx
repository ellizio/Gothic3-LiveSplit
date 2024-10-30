import React, {useState} from "react";

import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import SplitComponent from "./elems/split/split-component";

import {Condition, Split} from "../../types";

import "primereact/resources/themes/lara-light-amber/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "./style.css"

declare type GeneratorProps = {
    onSplitsChanged?: (splits: Split[]) => void
}

export const Generator: React.FC<GeneratorProps> = (props) => {
    const [splits, setSplits] = useState<Split[]>([createSplit()]);

    const onNameChanged = (split: Split, name: string) => {
        split.name = name
        setSplits([...splits])
        props.onSplitsChanged?.(splits)
    }

    const onConditionsChanged = (split: Split, conditions: Condition[]) => {
        split.conditions = conditions
        setSplits([...splits])
        props.onSplitsChanged?.(splits)
    }

    const onSplitDeleted = (index: number) => {
        setSplits(splits.filter(((s, i) => i !== index)))
        props.onSplitsChanged?.(splits)
    }

    const addSplit = () => {
        setSplits([...splits, createSplit()])
        props.onSplitsChanged?.(splits)
    }

    return (
        <div>
            <ScrollPanel style={{minWidth: '36vw', height: '88vh'}}>
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