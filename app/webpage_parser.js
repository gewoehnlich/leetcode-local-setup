import {
  NoActiveTabError,
  NotLeetcodeProblemPageError,
  ParsingError,
} from '../errors/page.js';

import { 
  browserApi, 
  fileformatMap,
} from './constants.js';

export class WebpageParser {
  constructor() {
    this.activeTabId = null;
  }

  async init() {
    this.activeTabId = await this.setActiveTabId();
  }

  async setActiveTabId() {
    return new Promise((resolve) => {
      browserApi.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        async (tabs) => {
          if (tabs.length < 1) {
            throw new NoActiveTabError();
          }

          const activeTab = tabs[0];
          const url = activeTab.url;

          if (!url.includes('leetcode.com/problems')) {
            throw new NotLeetcodeProblemPageError();
          }

          resolve(activeTab.id);
        }
      );
    });
  }

  async props() {
    try {
      const results = await browserApi.scripting.executeScript({
        target: { tabId: this.activeTabId },
        func: () => document.documentElement.outerHTML,
      });

      if (!results || results.length === 0) {
        throw new ParsingError();
      }

      const page = results[0].result;

      const parser = new DOMParser();
      const doc = parser.parseFromString(page, 'text/html');

      const props = doc.getElementById('__NEXT_DATA__').textContent.trim();

      const json = JSON.parse(props);

      return json;
    } catch (error) {
      console.error('Parsing failed:', error);
      throw new ParsingError();
    }
  }

  async language(questionId, activeSessionId) {
    const key = `${questionId}_${activeSessionId}_lang`;

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
      },
    });

    return result?.result || null;
  }

  async code(
    questionId, 
    activeSessionId, 
    language,
  ) {
    const fileformat = fileformatMap.get(language);
    const key = `${questionId}_${activeSessionId}_${fileformat}`;

    const [result] = await browserApi.scripting.executeScript({
      target: { tabId: this.activeTabId },
      args: [key],
      func: (injectedKey) => {
        return new Promise((resolve) => {
          const request = indexedDB.open('LeetCode-problems');
          request.onerror = (event) => {
            console.error('IndexedDB error:', event);
            resolve(null);
          };
          request.onsuccess = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('problem_code')) {
              resolve(null);
              return;
            }
            const transaction = db.transaction(['problem_code'], 'readonly');
            const objectStore = transaction.objectStore('problem_code');
            const getRequest = objectStore.get(injectedKey);
            getRequest.onsuccess = () => {
              if (getRequest.result && getRequest.result.code) {
                resolve(getRequest.result.code);
              } else {
                resolve(null);
              }
            };
            getRequest.onerror = (event) => {
              console.error('IndexedDB get error:', event);
              resolve(null);
            };
          };
        });
      },
    });

    return result?.result || null;
  }

  async testcases(titleSlug) {
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
      },
    });

    return result?.result || null;
  }
}
