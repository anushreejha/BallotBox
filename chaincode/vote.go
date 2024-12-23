package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type Vote struct {
	VoterID string `json:"voterID"`
	Vote    string `json:"vote"`
}

// Record vote by voterID
func (s *SmartContract) RecordVote(ctx contractapi.TransactionContextInterface, voterID string, vote string) error {
	voteRecord := Vote{
		VoterID: voterID,
		Vote:    vote,
	}

	voteJSON, err := json.Marshal(voteRecord)
	if err != nil {
		return fmt.Errorf("failed to marshal vote: %v", err)
	}

	return ctx.GetStub().PutState(voterID, voteJSON)
}

// Start chaincode
func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		fmt.Printf("Error creating chaincode: %v", err)
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting chaincode: %v", err)
	}
}
