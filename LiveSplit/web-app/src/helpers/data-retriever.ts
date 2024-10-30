import {Quest} from "../types";
import {QUESTS_EN_SOURCE_URL, QUESTS_SOURCE_URL, SCRIPT_TEMPLATE_URL, SPLITS_TEMPLATE_URL} from "../consts";

export class DataRetriever {
    static async retrieveQuests(): Promise<Quest[]> {
        let quests = await fetch(QUESTS_SOURCE_URL)
            .then(response => response.text())
        let names = await fetch(QUESTS_EN_SOURCE_URL)
            .then(response => response.text())
            .then(text => {
                const map = new Map<string, string>()
                for (const line of text.split(/[\r\n]+/)) {
                    const index = line.indexOf(' ')
                    map.set(line.substring(0, index), line.substring(index))
                }
                return map;
            })

        return quests.split(/[\r\n]+/).map(q => {
            const parts = q.split(' ');
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