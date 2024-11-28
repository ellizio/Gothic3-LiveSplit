import React, {useContext, useEffect, useMemo, useState} from "react";

import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Button} from "primereact/button";

import {SharedContext} from "../../../../App";
import {QUEST, SKILL} from "../../../../consts";

import './styles.css'

const types = [
    { value: "quest", label: 'Quest' },
    // { value: "skill", label: 'Skill' },
    { value: 'save', label: 'Save' }
]

declare type ConditionComponentProps = {
    className?: string,

    type: string,
    value?: string,
    deleteEnabled: boolean,

    onTypeChange?: (type: string) => void,
    onValueChange?: (value: string) => void,
    onDelete?: () => void
}

export const ConditionComponent: React.FC<ConditionComponentProps> = (props) => {
    const [valueEnabled, setValueEnabled] = useState(props.type === QUEST || props.type === SKILL)
    const [valuePlaceholder, setValuePlaceholder] = useState('')

    const sharedContext = useContext(SharedContext);
    const questsValues = useMemo(() => {
        let quests = sharedContext.quests;
        return quests.map(q => { return { value: q.id, label: q.name } })
    }, [sharedContext.quests]);

    useEffect(() => {
        setValueEnabled(props.type === QUEST || props.type === SKILL)
        if (props.type === QUEST)
            setValuePlaceholder('Select quest...')
        else if (props.type === SKILL)
            setValuePlaceholder('Select skill...')
        else
            setValuePlaceholder('')
    }, [props.type])

    const onTypeChanged = (e: DropdownChangeEvent) => {
        // TODO: move to useEffect?
        props.onTypeChange?.(e.target.value)

        if (e.target.value === QUEST) {
            setValueEnabled(true);
            setValuePlaceholder('Select quest...')
        }
        else if (e.target.value === SKILL) {
            setValueEnabled(true);
            setValuePlaceholder('Select skill...')
        }
        else {
            setValueEnabled(false);
            setValuePlaceholder('')
            props.onValueChange?.('')
        }
    }

    const onValueChanged = (e: DropdownChangeEvent) => props.onValueChange?.(e.target.value)

    const onDeleteClicked = () => props.onDelete?.()

    return (
        <div className={`flex ${props.className}`}>
            <Dropdown
                value={props.type}
                options={types}
                checkmark
                onChange={onTypeChanged}
                className='type-dropdown'
            />
            <div className='w-1rem'/>
            <Dropdown
                value={props.value}
                placeholder={valuePlaceholder}
                disabled={!valueEnabled}
                options={questsValues}
                checkmark
                filter
                virtualScrollerOptions={{ itemSize: 42, scrollHeight: '300px' }}
                onChange={onValueChanged}
                className='value-dropdown'
            />
            <div className='w-1rem'/>
            <Button visible={props.deleteEnabled}
                    icon="pi pi-times"
                    rounded
                    text
                    severity="danger"
                    className="delete-button"
                    onClick={onDeleteClicked}
            />
            { !props.deleteEnabled && <div style={{ minWidth: '48px' }} /> }
        </div>
    );
}

export default ConditionComponent;