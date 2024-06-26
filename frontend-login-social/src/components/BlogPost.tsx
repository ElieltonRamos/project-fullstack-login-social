import { useContext, useState } from "react";
import { BlogPost } from "../types/blogPost";
import { GlobalContext } from "../context/globalContext";
import AbstractUser from "./SVGs/AbstractUser";
import DeleteSvg from "./SVGs/DeleteSvg";
import EditSvg from "./SVGs/EditSvg";
import { requestBlogPosts, requestDeletePost } from "../services/requests";
import { alertConfirmDeletePost, alertError } from "../services/alerts";
import EditPost from "./EditPost";

type PropsBlogPost = {
  blogPost: BlogPost
}

function Post({ blogPost }: PropsBlogPost) {
  const [isEdit, setIsEdit] = useState(false);
  const { user: userLogged, setBlogPosts, setViewPosts, viewPosts } = useContext(GlobalContext);
  const isOwnerPost = userLogged.id === blogPost.userId;
  if (!blogPost.user) blogPost.user = { ...userLogged, password: ''};
  const { title, content, created, user, image, updated } = blogPost;

  const postImageExists = image === '' || image === null || image === undefined;
  const userImageExists = user.image === '' || user.image === null || user.image === undefined;

  const clickDeletePost = async () => {
    const confirmDelete = await alertConfirmDeletePost()
    if (!confirmDelete) return;

    const response = await requestDeletePost(blogPost.id);

    if (response.message !== 'Post deleted') return alertError(response.message);

    const newBlogPosts = await requestBlogPosts(false);
    if ('message' in newBlogPosts) return alertError(newBlogPosts.message);
    setBlogPosts(newBlogPosts);
    setViewPosts(viewPosts.filter(post => post.id !== blogPost.id));
  };

  if (isEdit) return (
    <EditPost post={blogPost} setIsEdit={setIsEdit} />
  );

  return (
    <article className="bg-white rounded-lg p-5 mb-3">
      <div className="flex">
      {userImageExists ? <AbstractUser /> : <img className="h-14 w-14 rounded-2xl" src={user.image} alt="user" />}
        <div className="ml-2">
          <p className="font-serif">{user.name}</p>
          <p className="font-extralight text-xs">Posted in:{created.toLowerCase()}</p>
          {updated ? <p className="font-extralight text-xs">Updated in:{updated.toLowerCase()}</p> : null}
        </div>
      </div>
      <h2 className="font-extrabold">{title}</h2>
      <p className="font-sans">{content}</p>
      { !postImageExists ? <img className="w-full" src={image} alt="post" /> : null}
      <div className="flex justify-end gap-2 pt-2">
        {isOwnerPost ?
          <button onClick={clickDeletePost} className="hover:scale-110"><DeleteSvg /></button> : null}
        {isOwnerPost ?
          <button onClick={() => setIsEdit(true)} className="hover:scale-110"><EditSvg /></button> : null}
      </div>
    </article>
  );
}

export default Post;