import {Quest, Tech} from "../types";

export async function retrieveQuests(): Promise<Quest[]> {
    let quests = await fetch('https://gist.githubusercontent.com/ellizio/e3acfcffe0a8aa3b8ff37c1ea8103998/raw/0a6d97e92b11645167f23bdd8c4bd0babcbdeb60/quests')
        .then(response => response.text())
    let names = await fetch('https://gist.githubusercontent.com/ellizio/e3acfcffe0a8aa3b8ff37c1ea8103998/raw/55fa8d332f0e0b28d79c50a4dafebc6dc361cd27/quests.en')
        .then(response => response.text())
        .then(text => {
            const map = new Map<string, string>()
            for (const line of text.split('\n')) {
                const index = line.indexOf(' ')
                map.set(line.substring(0, index), line.substring(index))
            }
            return map;
        })

    return quests.split('\n').map(q => {
        const parts = q.split(' ');
        return {
            id: parts[0],
            name: names.get(parts[0]) ?? 'Error :(',
            baseAddress: parts[1],
            offsets: parts.slice(2)
        }
    })
}

export async function retrieveTechs(): Promise<Tech[]> {
    let quests = await fetch('https://gist.githubusercontent.com/ellizio/e3acfcffe0a8aa3b8ff37c1ea8103998/raw/426d65b425bb2c942c9dd08c541e5280eaff6b12/tech')
        .then(response => response.text())

    return quests.split('\n').map(q => {
        const parts = q.split(' ');
        return {
            id: parts[0],
            name: parts[0],
            baseAddress: parts[1],
            offsets: parts.slice(2)
        }
    })
}

export async function retrieveScriptTemplate(): Promise<string> {
    const response = await fetch('https://gist.githubusercontent.com/ellizio/e3acfcffe0a8aa3b8ff37c1ea8103998/raw/59ee770ac6434d36d12aedd2f557af0c487ab448/template');
    return await response.text();
}