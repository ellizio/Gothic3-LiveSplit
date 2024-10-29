export declare type SharedContextValues = {
    quests: Quest[],
    techs: Tech[]
}

export declare type Quest = {
    id: string,
    name: string,
    baseAddress: string,
    offsets: string[]
}

export declare type Tech = {
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