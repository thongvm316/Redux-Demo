const redux = require('redux');
const reduxlogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxlogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
function buyCake() {
    return {
        type: BUY_CAKE,
    }
} // action: chi thi (type) --> ra lenh lam gi do

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
} // ACTION

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// } // state --> Prive Object, ko thể tác động trực tiếp, tác động thông qua Store, vì Store chính là đối tượng quản lý của State, su dung phuong thuc store.getState()

// const reducer = (state = initialState, action) => { 
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }
//         default: return state
//     }
// }; // function, phuong thuc, 2 tham so, oldState and action 

/* Chia nho state */
const initialCakeState = {
    numOfCakes: 10
};

const initialIceCreamState = {
    numOfIceCreams: 20
};

const cakeReducer = (state = initialCakeState, action) => { 
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}; 

const iceCreamReducer = (state = initialIceCreamState, action) => { 
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
};

/* Ví dụ tài xế Taxi và người đi xe. Người đi xe ra chỉ thị đến địa điểm nào đó == action, lúc này chưa biết hành động cụ thể là gì, tài xể sẽ liên kịch bản thực hiện những gì để đạt được chỉ thị của người đi xe == reducer */
/* Ví dụ Thông ra chỉ thị Phát dọn dẹp cái bàn sạch sẽ để làm việc = action, Phát lên kịch bản làm gì để dọn dẹp bàn = Reducer */
/* dispatch là câu lệnh thực thi chỉ thị == action */

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// const store = createStore(rootReducer);
/* Use Middleware */
const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store)
// const store = createStore(reducer)
console.log('Initial state', store.getState())
store.subscribe(() => console.log('Update State', store.getState()))
store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

 