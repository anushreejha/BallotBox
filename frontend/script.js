document.getElementById("voteForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const voterId = document.getElementById("voterId").value;
    const constituency = document.getElementById("constituency").value;
    const candidate = document.getElementById("candidate").value;

    const voteData = {
        voter_id: voterId,
        constituency: constituency,
        candidate: candidate
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
            document.getElementById("responseMessage").innerText = "Vote cast successfully!";
        } else {
            document.getElementById("responseMessage").innerText = `Error: ${result.error}`;
        }
    } catch (error) {
        document.getElementById("responseMessage").innerText = "Error connecting to the server.";
    }
});
