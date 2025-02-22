
export class LeetcodeLocalSetup {
	constructor(props) {
		const queries = props["props"]["pageProps"]["dehydratedState"]["queries"];
		const secondQuery = queries[1]["state"]["data"]["question"];

		this.activeSessionId = queries[0]["state"]["data"]
			["userStatus"]["activeSessionId"];
		this.questionTitle        =  secondQuery["questionTitle"];
		this.questionId           =  secondQuery["questionId"];
		this.questionFrontendId   =  secondQuery["questionFrontendId"];
		this.metadata             =  secondQuery["metaData"];
		this.codeSnippets         =  secondQuery["codeSnippets"];
		this.exampleTestcaseList  =  secondQuery["exampleTestcaseList"];
		this.titleSlug            =  secondQuery["titleSlug"];

		this.code = null;
		this.testcases = null;
		this.fileformat = null;
	}

	compileFile() {

	}
}

