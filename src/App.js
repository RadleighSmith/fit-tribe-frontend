import styles from "./App.module.css";
import TopNavBar from "./components/TopNavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import HomePage from "./pages/HomePage";
import SideNavBar from "./components/SideNavBar";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <TopNavBar />
      {currentUser && <SideNavBar />}
      <Container fluid className={currentUser ? styles.MainWithSidebar : styles.Main}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route render={() => <h1 className="text-center">Uh Oh! Page Not Found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
