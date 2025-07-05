import { LLSError } from './error.js';

export class NoKeysFoundOnTestResultTab extends LLSError {
  constructor() {
    super('No keys found on test result tab.');
  }
}

export class NoNecessaryEditorDivsFound extends LLSError {
  constructor() {
    super('No necessary editor divs found.');
  }
}

export class NoInputValuesAreFound extends LLSError {
  constructor() {
    super('No input values are found.');
  }
}

export class InputOutputParsingError extends LLSError {
  constructor() {
    super('Could not parse input/output from left panel.');
  }
}

export class ParsingError extends LLSError {
  constructor() {
    super('Something went wrong while parsing the tab ;c');
  }
}
