document.addEventListener('DOMContentLoaded', function() {
    const electionList = document.getElementById('election-list');
    
    // Sample election data (replace with actual data fetching logic)
    const elections = [
        { id: 1, name: "Local Council Election 2023" },
        { id: 2, name: "State Assembly Election 2023" },
        { id: 3, name: "National Parliament Election 2024" }
    ];

    // Create buttons for each election
    elections.forEach(election => {
        const button = document.createElement('button');
        button.className = 'election-button';
        button.textContent = election.name;
        button.addEventListener('click', () => {
            window.location.href = `ElectionDetails.html?id=${election.id}`;
        });
        electionList.appendChild(button);
    });
});
