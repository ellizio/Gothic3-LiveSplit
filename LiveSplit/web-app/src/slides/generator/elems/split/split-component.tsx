import React from "react";

import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import ConditionComponent from "../condition/condition-component";

import {Condition} from "../../../../types";

import './styles.css'

declare type SplitComponentProps = {
    className?: string,

    name: string,
    onNameChange?: (name: string) => void,

    conditions: Condition[],
    onConditionsChange?: (conditions: Condition[]) => void,

    deleteEnabled: boolean,
    onDelete?: () => void
}

export const SplitComponent: React.FC<SplitComponentProps> = (props) => {

    const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => props.onNameChange?.(e.target.value)

    const addCondition = () => props.onConditionsChange?.([...props.conditions, createCondition()])

    const onTypeChanged = (condition: Condition, type: string) => {
        condition.type = type;
        props.onConditionsChange?.(props.conditions)
    }

    const onValueChanged = (condition: Condition, value: string) => {
        condition.value = value;
        props.onConditionsChange?.(props.conditions)
    }

    const onConditionDeleted = (index: number) => props.onConditionsChange?.(props.conditions.filter(((c, i) => i !== index)))

    return (
        <div className={props.className}>
            <div className='flex'>
                <InputText
                    value={props.name}
                    onChange={onNameChanged}
                    placeholder='Enter split name...'
                    className='w-full mb-2'
                />
                <Button visible={props.deleteEnabled}
                        icon="pi pi-times"
                        rounded
                        text
                        severity="danger"
                        onClick={() => props.onDelete?.()}
                />
            </div>
            {
                props.conditions.map((c, i) => {
                    return (
                        <ConditionComponent
                            type={c.type}
                            value={c.value}
                            onTypeChange={(type) => onTypeChanged(c, type)}
                            onValueChange={(value) => onValueChanged(c, value)}
                            deleteEnabled={i !== 0}
                            onDelete={() => onConditionDeleted(i)}
                            className='ml-8 mb-2'
                        />
                    )
                })
            }
            <Button
                className='flex ml-7'
                icon="pi pi-plus"
                label="Add condition"
                text
                onClick={addCondition}
            />
        </div>
    );
}

function createCondition(): Condition {
    return {
        type: ''
    }
}

export default SplitComponent;