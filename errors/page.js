import { LLSError } from './error.js';

export class NoActiveTabError extends LLSError {
  constructor() {
    super('No active tab is found!');
  }
}

export class NotLeetcodeProblemPageError extends LLSError {
  constructor() {
    super('You have to open and select the tab with a leetcode problem!');
  }
}

export class ParsingError extends LLSError {
  constructor() {
    super('Something went wrong while parsing the tab ;c');
  }
}
