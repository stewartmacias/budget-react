import { take, call, put, fork } from 'redux-saga/effects';
import  entriesTypes  from '../actions/entries.actions';
import axios from 'axios';
import { populateEntries, populateEntryDetail } from '../actions/entries.actions';

export function* getAllEntries(){
    yield take(entriesTypes.GET_ENTRIES);
    console.log('I need to get the entries');
    const {data} = yield call(axios, 'http://localhost:3001/entries');
    //console.log(data);
    yield put(populateEntries(data));
}

export function* getEntryDetails(id){
    const { data } = yield call (axios, `http://localhost:3001/values/${id}`);
    console.log(data);
    yield put(populateEntryDetail(id, data));
}

export function* getAllEntriesDetails() {
    const { payload } = yield take(entriesTypes.POPULATE_ENTRIES);
    for (let index = 0; index < payload.length; index++) {
        const entry = payload[index];
        yield fork(getEntryDetails, entry.id)
    }
}