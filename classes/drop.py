import requests
import json

API = 'http://namemc.snipesharp.xyz:25566/profile/{}'
AVAILABLE_ENDPOINT = 'https://api.minecraftservices.com/minecraft/profile/name/{}/available'
PROFILE_ENDPOINT = 'https://api.minecraftservices.com/minecraft/profile/'

def claim_name(username, api_key):
    headers = {'x-api-key': api_key}
    data = {'name': username}
    response = requests.post(PROFILE_ENDPOINT, headers=headers, json=data)

    if response.status_code == 200:
        print(f'Successfully claimed name {username}')
    else:
        print(f'Failed to claim name {username}')

def check_name_availability(username):
    response = requests.get(AVAILABLE_ENDPOINT.format(username))
    if response.status_code == 200:
        data = response.json()
        if data['available']:
            print(f'{username} is available')
        else:
            print(f'{username} is not available')
    else:
        print('Failed to check name availability')

def get_profile(username):
    response = requests.get(API.format(username))
    if response.status_code == 200:
        data = response.json()
        print(f'Name: {data["name"]}')
        print(f'UUID: {data["uuid"]}')
    else:
        print(f'Failed to get profile for {username}')

username = input("Enter the username you want to claim: ")
api_key = input("Enter your api key: ")
check_name_availability(username)
claim_name(username, api_key)
get_profile(username)
