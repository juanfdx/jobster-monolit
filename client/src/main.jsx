import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//REDUX
import { Provider } from 'react-redux'
import { store } from './store.js'
//TOASTIFY
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer 
        position='top-right'
        hideProgressBar 
        theme='colored'
        autoClose={2000} 
        pauseOnFocusLoss={false} 
        limit={3}
      />
    </Provider>
  </React.StrictMode>,
)
