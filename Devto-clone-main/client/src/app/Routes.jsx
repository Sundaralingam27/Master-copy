import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes as RouterRoutes, useLocation } from "react-router-dom";

// Pages
import Confirmation from "../pages/Confirmation";
import Dashboard from "../pages/Dashboard";
import EditPost from "../pages/EditPost";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewPost from "../pages/NewPost";
import Notifications from "../pages/Notifications";
import PostPage from "../pages/PostPage";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import Tag from "../pages/Tag";
import Tags from "../pages/Tags";

// Components
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import RequireAuth from "../common/RequireAuth/RequireAuth";

import Messenger from "../pages/Messenger/Messenger";
import About from "../pages/About/About";
import Collab from "../pages/Collab/Collab";
import EditorPage from "../pages/EditorPage/EditorPage";
import LeaderBoard from "../pages/LeaderBoard/LeaderBoard";
import Quiz from "../pages/Quiz/Quizhome";
import NewChallenge from "../pages/Quiz/Components/NewChallenge";
import Questions from "../pages/Questions/Questions";

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter>
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          
          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="post" element={<NewPost />} />
            <Route path="customize" element={<EditProfile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reading-list" element={<Home saved={true} />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="collab" element={<Collab />} />
            <Route path="/editor/:roomId" element={<EditorPage />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="challenges" element={<Quiz />} />
            <Route path="new-challenge" element={<NewChallenge />} />
            <Route path="challenges/:challengeId" element={<Questions />} />
          </Route>

          {/* Public Routes */}
          <Route path="tags">
            <Route index element={<Tags />} />
            <Route path=":name" element={<Tag />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="new" element={<SignUp />} />
            <Route path="confirm/:confirmType" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path=":username">
            <Route index element={<Profile />} />
            <Route path=":postUrl">
              <Route index element={<PostPage />} />
              <Route element={<RequireAuth />}>
                <Route path="edit" element={<EditPost />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
