import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../common/LoadingSpinner";
import Placeholder from "../../common/Placeholder";
import RouteWrapper from "../../common/RouteWrapper";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import { useGetUserDashboardQuery } from "../../core/features/users/usersApiSlice";
import useLocalStorage from "../../hooks/useLocalStorage";
import FollowedTags from "./components/FollowedTags";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Posts from "./components/Posts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useLocalStorage("selected-dash", "posts");
  const { username } = useSelector(selectCurrentUser);
  const { data: user, isLoading } = useGetUserDashboardQuery(username, {
    refetchOnMountOrArgChange: true,
  });

  // State for breadcrumb
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");

  // Function to update breadcrumb
  const updateBreadcrumb = (section) => {
    setBreadcrumb(`Dashboard >> ${section}`);
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading>
          <span className="text-3xl">{breadcrumb.split(" >> ")[0]}</span>
          {breadcrumb.split(" >> ")[1] && (
            <>
              <span className="text-xl mx-2">{">>"}</span>
              <span className="text-3xl">{breadcrumb.split(" >> ")[1]}</span>
            </>
          )}
        </Heading>
        <DashboardWrapper>
          <Aside>
            <Type
              onClick={() => {
                setSelected("posts");
                updateBreadcrumb("Posts");
              }}
              selected={selected === "posts"}
            >
              <Title>Posts</Title>
              <Number>{user?.posts.length || 0}</Number>
            </Type>
            <Type
              onClick={() => {
                setSelected("followers");
                updateBreadcrumb("Followers");
              }}
              selected={selected === "followers"}
            >
              <Title>Followers</Title>
              <Number>{user?.followers.length || 0}</Number>
            </Type>
            <Type
              onClick={() => {
                setSelected("followedTags");
                updateBreadcrumb("Followed Tags");
              }}
              selected={selected === "followedTags"}
            >
              <Title>Followed Tags</Title>
              <Number>{user?.followedTags.length || 0}</Number>
            </Type>
            <Type
              onClick={() => {
                setSelected("following");
                updateBreadcrumb("Following");
              }}
              selected={selected === "following"}
            >
              <Title>Following</Title>
              <Number>{user?.following.length || 0}</Number>
            </Type>
          </Aside>
          <Main>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              user &&
              (selected === "posts" ? (
                user.posts.length > 0 ? (
                  <Posts
                    posts={user.posts.sort((a, b) => b.createdAt - a.createdAt)}
                    username={user.username}
                    navigate={navigate}
                  />
                ) : (
                  <Placeholder />
                )
              ) : selected === "followers" ? (
                user.followers.length > 0 ? (
                  <Followers followers={user.followers} navigate={navigate} />
                ) : (
                  <Placeholder />
                )
              ) : selected === "followedTags" ? (
                user.followedTags.length > 0 ? (
                  <FollowedTags
                    followedTags={user.followedTags}
                    navigate={navigate}
                  />
                ) : (
                  <Placeholder />
                )
              ) : user.following ? (
                <Following following={user.following} navigate={navigate} />
              ) : (
                <Placeholder />
              ))}
          </Main>
        </DashboardWrapper>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1`mb-md font-bold text-3xl p-4 rounded-lg`; // Background color and padding for heading

const DashboardWrapper = tw.div`flex gap-md mob:(flex-col)`;

const Aside = tw.aside`w-1/3 mob:w-full  p-4 rounded-lg h-80`; // Background color and padding for aside

const Type = styled.div`
  ${tw`cursor-pointer rounded-md p-3 flex justify-between items-center`};
  ${({ selected }) => (selected ? tw`bg-white` : tw`bg-transparent`)}
`;

const Title = tw.p``;

const Number = tw.p`text-xs p-1 bg-light-gray rounded-md`;

const Wrapper = tw.div``;

const Main = tw.div`w-full`;

export default Dashboard;
