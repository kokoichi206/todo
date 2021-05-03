import chromedriver_binary
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.chrome.options import Options

options = webdriver.ChromeOptions()
options.add_argument('--disable-gpu')

driver = webdriver.Chrome(options=options)

driver.get("https://google.com")
print(f'title is {driver.title}')
driver.quit()
