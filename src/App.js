import React from 'react';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, TextField, makeStyles, useMediaQuery } from '@material-ui/core'

function App() {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Bar/>
      <ToneInputContainer/>
    </div>
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

    flexDirection: minWidth => minWidth ? 'row': 'column'
  },
  toneInputContainerParent: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function ToneInputContainer() {
  const minWidth = useMediaQuery('(min-width:720px)')
  const classes = toneInputContainerStyle(minWidth);
  return(
    <div className={classes.toneInputContainerParent}>
      <div className={classes.toneInputContainer}>
        <ToneInput dataType="MIDI"/>
        <FlexGap/>
        <ToneInput dataType="Hertz"/>
        <FlexGap/>
        <ToneInput dataType="Pitch"/>
      </div>
      <div>
        <FlexGap size='8pt'/>
        <Button variant="contained" color="primary" className={classes.cardButton}>Update</Button>
      </div>
    </div>
  )
}

const toneInputStyle = makeStyles({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardButton: {
    width: '24pt',
  }
});

function ToneInput(props) {
  const classes = toneInputStyle();

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">
            {props.dataType}
        </Typography>
        <FlexGap/>
        <TextField label={"Input " + props.dataType} variant="outlined"/>
      </CardContent>
    </Card>
  );
}

function FlexGap(props) {
  const size = props.size ? props.size : '4pt'
  return (
    <div style={{height: size, width: size}} />
  );
}

export default App;
