import { WebpageParser } from './webpage_parser.js';
import { File } from './file.js';

export async function main() {
  const parser = new WebpageParser();
  parser.activeTabId = await parser.setActiveTabId();

  const file = new File(
    await parser.props()
  );

  file.language = await parser.language(
    file.questionId,
    file.activeSessionId,
  );

  file.code = await parser.code(
    file.questionId,
    file.activeSessionId,
    file.language,
  );

  file.testcases = await parser.testcases(
    file.titleSlug
  );

  console.dir(file);
  return;

  file.compile();

  file.download();
}
