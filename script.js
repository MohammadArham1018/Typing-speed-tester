const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

// Set Values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = ["can you avoid day dreaming for a minute and just look what talent do you have , is there any ?", "NO it doesn't matter who you are and what you do the only thing that matters is what you become", "yes you are right people talk shit about you and that's okay", "there are always regrets that hurts you that mekes you the overthinker", "you can be someone you always wanted to be , just discipline your self ", "the problem is you want o be successfull while sitting in your room", "and is this worth it, are you the person that's real to this world"];
    const randomIndex = Math.floor(Math.random() * paragraph.length);

    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add("active");

    document.addEventListener("keydown", () => input.focus());
    typingText.addEventListener("click", () => input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add("correct");
        } else {
            mistake++;
            char[charIndex].classList.add("incorrect");
        }

        charIndex++;
        
        if (charIndex < char.length) {
            char[charIndex - 1].classList.remove("active");  // Fix here
            char[charIndex].classList.add("active");
        }

        // Update stats
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

        // Stop the timer when all characters are typed
        if (charIndex === char.length) {
            clearInterval(timer);
            input.value = ""; // Clear input
            const wpmVal = Math.round((charIndex - mistake) / 5 / ((maxTime - timeLeft) / 60));
            wpm.innerText = wpmVal;
        }
    } else {
        clearInterval(timer);
        input.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = `${timeLeft} sec`;
        const wpmVal = Math.round((charIndex - mistake) / 5 / ((maxTime - timeLeft) / 60));
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = 60                          ;
    time.innerText = `${timeLeft} sec`;
    input.value = "";
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

loadParagraph();
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
