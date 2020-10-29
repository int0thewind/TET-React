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

const keyToMidi = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
}

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

const pitchOctave = {
    0: '00',
    1: '0',
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
    10: '9'
}

const octaveNumberToMidi = num => {
    if (num === '00')
        return 0;
    return (parseInt(num) + 1) * 12
}

const checkPitch = pitch => {
    if (!(typeof pitch === 'string' &&
        pitch.match(/^[A-G]((##|#|ss|s|bb|b|ff|f)?)(00|[0-9])$/gm)[0] === pitch))
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

const parsePitch = pitch => [pitch.match(/^[A-G]/)[0],
                            pitch.match(/((##|#|ss|s|bb|b|ff|f))/) ?
                                pitch.match(/((##|#|ss|s|bb|b|ff|f))/)[0] : '',
                            pitch.match(/(00|[0-9])/)[0]];

function midiToHertz(midi) {
    checkMidi(midi);
    let ret = 440 * (2 ** ((midi - 69) / 12));
    checkHertz(ret);
    return ret;
}

function midiToPitch (midi) {
    checkMidi(midi);
    let ret = `${midiToKey[midi % 12]}${pitchOctave[Math.floor(midi / 12)]}`;
    checkPitch(ret);
    return ret;
}

function hertzToMidi(hertz) {
    checkHertz(hertz);
    let ret = Math.round(69 + Math.log2(hertz/440.0) * 12);
    checkMidi(ret);
    return ret;
}

function pitchToMidi (pitch) {
    checkPitch(pitch);
    let [letter, acci, oct] = parsePitch(pitch);
    let ret = keyToMidi[letter] + accidentalsToAddition[acci] + octaveNumberToMidi(oct);
    checkMidi(ret);
    return ret;
}

function hertzToPitch (hertz) {
    return midiToPitch(hertzToMidi(hertz));
}

function pitchToHertz (pitch) {
    return midiToHertz(pitchToMidi(pitch));
}

export default { midiToHertz, midiToPitch, hertzToMidi, hertzToPitch, pitchToMidi, pitchToHertz, checkPitch, checkMidi, checkHertz };