document.addEventListener("DOMContentLoaded", function () {
    const voteForm = document.getElementById("voteForm");
    const responseMessage = document.getElementById("responseMessage");
    const blockchainSection = document.getElementById("blockchainSection");
    const voteSection = document.getElementById("voteSection");
    const blockchainData = document.getElementById("blockchainData");

    // Tab Switching
    document.getElementById("voteTab").addEventListener("click", function () {
        voteSection.style.display = "block";
        blockchainSection.style.display = "none";
    });

    document.getElementById("blockchainTab").addEventListener("click", function () {
        voteSection.style.display = "none";
        blockchainSection.style.display = "block";
    });

    // Cast Vote
    voteForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const voterId = document.getElementById("voterId").value;
        const constituency = document.getElementById("constituency").value;
        const candidate = document.getElementById("candidate").value;

        if (!voterId || !constituency || !candidate) {
            responseMessage.innerText = "All fields are required!";
            responseMessage.style.color = "red";
            return;
        }

        const voteData = {
            voter_id: voterId,
            constituency: constituency,
            candidate: candidate,
        };

        try {
            const response = await fetch("http://127.0.0.1:10000/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(voteData),
            });

            const result = await response.json();
            if (response.ok) {
                responseMessage.innerText = "Vote cast successfully!";
                responseMessage.style.color = "green";
                voteForm.reset();
            } else {
                responseMessage.innerText = `Error: ${result.error}`;
                responseMessage.style.color = "red";
            }
        } catch (error) {
            responseMessage.innerText = "Error connecting to the server.";
            responseMessage.style.color = "red";
        }
    });

    // Fetch Blockchain
    document.getElementById("fetchBlockchain").addEventListener("click", async function () {
        blockchainData.innerHTML = "Fetching blockchain data...";
        try {
            const response = await fetch("http://127.0.0.1:10000/blockchain");
            const result = await response.json();

            if (response.ok) {
                blockchainData.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
            } else {
                blockchainData.innerHTML = `Error: ${result.error}`;
            }
        } catch (error) {
            blockchainData.innerHTML = "Error connecting to the server.";
        }
    });
});
