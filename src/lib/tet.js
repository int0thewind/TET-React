const pitchPattern = /^[A-G]((##|#|ss|s|bb|b|ff|f){0,1})(00|[0-9])$/gm;

const pitchLetter = /^[A-G]/;

const pitchAccidentals = /((##|#|ss|s|bb|b|ff|f){0,1})/;

const pitchNumber = /(00|[0-9])/;

const midiToKey = {
    0: "C",
    1: "C#",
    2: "D",
    3: "Eb",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "Ab",
    9: "A",
    10: "Bb",
    11: "B"
};

const accidentalsToAddition = {
    "bb": -2,
    "ff": -2,
    "b": -1,
    "f": -1,
    "": 0,
    "#": 1,
    "s": 1,
    "##": 2,
    "ss": 2
};

const checkPitch = pitch => {
    if (!(typeof pitch === 'string' &&
        pitch.match(/^[A-G]((##|#|ss|s|bb|b|ff|f){0,1})(00|[0-9])$/gm)[0] === pitch))
        throw Error(`Your input pitch ${pitch} is not a valid pitch`)
};

const checkMidi = midi => {
    if (!(Number.isInteger(midi) && midi >= 0 && midi <= 127))
        throw Error(`A valid MIDI number should be an integer within 0-127, but yours is ${midi}`)
};

const checkHertz = hertz => {
    if (!(typeof hertz === 'number' && hertz >= 8 && hertz <= 12544))
        throw Error(`A valid hertz that represents a musical note should be with 8-12544, but yours is ${hertz}`);
};

const parsePitch = pitch => [pitch.match(pitchLetter)[0],
                             pitch.match(pitchAccidentals)[0],
                             pitch.match(pitchNumber)[0]];

function midiToHertz(midi) {
    checkMidi(midi);
    return 440 * (2 ** ((midi - 69) / 12));
}

function midiToPitch (midi) {
    checkMidi(midi);
    // TODO: finish this
    return `${midiToKey[midi % 12]}${pitchOctave[Math.floor(midi / 12)]}`;
}

function hertzToMidi(hertz) {
    checkHertz(hertz);
    return Math.round(69 + Math.log2(hertz/440.0) * 12);
}

const pitchToMidi = pitch => {
    checkPitch(pitch);
    let pitchParameters = parsePitch(pitch);
    // TODO: finish this
};

const hertzToPitch = hertz => midiToPitch(hertzToMidi(hertz));

const pitchToHertz = pitch => midiToHertz(pitchToMidi(pitch));

export default { midiToHertz, midiToPitch, hertzToMidi, hertzToPitch, pitchToMidi, pitchToHertz};