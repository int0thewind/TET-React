import React from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, makeStyles, useMediaQuery } from '@material-ui/core'


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
  const [toneData, toneDataUpdater] = React.useState({
    type: 'midi',
    data: '69'
  });
  return(
    <main className={classes.toneInputContainer}>
      <ToneInput dataType="MIDI" toneData={toneData} toneDataUpdater={toneDataUpdater}/>
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
  const classes = toneInputStyle();
  const [isDataValid, isDataValidSetter] = React.useState(false);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.cardTitle}>{props.dataType}</Typography>
        <TextField
          className={classes.textField}
          label={"Input " + props.dataType}
          variant="outlined"/>
        {isDataValid ?
          <></> :
          <Typography variant='caption' color='error'>{`Error processing ${props.dataType} data.`}</Typography>}
      </CardContent>
    </Card>
  );
}

export default App;
