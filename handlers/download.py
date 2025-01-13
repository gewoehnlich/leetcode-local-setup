from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from pathlib import Path

p = Path("test.html")
if p.exists() and p.stat().st_size > 0:
    print("The file is not empty, skipping write operation.")
    exit()

chrome_options = Options()
chrome_options.add_argument("--headless")
service = Service()

driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    url = "https://leetcode.com/problems/two-sum/"
    driver.get(url)

    with open(p, "w", encoding="utf-8") as file:
        file.write(driver.page_source)

    print(f"Written content to {p}")

finally:
    driver.quit()
