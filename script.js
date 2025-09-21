const candidates = ['Bhavya', 'Jovita', 'Lavesh', 'Mansi', 'Tanaya'];

// Initialize votes from localStorage or start fresh
let votes = JSON.parse(localStorage.getItem('votes')) || {
  Bhavya: 0,
  Jovita: 0,
  Lavesh: 0,
  Mansi: 0,
  Tanaya: 0
};

// Check if user has voted
let hasVoted = JSON.parse(localStorage.getItem('hasVoted')) || false;

// Show selected tab
function showTab(tab) {
  document.getElementById('vote-tab').style.display = tab === 'vote' ? 'block' : 'none';
  document.getElementById('results-tab').style.display = tab === 'results' ? 'block' : 'none';
}

// Voting function
function vote(name) {
  if (hasVoted) {
    document.getElementById('vote-msg').textContent = "You can only vote once!";
    return;
  }
  votes[name] += 1;
  hasVoted = true;
  localStorage.setItem('votes', JSON.stringify(votes));
  localStorage.setItem('hasVoted', JSON.stringify(hasVoted));
  document.getElementById('vote-msg').textContent = `Thanks for voting for ${name}!`;
  showResults();
}

// Show results function
function showResults() {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  candidates.forEach(candidate => {
    const percent = totalVotes === 0 ? 0 : ((votes[candidate]/totalVotes)*100).toFixed(1);
    resultsDiv.innerHTML += `${candidate}: ${votes[candidate]} votes (${percent}%)<br>`;
  });

  // Most and least votes
  const maxVotes = Math.max(...Object.values(votes));
  const minVotes = Math.min(...Object.values(votes));
  resultsDiv.innerHTML += `<br>Most Votes: ${candidates.filter(c => votes[c] === maxVotes).join(', ')}<br>`;
  resultsDiv.innerHTML += `Least Votes: ${candidates.filter(c => votes[c] === minVotes).join(', ')}`;
}

// Show results initially
showResults();
// Initial display
showResults();
