import React from 'react';
import { Typography, Card, CardContent, TextField,
  makeStyles, useMediaQuery, Container } from '@material-ui/core'
import tet from './lib/tet'

const TONE_DATA_STORAGE = 'previousToneData';

const toneInputsStyle = makeStyles((theme) => ({
  toneInputContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: props => props.direction,
    backgroundColor: theme.palette.background.default
  },
  card: {
    margin: '4pt 4pt 4pt 4pt',
    width: '226pt',
    height: '120pt'
  },
  textField: {
    margin: '4pt 4pt 4pt 4pt'
  },
  cardTitle: {
    margin: '4pt 4pt 4pt 4pt'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  }
}));
  
function ToneInputs() {
  let minWidth = useMediaQuery('(min-width:720px)');
  let classes = toneInputsStyle({
    direction: minWidth ? 'row': 'column'
  });

  let initialData = window.localStorage.getItem(TONE_DATA_STORAGE)
  initialData = initialData === null ?
    { midi: 69, hertz: 440.0, pitch: "A4" } : JSON.parse(initialData)

  let [toneData, toneDataUpdater] = React.useState(initialData);
  let [isMidiValid,  isMidiValidUpdater ] = React.useState(true);
  let [isHertzValid, isHertzValidUpdater] = React.useState(true);
  let [isPitchValid, isPitchValidUpdater] = React.useState(true);

  function updateAllInfo(obj) {
    isMidiValidUpdater(true);
    isHertzValidUpdater(true);
    isPitchValidUpdater(true);
    toneDataUpdater(obj);
    window.localStorage.setItem(TONE_DATA_STORAGE, JSON.stringify(obj));
  }

  function handleMidiUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    midi = parseInt(e.target.value);
    try {
      pitch = tet.midiToPitch(midi);
      hertz = tet.midiToHertz(midi);
    } catch (err) {
      console.log(err);
      isMidiValidUpdater(false);
      toneDataUpdater({ midi, hertz, pitch });
      return;
    }
    updateAllInfo({ midi, hertz, pitch });
  }

  function handleHertzUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    hertz = parseFloat(e.target.value);
    try {
      pitch = tet.hertzToPitch(hertz);
      midi = tet.hertzToMidi(hertz);
    } catch (err) {
      console.log(err);
      isHertzValidUpdater(false);
      toneDataUpdater({ midi, hertz, pitch });
      return;
    }
    updateAllInfo({ midi, hertz, pitch });
  }

  function handlePitchUpdate(e) {
    let {midi, hertz, pitch} = toneData;
    pitch = e.target.value;
    try {
      midi = tet.pitchToMidi(pitch);
      hertz = tet.pitchToHertz(pitch);
    } catch (err) {
      console.log(err);
      isPitchValidUpdater(false);
      toneDataUpdater({ midi, hertz, pitch });
      return;
    }
    updateAllInfo({ midi, hertz, pitch });
  }
  
  return(
    <div className={classes.toneInputContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>MIDI</Typography>
          <TextField label='Input MIDI' variant='outlined'
            className={classes.textField}
            value={Number.isNaN(toneData.midi) ? '' : toneData.midi}
            onChange={handleMidiUpdate}/>
          <Typography variant='caption' color='error'
            style={{visibility: isMidiValid ? 'hidden' : 'visible'}}>
            Error processing MIDI data.
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>Hertz</Typography>
          <TextField label='Input hertz' variant='outlined'
            className={classes.textField}
            value={Number.isNaN(toneData.hertz) ? '' : toneData.hertz}
            onChange={handleHertzUpdate}/>
          <Typography variant='caption' color='error'
            style={{visibility: isHertzValid ? 'hidden' : 'visible'}}>
            Error processing hertz data.
          </Typography>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" className={classes.cardTitle}>Pitch</Typography>
          <TextField label='Input pitch' variant='outlined'
            className={classes.textField}
            value={toneData.pitch}
            onChange={handlePitchUpdate}/>
          <Typography variant='caption' color='error'
            style={{visibility: isPitchValid ? 'hidden' : 'visible'}}>
            Error processing pitch data.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ToneInputs;