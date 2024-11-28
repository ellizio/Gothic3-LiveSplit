import {Quest, Skill, Trigger} from "../types";
import {
    QUESTS_EN_SOURCE_URL,
    QUESTS_SOURCE_URL,
    SCRIPT_TEMPLATE_URL,
    SKILLS_EN_SOURCE_URL,
    SKILLS_SOURCE_URL,
    SPLITS_TEMPLATE_URL
} from "../consts";

export class DataRetriever {
    static async retrieveQuests(): Promise<Quest[]> {
        let quests = await fetch(QUESTS_SOURCE_URL)
            .then(response => response.text())
        let names = await this.getAndParseNames(QUESTS_EN_SOURCE_URL)
        return this.map(quests, names)
    }

    static async retrieveSkills(): Promise<Skill[]> {
        let quests = await fetch(SKILLS_SOURCE_URL)
            .then(response => response.text())
        let names = await this.getAndParseNames(SKILLS_EN_SOURCE_URL)
        return this.map(quests, names)
    }

    private static async getAndParseNames(url: string): Promise<Map<string, string>> {
        return await fetch(url)
            .then(response => response.text())
            .then(text => {
                const map = new Map<string, string>()
                for (const line of text.split(/[\r\n]+/)) {
                    const index = line.trimStart().indexOf(' ')
                    map.set(line.substring(0, index), line.substring(index).trim())
                }
                return map;
            })
    }

    private static map(source: string, names: Map<string, string>): Trigger[] {
        return source.split(/[\r\n]+/).map(q => {
            const parts = q.split(/\s+/);
            return {
                id: parts[0],
                name: names.get(parts[0]) ?? 'Error :(',
                baseAddress: parts[1],
                offsets: parts.slice(2)
            }
        })
    }

    static async retrieveScriptTemplate(): Promise<string> {
        const response = await fetch(SCRIPT_TEMPLATE_URL);
        return await response.text();
    }

    static async retrieveSplitsTemplate(): Promise<string> {
        const response = await fetch(SPLITS_TEMPLATE_URL);
        return await response.text();
    }
}