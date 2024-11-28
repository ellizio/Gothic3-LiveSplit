export declare type SharedContextValues = {
    quests: Quest[]
}


export declare type Quest = {
    id: string,
    name: string,
    baseAddress: string,
    offsets: string[]
}

export declare type Skill = {
    id: string,
    name: string,
    baseAddress: string,
    offsets: string[]
}


export declare type Condition = {
    type: string,
    value?: string
}

export declare type Split = {
    name: string,
    conditions: Condition[]
}