from flask import Flask, request, jsonify
from blockchain import Blockchain
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  
blockchain = Blockchain()

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the BallotBox API!"})

@app.route('/vote', methods=['POST'])
def cast_vote():
    voter_id = request.json.get('voter_id')
    constituency = request.json.get('constituency')
    candidate = request.json.get('candidate')

    if not voter_id or not constituency or not candidate:
        return jsonify({'error': 'Invalid input'}), 400

    vote_transaction = {
        'voter_id': voter_id,
        'constituency': constituency,
        'candidate': candidate,
    }
    try:
        blockchain.add_transaction(vote_transaction)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    return jsonify({'message': 'Vote cast successfully', 'transaction': vote_transaction})

@app.route('/blockchain', methods=['GET'])
def get_blockchain():
    chain_data = [block for block in blockchain.chain]
    return jsonify({'chain': chain_data, 'length': len(chain_data)})

if __name__ == '__main__':
    app.run(debug=True)
