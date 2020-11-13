import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'

let middlewares = [thunkMiddleware]

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  // OTHER REDUCERS WILL BE ADDED HERE
})

// BINDING MIDDLEWARE
const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = ({ isServer }: any) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]))
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'nextjs',
      /**
       * Reducers to be persisted
       */
      whitelist: [''],
      storage, // if needed, use a safer storage
    }

    const persistedReducer = persistReducer(persistConfig, combinedReducer) // Create a new reducer with our existing reducer

    if (process.env.NODE_ENV !== 'production') {
      middlewares.push(logger)
    }

    const store: any = createStore(persistedReducer, bindMiddleware(middlewares)) // Creating the store again

    store.__persistor = persistStore(store) // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store
  }
}

export type RootState = ReturnType<typeof combinedReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore)
