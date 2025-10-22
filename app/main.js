import { WebpageParser } from './webpage_parser.js';
import { FileCompiler } from './file.js';

export async function main() {
  const parser = new WebpageParser();
  parser.activeTabId = await parser.setActiveTabId();
  parser.props = await parser.setProps();
  // await parser.init();
  console.dir(parser);
  return;

  const file = new FileCompiler(parser.props);

  file.language = await parser.language(
    file.questionId,
    file.activeSessionId
  );

  file.code = await parser.code(
    file.questionId,
    file.activeSessionId,
    file.language
  );

  file.testcases = await parser.testcases(file.titleSlug);

  file.compile();

  file.download();
}
