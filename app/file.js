import { fileformatMap, headersMap } from './constants.js';

import { Testcases } from '../testcases/testcases.js';

export class File {
  constructor(props) {
    const queries = props['props']['pageProps']['dehydratedState']['queries'];
    const secondQuery = queries[1]['state']['data']['question'];

    this.activeSessionId =
      queries[0]['state']['data']['userStatus']['activeSessionId'];
    this.questionTitle = secondQuery['questionTitle'];
    this.questionId = secondQuery['questionId'];
    this.questionFrontendId = secondQuery['questionFrontendId'];
    this.metadata = secondQuery['metaData'];
    this.codeSnippets = secondQuery['codeSnippets'];
    this.exampleTestcaseList = secondQuery['exampleTestcaseList'];
    this.titleSlug = secondQuery['titleSlug'];

    this.code = null;
    this.testcases = null;
    this.language = null;
    this.fileformat = null;

    this.filename = null;
    this.content = '';
  }

  compile() {
    const headers = headersMap.get(this.language);
    const testcases = new Testcases(
      this.testcases,
      this.exampleTestcaseList,
      this.metadata,
      this.language
    ).format();

    const array = new Array(headers, this.code, testcases);

    array.forEach((element) => {
      if (element) {
        const lines = element.replace(/^"|"$/g, '').split('\\n');
        lines.forEach((line) => {
          this.content += line + '\n';
        });

        this.content += '\n';
      }
    });

    const fileformat = fileformatMap.get(this.language);

    this.filename = this.questionFrontendId + '. ' + this.questionTitle + '.' + fileformat;
  }

  download() {
    const blob = new Blob([this.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = this.filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
