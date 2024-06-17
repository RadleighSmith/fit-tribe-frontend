import styles from "./App.module.css";
import background from "./styles/Background.module.css"
import TopNavBar from "./components/TopNavBar";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import HomePage from "./pages/HomePage";
import SideNavBar from "./components/SideNavBar";
import BlogsPage from "./pages/blogs/BlogsPage";
import BlogCreateForm from "./pages/blogs/BlogCreateForm";
import BlogDetailPage from "./pages/blogs/BlogDetailPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={`${styles.App} ${background.Background}`}>
      <TopNavBar />
      {currentUser && <SideNavBar />}
      <div className={currentUser ? styles.MainWithSidebar : styles.Main}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/blogs" component={BlogsPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <Route path="/create-blog" component={BlogCreateForm} />
          <Route render={() => <h1 className="text-center">Uh Oh! Page Not Found!</h1>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
