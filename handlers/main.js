
import { WebpageParser } from "./parser.js";
import { FileCompiler } from "./file.js";
import { Testcases } from "../testcases/testcases.js";

export async function main() {
	const parser = new WebpageParser();
	await parser.init();

	const fc = new FileCompiler(parser.props);

    fc.language = await parser.getLocalStorageLanguage(
        fc.questionId,
        fc.activeSessionId
    );

    console.log(fc.language);

	fc.code = await parser.getLocalStorageCode(
		fc.questionId, 
		fc.activeSessionId,
        fc.fileformat
	);

	fc.testcases = await parser.getSessionStorageTestcases(
		fc.titleSlug
	);

	fc.compile();

	fc.download();
}

