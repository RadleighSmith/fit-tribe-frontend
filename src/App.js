import styles from './App.module.css';
import background from './styles/Background.module.css';

import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/blogs/BlogsPage';
import BlogCreateForm from './pages/blogs/BlogCreateForm';
import BlogEditForm from './pages/blogs/BlogEditForm';
import BlogDetailPage from './pages/blogs/BlogDetailPage';
import ProfilePage from './pages/profiles/ProfilePage';
import EditProfilePage from './pages/profiles/EditProfilePage';
import FollowingPage from './pages/FollowingPage';
import GroupCreateForm from './pages/groups/GroupCreateForm';
import GroupsPage from './pages/groups/GroupsPage';
import GroupDetailsPage from './pages/groups/GroupDetailsPage';
import GroupEditPage from './pages/groups/GroupEditPage';
import EventCreateForm from './pages/group_events/EventCreateForm';
import EventDetailPage from './pages/group_events/EventDetailPage';
import EventEditPage from './pages/group_events/EventEditPage';
import NotFoundPage from './pages/NotFoundPage';

import { useCurrentUser } from './contexts/CurrentUserContext';

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
          <Route exact path="/groups/" component={GroupsPage} />
          <Route exact path="/groups/:id" component={GroupDetailsPage} />
          <Route exact path="/create-group/" component={GroupCreateForm} />
          <Route exact path="/groups/:id/edit" component={GroupEditPage} />
          <Route exact path="/groups/:id/create-event" component={EventCreateForm} />
          <Route exact path="/groups/:groupId/events/:eventId" component={EventDetailPage} />
          <Route exact path="/groups/:groupId/events/:eventId/edit" component={EventEditPage} />
          <Route exact path="/profiles/:id" component={ProfilePage} />
          <Route exact path="/profiles/:id/edit" component={EditProfilePage} />
          <Route exact path="/following" component={FollowingPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
