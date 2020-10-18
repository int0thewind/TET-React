import tet from './tet';

test("Hertz can be converted to midi", _ => {
    expect(tet.hertzToMidi(880)).toBe(81);
    expect(tet.hertzToMidi(820)).toBe(80);
    expect(tet.hertzToMidi(10)).toBe(3);
    expect(tet.hertzToMidi(12)).toBe(7);
    expect(tet.hertzToMidi(123)).toBe(47);
    expect(tet.hertzToMidi(1234)).toBe(87);
    expect(tet.hertzToMidi(12345)).toBe(127);
    expect(tet.hertzToMidi(13000)).toThrow();
})

test("Hertz can be converted to pitch", _ => {
    expect(tet.hertzToPitch(880)).toBe('A5');
    expect(tet.hertzToPitch(820)).toBe('Ab5');
    expect(tet.hertzToPitch(10)).toBe('Eb00');
    expect(tet.hertzToPitch(12)).toBe('G00');
    expect(tet.hertzToPitch(123)).toBe('B2');
    expect(tet.hertzToPitch(1234)).toBe('Eb6');
    expect(tet.hertzToPitch(-1)).toThrow();
    expect(tet.hertzToPitch(0)).toThrow();
})

test("MIDI can be converted to Hertz", _ => {
    expect(tet.midiToHertz(0)).toBeCloseTo(8.17);
    expect(tet.midiToHertz(60)).toBeCloseTo(261.63);
    expect(tet.midiToHertz(69)).toBeCloseTo(440.0);
    expect(tet.midiToHertz(81)).toBeCloseTo(880.0);
    expect(tet.midiToHertz(100)).toBeCloseTo(2637.02);
    expect(tet.midiToHertz(123)).toBeCloseTo(9956.06);
    expect(tet.midiToHertz(0.0)).toThrow();
    expect(tet.midiToHertz(60.1)).toThrow();
})

test("MIDI can be converted to Pitch", _ => {
    expect(tet.midiToPitch(66).toBe())
})
