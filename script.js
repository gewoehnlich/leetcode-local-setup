export {};

import { checkIfActivePageIsLeetcode } from "./_handlers/file.js";


const isLeetcodePage = checkIfActivePageIsLeetcode();
console.log(isLeetcodePage);
if (!isLeetcodePage) {
    throw new Error("not on leetcode webpage, stopping execution.");
}


