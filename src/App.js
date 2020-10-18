import React from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, makeStyles, useMediaQuery } from '@material-ui/core'
import tet from './lib/tet'


function App() {
  return (
    <>
      <Bar/>
      <ToneInputContainer/>
    </>
  );
}

function Bar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">TET</Typography>
      </Toolbar>
    </AppBar>
  )
}

const toneInputContainerStyle = makeStyles({
  toneInputContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // TODO: what is the right way of using functional styling?
    flexDirection: minWidth => minWidth ? 'row': 'column'
  }
});

function ToneInputContainer() {
  const minWidth = useMediaQuery('(min-width:720px)')
  const classes = toneInputContainerStyle(minWidth);
  const data = window.localStorage.lastData ?
    window.localStorage.lastData : {
      MIDI: 69,
      Hertz: 440.0,
      Pitch: 'A4'
    }
  const [toneData, toneDataUpdater] = React.useState(data);
  return(
    <main className={classes.toneInputContainer}>
      <ToneInput dataType="MIDI"  toneData={toneData} toneDataUpdater={toneDataUpdater}/>
      <ToneInput dataType="Hertz" toneData={toneData} toneDataUpdater={toneDataUpdater}/>
      <ToneInput dataType="Pitch" toneData={toneData} toneDataUpdater={toneDataUpdater}/>
    </main>
  )
}

const toneInputStyle = makeStyles({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    margin: '4pt 4pt 4pt 4pt',
    width: '226pt'
  },
  textField: {
    margin: '4pt 4pt 4pt 4pt'
  },
  cardTitle: {
    margin: '4pt 4pt 4pt 4pt'
  }
});

function ToneInput(props) {
  // Styling
  const classes = toneInputStyle();

  // Get the initial correct data.
  let selfData = props.toneData[props.dataType];

  // Whether our own data is valid or not is a state.
  const [isDataValid, isDataValidSetter] = React.useState(true);

  // Generate function for textbox data update
  function handleDataUpdate(e) {
    e.preventDefault();
    console.log(e);
    let val = e.target.value;
    // Gather essential information
    // Any error being thrown would cause the validity to be false
    let midi, hertz, pitch;
    try {
      if (props.dataType === 'MIDI') {
        val = parseInt(val);
        midi = val;
        hertz = tet.midiToHertz(val);
        pitch = tet.midiToPitch(val);
      } else if (props.dataType === 'Hertz') {
        val = parseFloat(val);
        midi = tet.hertzToMidi(val);
        hertz = val;
        pitch = tet.hertzToPitch(val);
      } else if (props.dataType === 'Pitch') {
        midi = tet.pitchToMidi(val);
        hertz = tet.pitchToHertz(val);
        pitch = val;
      }
    } catch(err) {
      console.error(err);
      isDataValidSetter(false);
      return true;
    }
    // Our data is valid
    isDataValidSetter(true);
    // Send the data to the upper component to trigger update
    props.toneDataUpdater({
      MIDI: midi,
      Hertz: hertz,
      Pitch: pitch
    })
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.cardTitle}>{props.dataType}</Typography>
        <TextField
          className={classes.textField}
          label={"Input " + props.dataType}
          value={selfData}
          variant="outlined"
          onChange={handleDataUpdate}/>
          <Typography variant='caption' color='error' style={{visibility: isDataValid ? 'hidden' : 'visible'}}>
            {`Error processing ${props.dataType} data.`}
          </Typography>
      </CardContent>
    </Card>
  );
}

export default App;
