
import { formatCpp } from "./cpp.js";

const testcases = '[["[2,7,11,15]","9"],["[3,2,4]","6"],["[3,3]","6"],["[2,7,11,15]","9"]]';

const metadata = `{
  "name": "twoSum",
  "params": [
    {
      "name": "nums",
      "type": "integer[]"
    },
    {
      "name": "target",
      "type": "integer"
    }
  ],
  "return": {
    "type": "integer[]",
    "size": 2
  },
  "manual": false
}`;

const result = formatCpp(testcases, metadata);

