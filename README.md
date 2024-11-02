# BallotBox

## Overview
BallotBox is a secure and efficient remote voting system designed to facilitate constituency-based elections using biometric verification through the AADHAR system and blockchain technology for vote recording. This project aims to provide a trustworthy and transparent voting platform that ensures voter authentication and maintains the integrity of the electoral process.

## Features
- **Biometric Authentication:** Secure user verification using the AADHAR API to ensure only registered voters can cast their vote.
- **Blockchain Ledger:** Immutable and transparent recording of votes to prevent tampering and provide end-to-end auditability.
- **User Interface:** An intuitive frontend for voters to register and cast their votes seamlessly.
- **Admin Panel:** A secure portal for election officials to manage elections and oversee results.
- **Secure Database:** SQLite is used for storing voter registration data, ensuring data consistency and security.

## Architecture
The system architecture comprises the following main components:

- **Voter Interface (Frontend UI):** User-facing web application for voter registration and voting.
- **Biometric Authentication:** Integration with the AADHAR API for authenticating voter identity.
- **Backend Server (Flask API):** Handles communication between the frontend, biometric verification, and blockchain ledger.
- **Blockchain Ledger:** Records each vote in an immutable, decentralized ledger.
- **Database:** Stores registration details and voter information securely.
- **Admin Panel:** Interface for election officials to manage election data and oversee voting processes.

## Installation and Setup
To set up the BallotBox project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/anushreejha/BallotBox.git
cd BallotBox
```

### 2. Install dependencies: 
Ensure that you have Python installed (check SQLite; usually present by default). Use pip to install the required Python packages:

```bash
Copy code
pip install -r requirements.txt
```

### 3. Configure the environment: 
Set up the configuration for AADHAR API integration and database connection in the file: 
```bash
.env
``` 

### 4. Run the server:

```bash
python app.py
```

### 5. Access the application: 
To access the interface, open your web browser and go to:
```bash
http://localhost:5000 
```

## Usage
- **Voter Registration:** Users register through the interface with their AADHAR details.
- **Voting Process:** Authenticated voters can securely cast their vote, which is then recorded on the blockchain.
- **Admin Control:** Election officials manage the election lifecycle through the admin panel.
