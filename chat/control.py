import time
import random, string

import chromedriver_binary
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from selenium.webdriver.chrome.options import Options

DRIVER_PATH = '/usr/local/bin/chromedriver'
FILE_PATH   = 'file:///Users/a21-0159/Desktop/training_part2/my-special-todoapp/chat/main.html'


options = webdriver.ChromeOptions()
options.add_argument('--disable-gpu')

driver = webdriver.Chrome(options=options)

driver.get(FILE_PATH)
# time.sleep(5)
# driver.quit()

def sendMessage( message ):
    textArea = WebDriverWait(driver, 5)(
        EC.presence_of_element_located((By.ID, f'myMessage'))
    )
    textArea.click()
    textArea.send_keys( message )
    sendBtn = driver.find_element_by_id('sendbtn')
    sendBtn.click()

def randomString( digit ):
   randlst = [random.choice(string.ascii_letters + string.digits) for i in range(n)]
   return ''.join(randlst)


if __name__ == '__main__':
    for _ in range(60):
        sendMessage( randomString(16) )

