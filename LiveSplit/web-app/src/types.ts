export declare type SharedContextValues = {
    quests: Quest[]
}

export declare type Quest = {
    id: string,
    name: string
}

export declare type Condition = {
    type: string,
    value?: string
}

export declare type Split = {
    name: string,
    conditions: Condition[]
}