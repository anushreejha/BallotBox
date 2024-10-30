document.addEventListener('DOMContentLoaded', function() {
    const electionList = document.getElementById('election-list');
    
    fetch('get_elections.php')
        .then(response => response.json())
        .then(elections => {
            elections.forEach(election => {
                const button = document.createElement('button');
                button.className = 'election-button';
                button.textContent = election.name;
                button.addEventListener('click', () => {
                    window.location.href = `ElectionDetails.html?id=${election.id}`;
                });
                electionList.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching elections:', error);
        });
});
