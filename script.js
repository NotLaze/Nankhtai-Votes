const candidates = ['Bhavya', 'Jovita', 'Lavesh', 'Mansi', 'Tanaya'];

// Load votes from localStorage or initialize
let votes = JSON.parse(localStorage.getItem('votes')) || {
  Bhavya: 0,
  Jovita: 0,
  Lavesh: 0,
  Mansi: 0,
  Tanaya: 0
};

// Function to vote
function vote(name) {
  votes[name] += 1;
  localStorage.setItem('votes', JSON.stringify(votes));
  showResults();
}

// Function to calculate percentages and show results
function showResults() {
  const totalVotes = Object.values(votes).reduce((a,b) => a+b, 0);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  candidates.forEach(candidate => {
    const percent = totalVotes === 0 ? 0 : ((votes[candidate]/totalVotes)*100).toFixed(1);
    resultsDiv.innerHTML += `${candidate}: ${votes[candidate]} votes (${percent}%)<br>`;
  });

  // Optional: show max and min
  const maxVotes = Math.max(...Object.values(votes));
  const minVotes = Math.min(...Object.values(votes));

  resultsDiv.innerHTML += `<br>Most Votes: ${candidates.filter(c => votes[c] === maxVotes).join(', ')}<br>`;
  resultsDiv.innerHTML += `Least Votes: ${candidates.filter(c => votes[c] === minVotes).join(', ')}`;
}

// Initial display
showResults();
