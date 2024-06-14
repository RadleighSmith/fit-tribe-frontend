import styles from "./App.module.css";
import TopNavBar from "./components/TopNavBar";
import Container from "react-bootstrap/Container"
import {Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className={styles.App}>
      <TopNavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path ="/"  render={() => <h1>Home Page</h1>} />
          <Route exact path ="/signin"  render={() => <h1>Login</h1>} />
          <Route exact path ="/signup"  render={() => <h1>Sign Up</h1>} />
          <Route render={() => <h1 className="text-center">Uh Oh! Page Not Found!</h1>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;