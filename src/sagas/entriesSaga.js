import { take, call, put } from 'redux-saga/effects';
import  entriesTypes  from '../actions/entries.actions';
import axios from 'axios';

export function* getAllEntries(){
    yield take(entriesTypes.GET_ENTRIES);
    console.log('I need to get the entries');
    const result = yield call(axios, 'http://localhost:3001/entries');
    console.log(result);
    yield put({type: entriesTypes.POPULATE_ENTRIES, payload: result.data});
}