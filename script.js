document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const rainSound = new Audio('assets/sounds/rain.mp3');
    rainSound.volume = 0.12;

    const soundTypes = ['perc', 'pad', 'chime', 'bass', 'atmos'];
    const soundsFolder = 'assets/sounds/glass-sounds/';
    const boxActivesFolder = 'assets/box-actives/';
    const soundFolders = {
        perc: [],
        pad: [],
        chime: [],
        bass: [],
        atmos: []
    };

    soundTypes.forEach(type => {
        for (let i = 1; i <= 12; i++) {
            soundFolders[type].push(`${soundsFolder}${type}/${type}${i}.wav`);
        }
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    Object.keys(soundFolders).forEach(key => shuffleArray(soundFolders[key]));

    let rainSoundPlaying = false;

    boxes.forEach((box, index) => {
        let audio;
        let currentSound;
        const row = Math.floor(index / 4);
        const type = soundTypes[row];
        const activeImage = `${boxActivesFolder}${type}.gif`;

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
                    currentSound = soundFolders[type].shift();
                    audio = new Audio(currentSound);
                    audio.loop = true;
                }
                audio.play();
                box.classList.add('active');
                box.style.backgroundImage = `url('${activeImage}')`;
            }
        });
    });
});
