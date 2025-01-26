import requests
from config import IPFS_API_ENDPOINT

class IPFSHelper:
    def upload_file(self, file):
        files = {'file': file.read()}
        response = requests.post(f'{IPFS_API_ENDPOINT}/add', files=files)
        return response.json().get('Hash')

    def download_file(self, file_hash):
        response = requests.get(f'{IPFS_API_ENDPOINT}/cat?arg={file_hash}')
        if response.status_code == 200:
            return response.content
        return None
