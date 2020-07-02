import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppStateType from '../stores/appState';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Page from '../components/Page';
import ResultPanel from '../components/ResultPanel';

// Ace editor
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import { Typography } from '@material-ui/core';

// Redux actions
import {submitScript} from '../stores/jobs/JobsActions';
import { JobResult } from '../workers/Job';


const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(2, 0),
    }
}));

const initialCode = `function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};`;

const mapState = (state: AppStateType) => ({
    inProgress: state.jobs.latest ? state.jobs.latest.inProgress : false,
    result: state.jobs.latest ? state.jobs.latest.result : undefined,
    error: state.jobs.latest ? state.jobs.latest.error : undefined
});

const mapDispatch = (dispatch: Dispatch) => ({
    submitScript: (script: string) => dispatch(submitScript(script))
});

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const EditorModePage = ({error, result, inProgress, submitScript}: PropsFromRedux) => {

    const classes = useStyles();
    const [code, setCode] = React.useState(initialCode)

    const handleExecuteClick = () => {
        submitScript(code);
    }

    return (
        <Page
            title="Editor Mode"
            subHeader={
                <Button
                    onClick={handleExecuteClick}
                    variant="contained"
                    className={classes.button}
                    startIcon={<PlayIcon />}
                >
                    Execute
                    </Button>
            }
        >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        onChange={setCode}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={code}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <ResultPanel inProgress={inProgress} result={result} error={error}></ResultPanel>
                </Grid>
            </Grid>
        </Page>
    );
}

export default connector(EditorModePage);
