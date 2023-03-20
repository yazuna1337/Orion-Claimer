from .logger import Logger
from classes.account import Account
import requests, random

API_URL = 'http://127.0.0.1:40120'

class AccountManager:
		def __init__(self) -> None:
			self.access_token = None
			self.accounts: list[Account] = []
			self.demo_accounts: list[Account] = []

			self.current_index = 0

		def __iter__(self):
			return self

		def __next__(self, demo=False):
			return self.next(demo=demo)

		def load_demo_bearers (self):
			r = requests.get(f'{API_URL}/demo')

			if r.status_code == 200:
				Logger.log(f'Successfully loaded {len(r.json())} demo accounts')
				for account in r.json():
					self.demo_accounts.append(Account(account['accessToken'], account['email']))


		def load_bearers (self):
			r = requests.get(f'{API_URL}/accounts')

			if r.status_code == 200:
				Logger.log(f'Successfully loaded {len(r.json())} accounts')
				for account in r.json():
					self.accounts.append(Account(account['accessToken'], account['email']))
		
		def random_account(self, demo=False):
			if demo:
				return random.choice(self.demo_accounts)

			return random.choice(self.accounts)

		def next(self, demo=False):
			if demo:
				return random.choice(self.demo_accounts)

			if self.current_index >= len(self.accounts):
				self.current_index = 0

			account = self.accounts[self.current_index]

			self.current_index += 1
			return account