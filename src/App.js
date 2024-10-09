import Mainbody from './components/Mainbody';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import User from './components/User';

function App() {
  return (
    <>

      <Switch>
        <Route path="/admin/register">
          <Register />
        </Route>

        <Route path="/admin/login">
          <Login />
        </Route>

        <Route path="/admin">
          <Mainbody />
        </Route>
        <Route path="/">
            <User />
        </Route>
      </Switch>
    </>
  );
}

export default App;