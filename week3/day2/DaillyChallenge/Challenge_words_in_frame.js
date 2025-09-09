function wordsInFrame() {
    let input = prompt("Enter several words separated by commas:");
    if (!input) return;

    let words = input.split(",").map(word => word.trim());

    let maxLength = 0;
    for (let word of words) {
        if (word.length > maxLength) {
            maxLength = word.length;
        }
    }

    let border = "*".repeat(maxLength + 4);
    console.log(border);

    for (let word of words) {
        console.log(`* ${word.padEnd(maxLength, " ")} *`);
    }

    console.log(border);
}

wordsInFrame();
