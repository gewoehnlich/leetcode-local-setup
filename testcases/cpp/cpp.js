import { typeMap } from './constants.js';

export function formatCpp(testcases, metadata) {
  console.dir(testcases);
  console.dir(metadata);

  const json = JSON.parse(testcases);
  testcases = json.map(([arr, num]) => [JSON.parse(arr), JSON.parse(num)]);

  metadata = JSON.parse(metadata);
  const functionName = metadata['name'];
  const params = metadata['params'];
  const returnObj = metadata['return'];

  for (let index = 0; index < params.length; ++index) {
    params[index].type = typeMap.get(params[index].type);
  }

  returnObj.type = typeMap.get(returnObj.type);

  console.log(functionName);
  console.dir(params);
  console.dir(returnObj);

  let content = '';
  content += writeTestcaseObject(params);
  content += writeMainFunction(functionName, params, returnObj);

  return content;
}

function writeTestcaseObject(params) {
  let content = `struct Testcase\n{\n`;
  params.forEach(
    (element) => (content += `    ${element.type} ${element.name} { };\n`)
  );

  content += `}\n`;

  console.log(content);
  return content;
}

function writeMainFunction(functionName, params, returnObj) {
  let content = `int main() {\n   Solution solution;  std::vector<Testcase> testcases = {\n`;

  content += `    for (Testcase t : testcases) {\n        const ${returnObj.type} result = solution.${functionName}(t.nums, t.target);\n        std::cout << "[" << result[0] << ", " << result[1] << "]" << std::endl;`;

  console.log(content);
  return content;
}
