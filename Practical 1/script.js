const votes = {
  JavaScript: 0,
  Python: 0,
  Java: 0
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  document.getElementById("js-count").textContent = votes.JavaScript;
  document.getElementById("py-count").textContent = votes.Python;
  document.getElementById("java-count").textContent = votes.Java;
}

// Simulate real-time voting every 2 seconds
setInterval(() => {
  const langs = ["JavaScript", "Python", "Java"];
  const randomLang = langs[Math.floor(Math.random() * langs.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000);
