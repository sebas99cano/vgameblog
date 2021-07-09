import reducers from '../store/reducers/rootReducer';

test('reducers', () => {
    let state;
    state = reducers(undefined, {});
    expect(state).toEqual({favorites:{publications:[],user:'',loading:false,error:'',is:false},publication:{publications:[],loading:false,error:''}});
});