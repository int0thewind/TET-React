import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import tet from './lib/tet/tet';

const TONE_DATA_STORAGE = 'previousToneData';

const toneInputsStyle = makeStyles(theme => ({
  toneInputContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: props => props.direction,
    backgroundColor: theme.palette.background.default,
  },
  card: {
    margin: '4pt 4pt 4pt 4pt',
    width: '226pt',
    height: '120pt',
  },
  textField: {
    margin: '4pt 4pt 4pt 4pt',
  },
  cardTitle: {
    margin: '4pt 4pt 4pt 4pt',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function ToneInputs() {
  const minWidth = useMediaQuery('(min-width:720px)');
  const classes = toneInputsStyle({
    direction: minWidth ? 'row' : 'column',
  });

  let initialData = JSON.parse(window.localStorage.getItem(TONE_DATA_STORAGE));
  if (initialData === null) initialData = {midi: 69, hertz: 440.0, pitch: 'A4'};

  const [toneData, toneDataUpdater] = React.useState(initialData);
  const [isMidiValid, isMidiValidUpdater] = React.useState(true);
  const [isHertzValid, isHertzValidUpdater] = React.useState(true);
  const [isPitchValid, isPitchValidUpdater] = React.useState(true);

  function updateAllInfo(obj) {
    isMidiValidUpdater(true);
    isHertzValidUpdater(true);
    isPitchValidUpdater(true);
    toneDataUpdater(obj);
    window.localStorage.setItem(TONE_DATA_STORAGE, JSON.stringify(obj));
  }

  function handleMidiUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    midi = parseInt(e.target.value, 10);
    try {
      pitch = tet.midiToPitch(midi);
      hertz = tet.midiToHertz(midi);
    } catch (err) {
      isMidiValidUpdater(false);
      toneDataUpdater({midi, hertz, pitch});
      return;
    }
    updateAllInfo({midi, hertz, pitch});
  }

  function handleHertzUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    hertz = parseFloat(e.target.value);
    try {
      pitch = tet.hertzToPitch(hertz);
      midi = tet.hertzToMidi(hertz);
    } catch (err) {
      isHertzValidUpdater(false);
      toneDataUpdater({midi, hertz, pitch});
      return;
    }
    updateAllInfo({midi, hertz, pitch});
  }

  function handlePitchUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    pitch = e.target.value;
    try {
      midi = tet.pitchToMidi(pitch);
      hertz = tet.pitchToHertz(pitch);
    } catch (err) {
      isPitchValidUpdater(false);
      toneDataUpdater({midi, hertz, pitch});
      return;
    }
    updateAllInfo({midi, hertz, pitch});
  }

  return (
    <div className={classes.toneInputContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>
            MIDI
          </Typography>
          <TextField
            label="Input MIDI"
            variant="outlined"
            className={classes.textField}
            value={Number.isNaN(toneData.midi) ? '' : toneData.midi}
            onChange={handleMidiUpdate}
          />
          <Typography
            variant="caption"
            color="error"
            style={{visibility: isMidiValid ? 'hidden' : 'visible'}}
          >
            Invalid MIDI number
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>
            Hertz
          </Typography>
          <TextField
            label="Input hertz"
            variant="outlined"
            className={classes.textField}
            value={Number.isNaN(toneData.hertz) ? '' : toneData.hertz}
            onChange={handleHertzUpdate}
          />
          <Typography
            variant="caption"
            color="error"
            style={{visibility: isHertzValid ? 'hidden' : 'visible'}}
          >
            Invalid hertz
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>
            Pitch
          </Typography>
          <TextField
            label="Input pitch"
            variant="outlined"
            className={classes.textField}
            value={toneData.pitch}
            onChange={handlePitchUpdate}
          />
          <Typography
            variant="caption"
            color="error"
            style={{visibility: isPitchValid ? 'hidden' : 'visible'}}
          >
            Invalid pitch
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ToneInputs;
