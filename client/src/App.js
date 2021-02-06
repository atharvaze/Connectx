import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/navbar';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/home';
import Signin from './components/screens/signin';
import Signup from './components/screens/signup';
import Profile from './components/screens/profile';
import Subs from './components/screens/subsuserposts';
import Createpost from './components/screens/createpost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile';
export const userContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(typeof(user))
    if(user){
      dispatch({type:"USER",payload:user})
    
    }else{
      history.push('/signin')
    }

  },[])
  
  return(
    <Switch>
    <Route exact path="/">
      <Subs/>
    </Route>
    <Route path="/signin">
      <Signin/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route path="/profile">
      <Profile/>
    </Route>
    <Route path="/create">
      <Createpost/>
    </Route>
    <Route path="/userprofile/:userid">
      <UserProfile/>
    </Route>
    <Route path="/explore">
      <Home/>
    </Route>
    </Switch>

  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing/>
    </BrowserRouter>
    </userContext.Provider>
    
    
  );
}

export default App;
