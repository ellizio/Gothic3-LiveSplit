export declare type SharedContextValues = {
    quests: Quest[],
    skills: Skill[]
}

export declare type Trigger = {
    id: string,
    name: string,
    baseAddress: string,
    offsets: string[]
}
export declare type Quest = Trigger
export declare type Skill = Trigger


export declare type Condition = {
    type: string,
    value?: string
}

export declare type Split = {
    name: string,
    conditions: Condition[]
}