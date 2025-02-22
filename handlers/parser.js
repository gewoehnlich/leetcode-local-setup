
import { 
    NoActiveTabError, 
    NotLeetcodeProblemPageError, 
    ParsingError 
} from "../errors/page.js";

import { browserApi } from "./constants.js";

export class Parser {
	constructor() {
		this.activeTabId = null;
		this.props = null;
		this.doc = null;
		this.fileformat = null;
	}

	async init() {
		this.activeTabId = await this.getActiveTabId();
		this.props = await this.parseProps();
		this.fileformat = await this.getFileFormat();
	}

	async getActiveTabId() {
		return new Promise((resolve) => {
			browserApi.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
				if (tabs.length < 1) {
					throw new NoActiveTabError();
				}

				const activeTab = tabs[0];
				const url = activeTab.url;

				if (!url.includes("leetcode.com/problems")) {
					throw new NotLeetcodeProblemPageError();
				}

				resolve(activeTab.id);
			});
		});
	}

	async parseProps() {
		try {
			const results = await browserApi.scripting.executeScript({
				target: { tabId: this.activeTabId },
				func: () => document.documentElement.outerHTML
			});

			if (!results || results.length === 0) {
				throw new ParsingError();
			}
			
			const page = results[0].result;
			
			if (!this.doc) {
				const parser = new DOMParser();
				this.doc = parser.parseFromString(page, "text/html");
			}

			const props = this.doc.getElementById("__NEXT_DATA__").textContent.trim();
			const json = JSON.parse(props);

			return json;
		} 

		catch (error) {
			console.error("Parsing failed:", error);
			throw new ParsingError();
		}
	}

	async getFileFormat() {
		return new Promise((resolve) => {
			const button = this.doc.querySelector("div#editor").querySelector("button");

			if (!button) {
				resolve(null);
				return;
			}

			const language = button.textContent.trim();
			let fileformat = null;

			switch (language) {
				case "C++": fileformat = "cpp"; break;
				case "Java": fileformat = "java"; break;
				case "Python":
				case "Python3": fileformat = "py"; break;
				case "C": fileformat = "c"; break;
				case "C#": fileformat = "cs"; break;
				case "JavaScript": fileformat = "js"; break;
				case "TypeScript": fileformat = "ts"; break;
				case "PHP": fileformat = "php"; break;
				case "Swift": fileformat = "swift"; break;
				case "Kotlin": fileformat = "kt"; break;
				case "Dart": fileformat = "dart"; break;
				case "Go": fileformat = "go"; break;
				case "Ruby": fileformat = "rb"; break;
				case "Scala": fileformat = "scala"; break;
				case "Rust": fileformat = "rs"; break;
				case "Racket": fileformat = "rkt"; break;
				case "Erlang": fileformat = "erl"; break;
				case "Elixir": fileformat = "ex"; break;
				default: fileformat = null;
			}

			console.log(fileformat);

			resolve(fileformat);
		});
	}


	async getLocalStorageCode(questionId, activeSessionId) {
		const key = `${questionId}_${activeSessionId}_${this.fileformat}`;

		const [result] = await browserApi.scripting.executeScript({
			target: { tabId: this.activeTabId },
			args: [key],
			func: (injectedKey) => {
				for (let i = 0; i < window.localStorage.length; ++i) {
					const storedKey = window.localStorage.key(i);
					if (injectedKey == storedKey) {
						return window.localStorage.getItem(injectedKey);
					}
				}

				return null;
			}
		});

		return result?.result || null;
	}

	async getSessionStorageTestcases(titleSlug) {
		const key = `QD_TESTCASE_CACHE_${titleSlug}`;

		const [result] = await browserApi.scripting.executeScript({
			target: { tabId: this.activeTabId },
			args: [key],
			func: (injectedKey) => {
				for (let i = 0; i < window.sessionStorage.length; ++i) {
					const storedKey = window.sessionStorage.key(i);
					if (injectedKey == storedKey) {
						return window.sessionStorage.getItem(injectedKey);
					}
				}

				return null;
			}
		});

		return result?.result || null;
	}
}
