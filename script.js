document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const glassSoundsFolder = 'assets/sounds/glass-sounds/';
    const rainSound = new Audio('assets/sounds/rain.mp3');
    rainSound.volume = 0.15;
    let glassSounds = [
        'sound1.mp3',
        'sound2.mp3',
        'sound3.mp3',
        'sound4.mp3',
        'sound5.mp3',
        'sound6.mp3'
    ];
    let activeBoxImages = [
        'active1.png',
        'active2.png',
        'active3.png',
        'active4.png',
        'active5.png',
        'active6.png'
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(glassSounds);
    shuffleArray(activeBoxImages);

    let rainSoundPlaying = false;

    boxes.forEach((box, index) => {
        let audio;
        let currentSound;
        let activeImage = activeBoxImages[index];

        box.addEventListener('click', () => {
            if (!rainSoundPlaying) {
                rainSound.play();
                rainSound.loop = true;
                rainSoundPlaying = true;
            }

            if (box.classList.contains('active')) {
                if (audio) {
                    audio.pause();
                }
                box.classList.remove('active');
                box.style.backgroundImage = "url('assets/box-inactive.png')";
            } else {
                if (!currentSound) {
                    currentSound = glassSounds[Math.floor(Math.random() * glassSounds.length)];
                    audio = new Audio(`${glassSoundsFolder}${currentSound}`);
                    audio.loop = true;
                }
                audio.play();
                box.classList.add('active');
                box.style.backgroundImage = `url('assets/box-actives/${activeImage}')`;
            }
        });
    });
});
