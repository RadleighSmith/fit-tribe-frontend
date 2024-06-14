import styles from "./App.module.css";
import TopNavBar from "./components/TopNavBar";
import Container from "react-bootstrap/Container"
import {Route, Switch} from "react-router-dom"
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";

function App() {
  return (
    <div className={styles.App}>
      <TopNavBar />
      <Container fluid className={styles.Main}>
        <Switch>
          <Route exact path ="/"  render={() => <h1>Home Page</h1>} />
          <Route exact path ="/signin"  render={() => <LoginForm />} />
          <Route exact path ="/signup"  render={() => <SignUpForm />} />
          <Route render={() => <h1 className="text-center">Uh Oh! Page Not Found!</h1>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;