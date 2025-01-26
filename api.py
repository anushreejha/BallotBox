from flask import Flask, request, jsonify
from blockchain import Blockchain
from ipfs_helper import IPFSHelper

app = Flask(__name__)
blockchain = Blockchain()
ipfs = IPFSHelper()

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the BallotBox API!"})


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_hash = ipfs.upload_file(file)
    blockchain.add_transaction({'file_hash': file_hash})
    return jsonify({'message': 'File uploaded successfully', 'file_hash': file_hash})

@app.route('/download/<file_hash>', methods=['GET'])
def download_file(file_hash):
    file_content = ipfs.download_file(file_hash)
    if file_content:
        return file_content
    return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
