import asyncio

from classes.manager import AccountManager
from classes.proxy import ProxyManager
from classes.drop import QueueManager
from classes.logger import Logger
from classes.config import Config

config = Config()
account_manager = AccountManager()
proxy_manager = ProxyManager()
queue_manager = QueueManager(proxy_manager, account_manager, config)

async def setup_queue(tasks):
	# Create the tasks asynchronusly
	await queue_manager.create_tasks(tasks)
	await asyncio.gather(*queue_manager.tasks)

if __name__ == '__main__':
	proxy_manager.load_from_file('config/proxies.txt')
	account_manager.load_bearers()

	username = Logger.input('Username')

	tasks = int(Logger.input('Tasks'))
	
	queue_manager.queue_username(username)

	# Create the tasks asynchronusly
	asyncio.run(setup_queue(tasks))
