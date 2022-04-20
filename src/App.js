import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Routes from './components/Routes'
import Sidebar from './components/Sidebar'
import SignIn from './components/SignIn'
import TopNav from './components/TopNav'
import { auth } from './config/firebase'
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setUser(user)
      }else {
        setUser(null)
      }
    })
  },[])
  return (
    <BrowserRouter>
      <Route  render={(props) => (
        <> 
          {
            user ? (
              <>
                <Sidebar {...props} />
                  <div className="layout__content">
                    <TopNav />
                    <div className="layout__content-main">
                      <Routes />
                    </div>
                  </div>
                </>
            ) : <SignIn />
          }
          
        </>
      )}/>
    </BrowserRouter>
  )
}

export default App