const redux = require('redux');

var defaultState = {
    mang: ['A', 'B', 'C'],
    isAdding: false
}

var reducer = (state = defaultState, action) => {
    // console.log(state)
    switch (action.type) {
        case 'TOGGLE_IS_ADDING':
            return {...state, isAdding: !state.isAdding}; // copt all state and ghi đè thay đổi thuộc tính isAdding
        case 'ADD_ITEM':
            return {...state, mang: [...state.mang, action.item]} // cach them thuoc tinh vao mang
        case 'REMOVE_ITEM': // ko duoc su dung spilce, vi se lam thay doi defaultState, va reducer se ko con la pure function nua, do do su dung filter la ok, filter se tra ve gia tri moi, ko tac dong den defaultState
            return {...state, mang: state.mang.filter((e, i) => i != action.index)}
        default:
            return state;
    }
}

const store = redux.createStore(reducer);
store.subscribe(() => { console.log(store.getState())}) // thay vi su dung console o cac line 27 32 39, thi chi can su dung one line nay, show ra tat ca thay doi
// console.log(store.getState())

store.dispatch({type: 'TOGGLE_IS_ADDING'}) // thuc thi chi thi = action
// console.log(store.getState())

store.dispatch({
    type: 'ADD_ITEM',
    item: 'D'
})
// console.log(store.getState())

store.dispatch({
    type: 'REMOVE_ITEM',
    index: 1
})
// console.log(store.getState())

/* State trong Redux la mot trang thai cua mot doi tuong, da la trang thai thi co the thay doi duoc & No tuong tu State trong ReactJs
    Action: Chi thi, no la mot object {
        type: 'TANG_NHIETDO' --> type la chi thi
        addingTemp: 1 --> cap nhat sau khi thuc thi chi thi
    } --> action chi moi la chi thi thoi, chua duoc thuc thi
    Reducer la mot function, mot phuong thuc, tra ve newState: function reducer(oldState, action) {
        // Do ST here
        return newState
    }
    Khac nhau giua action va reducer: action la nguoi di xe taxi, se ra chi thi. Reducer se thuc thi chi thi theo cac buoc cu the co the thay duoc
    Store la kho chua, State in Redux la mot private object, muon tac dong this State, phai tac dong thong qua doi tuong quan ly cua no, chinh la Store
    Subscribe dung de theo doi qua trinh thay doi state
*/