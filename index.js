const emojiMap = { rock: "🪨", paper: "📄", scissor: "✂️" };

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * 3)];
}

function checkWinner(user, computer) {
    if (user === computer) return "draw";
    if (
        (user === "rock" && computer === "scissor") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissor" && computer === "paper")
    ) return "user";
    return "computer";
}

function animateEmoji(id) {
    const el = document.getElementById(id);
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
}

function bumpScore(id) {
    const el = document.getElementById(id);
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
    setTimeout(() => el.classList.remove("bump"), 300);
}

function setResult(msg, type) {
    const el = document.getElementById("result");
    el.textContent = msg;
    el.className = "";
    void el.offsetWidth;
    el.classList.add(type, "pop");
}

function playGame(user) {
    const computer = getComputerChoice();
    const winner = checkWinner(user, computer);
    document.getElementById("user-emoji").textContent = emojiMap[user];
    document.getElementById("cpu-emoji").textContent = emojiMap[computer];
    animateEmoji("user-emoji");
    animateEmoji("cpu-emoji");
    const cpuChoice = computer.charAt(0).toUpperCase() + computer.slice(1);
    const uChoice = user.charAt(0).toUpperCase() + user.slice(1);

    if (winner === "user") {
        userScore++;
        document.getElementById("user-score").textContent = userScore;
        bumpScore("user-score");
        setResult(`🎉 You win! ${uChoice} beats ${cpuChoice}`, "win");
    } else if (winner === "computer") {
        computerScore++;
        document.getElementById("computer-score").textContent = computerScore;
        bumpScore("computer-score");
        setResult(`😤 CPU wins! ${cpuChoice} beats ${uChoice}`, "lose");
    } else {
        setResult(`🤝 It's a draw! Both chose ${uChoice}`, "draw");
    }
}
["rock", "paper", "scissor"].forEach(choice => {
    document.getElementById(choice).addEventListener("click", () => playGame(choice));
});
document.getElementById("reset-btn").addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    document.getElementById("user-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
    document.getElementById("user-emoji").textContent = "🤔";
    document.getElementById("cpu-emoji").textContent = "🤖";
    const result = document.getElementById("result");
    result.textContent = "Pick your move!";
    result.className = "";
});
