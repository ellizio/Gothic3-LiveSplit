import {Split} from "../types";

import Handlebars from "handlebars";

export class SplitsGenerator {
    private readonly template: string

    constructor(template: string) {
        this.template = template
    }

    generate(splits: Split[]): string {
        const compile = Handlebars.compile(this.template)
        const script = compile({ splits })

        console.log(script)
        return script
    }
}