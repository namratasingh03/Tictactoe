let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const WinPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to reset the game
const resetGame = () => {
  turnO = true; // Reset turn to "O"
  msgContainer.classList.add("hide"); // Hide the winner message
  enableBoxes(); // Enable all boxes and clear their content
};

// Enable all boxes and clear their content
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false; // Enable the box
    box.innerText = ""; // Clear the text
    box.classList.remove("disabled"); // Remove any extra disabled classes if used in CSS
  });
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true; // Disable the box
    box.classList.add("disabled"); // Optional: Add a class for visual indication
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `CONGRATULATIONS, WINNER IS ${winner}`;
  msgContainer.classList.remove("hide"); // Show the winner message
  disableBoxes(); // Disable all boxes
};

// Check for a winner
const checkWinner = () => {
  for (let pattern of WinPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Declare the winner
        return; // Exit the function to prevent further checks
      }
    }
  }
  // Check for a draw (if all boxes are filled and no winner)
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw) {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Add event listeners to boxes
const initializeGame = () => {
  boxes.forEach((box) => {
    box.innerText = ""; // Clear the box content (important for resetting)
    box.disabled = false; // Enable the box
    box.addEventListener("click", () => {
      if (box.disabled) return; // Skip if box is already clicked
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true; // Disable the box after clicking
      checkWinner(); // Check if there's a winner
    });
  });
};

// Initialize the game and add button listeners
initializeGame();
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
