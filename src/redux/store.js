import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { persistStore, persistReducer,createTransform } from 'redux-persist'
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import createImageReducer from "./createImage/createImageReducer";
import storage from 'redux-persist/lib/storage'
// const storage = require("redux-persist/lib/storage").default;

import {parse, stringify, toJSON, fromJSON} from "flatted";
// import dataReducer from "./data/dataReducer";
const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
)
// const SetTransform = createTransform(
//     // transform state on its way to being serialized and persisted.
//     (inboundState, key) => {
//       // convert mySet to an Array.
//       return { ...inboundState, mySet: [...inboundState.mySet] };
//     },
//     // transform state being rehydrated
//     (outboundState, key) => {
//       // convert mySet back to a Set.
//       return { ...outboundState, mySet: new Set(outboundState.mySet) };
//     },
//     // define which reducers this transform gets called for.
//     { whitelist: ['someReducer'] }
//   );

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  createImage: createImageReducer,
//   data: dataReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['blockchain'],
    transforms: [transformCircular]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(persistedReducer, composeEnhancers);
};

export const store = configureStore();
export const persistor = persistStore(store)

