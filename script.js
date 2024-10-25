let currentInput = "";
let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");

// Button click handling
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;

        if (value === "=") {
            evaluateExpression();
        } else if (value === "AC") {
            currentInput = "";
            display.value = "";
        } else if (value === "C") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else {
            // Replace ^ with ** for exponentiation in JavaScript
            currentInput += value === '^' ? '**' : value;
            display.value = currentInput;
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    let key = e.key;

    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
        currentInput += key === '^' ? '**' : key;
        display.value = currentInput;
    } else if (key === "Enter") {
        e.preventDefault();
        evaluateExpression();
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (key === "Escape") {
        currentInput = "";
        display.value = "";
    }
});

function evaluateExpression() {
    try {
        let result = eval(currentInput);
        if (result === Infinity || result === -Infinity) {
            display.value = "Error: Div by 0";
        } else {
            display.value = result;
            currentInput = result; // Optionally reset to result for new calculation
        }
    } catch (err) {
        display.value = "Error";
    }
}

// Dark mode toggle with icon change
let darkModeBtn = document.getElementById("dark-mode-btn");
let darkModeIcon = document.getElementById("dark-mode-icon");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("container").classList.toggle("dark-mode");
    document.querySelectorAll(".btn").forEach(btn => btn.classList.toggle("dark-mode"));

    if (darkModeIcon.classList.contains("fa-moon")) {
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
    } else {
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");
    }
});
