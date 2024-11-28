import {Condition, Quest, Skill, Split} from "../types";
import {QUEST, SKILL} from "../consts";

import Handlebars from "handlebars";

export class ScriptGenerator {
    private readonly template: string
    private readonly quests: Quest[]
    private readonly skills: Skill[]

    constructor(template: string, quests: Quest[], skills: Skill[]) {
        this.template = template
        this.quests = quests
        this.skills = skills
    }

    generate(splits: Split[]): string {
        Handlebars.registerHelper('isQuest', (condition: Condition) => condition.type === QUEST);
        Handlebars.registerHelper('isSkill', (condition: Condition) => condition.type === SKILL);

        const uniqueQuests = new Set<Quest>();
        const uniqueSkills = new Set<Skill>();
        for (const split of splits) {
            for (const condition of split.conditions) {
                if (condition.type === QUEST)
                    uniqueQuests.add(this.quests.find(q => q.id === condition.value)!)
                else if (condition.type === SKILL)
                    uniqueSkills.add(this.skills.find(s => s.id === condition.value)!)
            }
        }

        const compile = Handlebars.compile(this.template)
        const script = compile({ quests: uniqueQuests, skills: uniqueSkills, splits })

        console.log(script)
        return script
    }
}