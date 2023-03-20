import json

class Config:

	def __init__(self):
		self.config = None
		self.load_config()

	def load_config(self):
		with open('config/config.json', 'r') as f:
			self.config = json.load(f)