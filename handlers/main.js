
import { parseProps } from "./page.js";
import { parseCodeTemplate } from "../parsers/template.js";
import { parseTestcases } from "../parsers/testcases.js";
import { getFileFormat } from "../parsers/fileformat.js";
import { formatTestcases } from "../formatters/format.js";

export async function main() {
	const props = await parseProps();
	// const localStorage = await getLocalStorage();
	// const sessionStorage = await getSessionStorage();

	const file = new LeetcodeLocalSetup(
		props,
		// localStorage,
		// sessionStorage
	).makeFile();

    // const webpage = await getLeetcodeProblemPageHTML(); 
    // const codeTemplate = await parseCodeTemplate(webpage);
    // const defaultTemplate = parseDefaultCodeTemplate(webpage);
    // const parsedTestcases = await parseTestcases(webpage);
    // console.dir(parsedTestcases);
    // const fileformat = await getFileFormat(webpage);
    // const testcases = await formatTestcases(parsedTestcases, fileformat, codeTemplate);
    // const file = await compileFile(codeTemplate, testcases, fileformat);
}


class LeetcodeLocalSetup {
	constructor(props, localStorage, sessionStorage) {
		this.activeSessionId = props["props"]["pageProps"]["dehydratedState"]["queries"]["0"]["state"]["data"]["userStatus"]["activeSessionId"];
		this.questionTitle = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["questionTitle"];
		this.questionId = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["questionId"];
		this.questionFrontendId = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["questionFrontendId"];
		this.metaData = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["metaData"];
		this.codeSnippets = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["codeSnippets"];
		this.exampleTestcaseList = props["props"]["pageProps"]["dehydratedState"]["queries"][1]["state"]["data"]["question"]["exampleTestcaseList"];
		this.slug = props["query"]["slug"];

		// console.log(this.activeSessionId, this.questionTitle, this.questionId, this.questionFrontendId, this.metaData, this.codeSnippets, this.exampleTestcaseList, this.slug);
	}

	makeFile() {
		console.dir();
	}
}

