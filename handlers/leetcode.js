
import { browserApi } from "./constants.js";
import { Testcases } from "../testcases/testcases.js";

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
		
		this.filename = null;
		this.content = "";
	}

	getHeaders() {
		const hashmap = new Map();
		hashmap.set("cpp", "#include \"leetcode_headers_cpp.h\"\"");

		if (hashmap.get(this.fileformat)) {
			return hashmap.get(this.fileformat);
		}

		return null;
	}

	compile() {
		// console.log(
		// 	"activeSessionId: " + this.activeSessionId + "\n",
		// 	"questionTitle: " + this.questionTitle + "\n",
		// 	"questionId: " + this.questionId + "\n",
		// 	"questionFrontendId: " + this.questionFrontendId + "\n",
		// 	"metadata: " + this.metadata + "\n",
		// 	"codeSnippets: " + this.codeSnippets + "\n",
		// 	"exampleTestcaseList: " + this.exampleTestcaseList + "\n",
		// 	"titleSlug: " + this.titleSlug + "\n",
		// 	"code: " + this.code + "\n",
		// 	"testcases: " + this.testcases + "\n",
		// 	"fileformat: " + this.fileformat + "\n",
		// );
		
		const headers = this.getHeaders();

		const testcases = new Testcases(
			this.testcases,
            this.exampleTestcaseList, 
			this.metadata, 
			this.fileformat
		).format();

		const array = new Array(
			headers, 
			this.code, 
			testcases
		);

		array.forEach((element) => {
			if (element) {
                console.log(element);
				const lines = element.replace(/^"|"$/g, '').split("\\n");
				lines.forEach(line => {
					this.content += line + "\n";
				});

				this.content += "\n";
			}
		});

		this.filename = this.questionFrontendId 
			+ ". " + this.questionTitle + "." + this.fileformat;
	}

	download() {
		const blob = new Blob([this.content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		
		const link = document.createElement("a");
		link.href = url;
		link.download = this.filename;

		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}
}

