
import { LLSError } from "./error.js";

export class NoTemplateDivFound extends LLSError {
    constructor() {
        super("Didn't find the div with code template in it.");
    }
}

export class ParsingError extends LLSError {
    constructor() {
        super("Something went wrong while parsing the tab ;c");
    }
}

