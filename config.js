const P_KEY = 80;
const R_KEY = 82;
const DEFAULT_SPEED = 2;
const DEFAULT_LIFT = 14;
const DEFAULT_DIFFICULTY = 1; // easy

const VERSION = {
    WITH_GRAVITY: 1,
    WITHOUT_GRAVITY: 2
}
const MODE = {
    ACTION: 1,
    TRIAL: 2
}

const DIFFICULTY_LEVELS = {
    1: { //easy
        minGap: 130,
        maxGap: 250,
        hFactor: 0.3,
        speed: 2
    },
    2: { //medium
        minGap: 160,
        maxGap: 230,
        hFactor: 0.5,
        speed: 4
    },
    3: { //hard
        minGap: 150,
        maxGap: 250,
        hFactor: 0.75,
        speed: 7
    }
}
const SPEED_LEVELS = {
    MIN: 1,
    MAX: 10
}

const SPEED_FRAMECOUNT__MAP = {
    1: 100,
    2: 98,
    3: 96, 
    4: 84,
    5: 50,
    6: 40,
    7: 45,
    8: 55,
    9: 65
}