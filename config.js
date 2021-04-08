const VERSION = {
    WITH_GRAVITY: 1,
    WITHOUT_GRAVITY: 2
}
const MODE = {
    ACTION: 'action',
    TRIAL: 'trial'
}

const DIFFICULTY_LEVELS = {
    0: { //easy
        minGap: 200,
        maxGap: 350,
        hFactor: 0.3
    },
    1: { //medium
        minGap: 200,
        maxGap: 250,
        hFactor: 0.5
    },
    2: { //hard
        minGap: 150,
        maxGap: 250,
        hFactor: 0.75
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