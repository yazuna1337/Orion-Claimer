from .logger import Logger
import requests, json

class Account:
		def __init__(self, bearer, email) -> None:
			self.bearer = bearer
			self.email = email

		def apply_skin(self):
			r = requests.post('https://api.minecraftservices.com/minecraft/profile/skins', headers={'Authorization': f'Bearer {self.bearer}'}, json={'variant': 'SLIM', 'url': 'https://cdn.discordapp.com/attachments/848982741671870504/1052237219915632710/7452c38c7c051214.png'})

			if r.status_code == 200:
				Logger.log(f'Successfully applied skin to MAGENTA{self.bearer}')

		def fetch_username (self):
			r = requests.get('https://api.minecraftservices.com/minecraft/profile', headers={'Authorization': f'Bearer {self.bearer}'})

			if r.status_code == 200:
				data = r.json()
				return data['name']

		def send_fetch_webhook (self, username, webhook, webhook_content):
			data = {
				"content": None,
				"embeds": [json.dumps(webhook_content).replace('{username}', username)],
				"attachments": []
			}

			r = requests.post(webhook, json=data)

			if r.status_code == 200:
				Logger.log(f'Successfully sent fetch webhook')
		