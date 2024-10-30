import {Condition, Quest, Split} from "../types";
import {QUEST} from "../consts";

import Handlebars from "handlebars";

export class ScriptGenerator {
    private readonly template: string
    private readonly quests: Quest[]

    constructor(template: string, quests: Quest[]) {
        this.template = template
        this.quests = quests
    }

    generate(splits: Split[]): string {
        Handlebars.registerHelper('isQuest', (condition: Condition) => condition.type === QUEST);

        const uniqueQuests = new Set<Quest>();
        for (const split of splits) {
            for (const condition of split.conditions) {
                if (condition.type === QUEST)
                    uniqueQuests.add(this.quests.find(q => q.id === condition.value)!)
            }
        }

        const compile = Handlebars.compile(this.template)
        const script = compile({ quests: uniqueQuests, splits })

        console.log(script)
        return script
    }
}