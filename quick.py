import time, json, pymongo, datetime

client = pymongo.MongoClient("mongodb.net")
db = client["kenaimanager"]
accounts = db["accounts"]


def load_accounts (type):
	global accounts
	with open('accounts.txt') as f:
		for line in f:
			generate_json(line.strip())

def generate_json (account):
	try:
		# Auth
		# auth = msmcauth.login(account.split(':')[0], account.split(':')[1])

		data = {
			"email": account.split(':')[0],
			"password": account.split(':')[1],
			"lastAuthed": datetime.datetime.utcnow() - datetime.timedelta(days=1),
			"type": type,
			"demo": True
		}
		
		# Insert into database
		accounts.insert_one(data)

	except Exception as e:
		print(f'[-] Failed to convert token ({e})')

if __name__ == '__main__':
	type = input('Type (mojang or microsoft) > ')

	if type != 'mojang' and type != 'microsoft':
		print('[-] Invalid type')
		exit()

	load_accounts(type)


	# # Export to JSON
	# with open('accounts.json', 'w') as f:
	# 	f.write(json.dumps(accounts))
	