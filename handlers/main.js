
import { WebpageParser } from "./parser.js";
import { FileCompiler } from "./file.js";

export async function main() {
	const parser = new WebpageParser();
	await parser.init();

	const fc = new FileCompiler(parser.props);

    fc.language = await parser.getLocalStorageLanguage(
        fc.questionId,
        fc.activeSessionId
    );

	fc.code = await parser.getLocalStorageCode(
		fc.questionId, 
		fc.activeSessionId,
        fc.language
	);

	fc.testcases = await parser.getSessionStorageTestcases(
		fc.titleSlug
	);

	fc.compile();

	fc.download();
}

