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
import BlogEditForm from "./pages/blogs/BlogEditForm";
import BlogDetailPage from "./pages/blogs/BlogDetailPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import EditProfilePage from "./pages/profiles/EditProfilePage";
import FollowingPage from "./pages/FollowingPage";

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
          <Route exact path="/create-blog" component={BlogCreateForm} />
          <Route exact path="/blogs/:id/edit" component={BlogEditForm} />
          <Route exact path="/profiles/:id" component={ProfilePage} />
          <Route exact path="/profiles/:id/edit" component={EditProfilePage} />
          <Route exact path="/following" component={FollowingPage} />
          <Route render={() => <h1 className="text-center">Uh Oh! Page Not Found!</h1>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
