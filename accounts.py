from classes.logger import Logger
from classes.manager import AccountManager

account_manager = AccountManager()

if __name__ == '__main__':
	account_manager.load_bearers()

	for account in account_manager.accounts:
		Logger.log(f'Account - {account.email} - LIGHTBLUE_EX{account.fetch_username()}')
		