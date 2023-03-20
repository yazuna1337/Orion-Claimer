import random

class ProxyManager:
		def __init__(self):
				self.proxies = []
				self.proxy_index = 0

		def __iter__(self):
				return self

		def __next__(self):
				return self.next()

		def next(self):
				if self.proxy_index >= len(self.proxies):
						self.proxy_index = 0

				proxy = self.proxies[self.proxy_index]

				self.proxy_index += 1
				return { 'http': f'http://{proxy}', 'https': f'https://{proxy}' }

		def get_random_proxy(self):
				return { 'http': f'http://{random.choice(self.proxies)}', 'https': f'https://{random.choice(self.proxies)}' }

		def load_from_file(self, file):
				with open(file, 'r') as f:
						self.proxies = f.read().splitlines()
						print(f'Loaded {len(self.proxies)} proxies')