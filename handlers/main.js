
import { Parser } from "./parser.js";
import { LeetcodeLocalSetup } from "./leetcode.js";
import { Testcases } from "../testcases/testcases.js";

export async function main() {
	const parser = new Parser();
	await parser.init();

	const lls = new LeetcodeLocalSetup(parser.props);
	lls.code = await parser.getLocalStorageCode(
		lls.questionId, 
		lls.activeSessionId
	);

	lls.testcases = await parser.getSessionStorageTestcases(
		lls.titleSlug
	);

	lls.fileformat = parser.fileformat;

	lls.compile();

	lls.download();
}

