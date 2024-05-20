/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/navBar";
import { EditUser, ViewUser } from "../components/EditUser";
import BlogPostView from "../components/BlogPost";
import { requestBlogPosts } from "../services/requests";
import { alertNoLogged, alertNoNetwork } from "../services/alerts";
import LoadingMid from "../components/loadings/LoadingMid";
import { GlobalContext } from "../context/globalContext";
import { getUser } from "../services/utils";

function Profile() {
  const { user, setUser, viewPosts, setViewPosts, setBlogPosts } = useContext(GlobalContext)
  const [editUser, setEditUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || '';
  const sorted = true

  const viewPost = viewPosts.length === 0 
    ? <h2 className="text-gray-500 font-semibold text-center">Oops, parece que voce ainda não postou</h2> 
    : viewPosts.map((post) => <BlogPostView key={post.id} blogPost={post} />)

  useEffect(() => {
    requestBlogPosts(token, sorted, true).then((response) => {
      if (response === 'error network') return alertNoNetwork();
      if (response.status !== 200) return alertNoLogged();
      setBlogPosts(response.data);
      setViewPosts(response.data);
      setLoading(false);
    });
    if (user.name === '') getUser(token, setUser);
  }, [sorted, token, viewPosts]);

  return (
    <main className="w-screen h-screen bg-gray-200 flex items-center justify-center flex-col overflow-auto">
      <Navbar />
      <div className="w-full bg-gray-200 mb-40"></div>
      <div className="pt-[40px] z-10 top-[56px] bg-gray-200 w-screen text-center fixed">
          <h2 className="text-blue-600 text-4xl font-bold ">Profile</h2>
      </div>
      <section className="h-full w-11/12 mt-8 flex flex-col justify-center md:flex-row">
        {editUser ? <EditUser setEditUser={setEditUser} /> : <ViewUser setEditUser={setEditUser} />}
        <div className="md:mt-10">
          <CreatePost />
          <div>
            <h2 className="text-blue-600 text-xl font-bold text-center">Seus Posts</h2>
            {loading ? <><LoadingMid /><LoadingMid /></> : viewPost}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile;