document.addEventListener('DOMContentLoaded', () => {
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const calculateButton = document.getElementById('calculate');
    const meterFill = document.getElementById('meter-fill');
    const percentageText = document.getElementById('percentage');
    const messageText = document.getElementById('message');
    const heartsContainer = document.getElementById('hearts-container');

    let lastNames = { name1: '', name2: '' };

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 5;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }

    function startHeartsAnimation() {
        setInterval(createHeart, 500);
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createHeart(), i * 100);
        }
    }

    startHeartsAnimation();

    calculateButton.addEventListener('click', () => {
        const name1 = name1Input.value.trim().toLowerCase();
        const name2 = name2Input.value.trim().toLowerCase();

        if (!name1 || !name2) {
            alert('Please enter both names!');
            return;
        }

        if (name1 === lastNames.name1 && name2 === lastNames.name2) {
            return;
        }

        lastNames.name1 = name1;
        lastNames.name2 = name2;

        const calculateLove = (name1, name2) => {
            let score = 0;
            
            const lengthScore = Math.min(name1.length, name2.length) / Math.max(name1.length, name2.length) * 30;
            score += lengthScore;

            const uniqueChars1 = new Set(name1);
            const uniqueChars2 = new Set(name2);
            let matchingChars = 0;
            
            uniqueChars1.forEach(char => {
                if (uniqueChars2.has(char)) {
                    matchingChars++;
                }
            });

            score += (matchingChars / Math.max(uniqueChars1.size, uniqueChars2.size)) * 70;
            score += Math.random() * 10 - 5;
            
            return Math.min(Math.max(Math.round(score), 0), 100);
        };

        const loveScore = calculateLove(name1, name2);
        
        meterFill.style.width = `${loveScore}%`;
        percentageText.textContent = `${loveScore}%`;

        let message = '';
        if (loveScore < 20) {
            message = "don't even bother bru ghost each other🤣";
        } else if (loveScore < 40) {
            message = "if you want 🙄";
        } else if (loveScore < 60) {
            message = "hold on y'all might be on to something 😮";
        } else if (loveScore < 80) {
            message = "this could go somewhere 🤭";
        } else {
            message = "perfect match! ❤️";
        }

        messageText.textContent = message;
    });
}); 
