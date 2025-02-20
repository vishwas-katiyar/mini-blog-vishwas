import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost, updatePost } from "../services/api";

interface BlogPost {
  id: number;
  title: string;
  blog_image: string;
  category_name: string;
  content: string;
  author_id: number;
  author_name: string;
  created_at: string;
  read_time: string;
}

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const fetchedPost = await getPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
        setEditedTitle(fetchedPost.title);
        setEditedContent(fetchedPost.content);
        setEditedCategory(fetchedPost.category_name);

        const userId = localStorage.getItem("user_id");
        if (userId && parseInt(userId) === fetchedPost.author_id) {
          setIsAuthor(true);
        }
      }
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const updatedData: any = {
        title: editedTitle,
        content: editedContent,
        category_name: editedCategory,
      };

      if (editedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(editedImage);
        reader.onloadend = async () => {
          updatedData.blog_image = reader.result;
          await updatePost(id, updatedData);
          setPost((prev) => (prev ? { ...prev, ...updatedData } : null));
          setEditing(false);
        };
      } else {
        await updatePost(id, updatedData);
        setPost((prev) => (prev ? { ...prev, ...updatedData } : null));
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4 md:px-16">
      <div className="mx-auto bg-white">
        <div className="text-sm text-gray-500 flex items-center space-x-2">
          <span>Blogs</span>
          <span>›</span>
          {editing ? (
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="font-medium text-gray-700 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          ) : (
            <span
              className="font-medium text-gray-700 cursor-pointer"
              onClick={() => isAuthor && setEditing(true)}
            >
              {post.category_name}
            </span>
          )}
        </div>

        {/* Editable Title */}
        {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-3xl font-bold text-gray-900 mt-4 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <h1
            className="text-3xl font-bold text-gray-900 mt-4 cursor-pointer"
            onClick={() => isAuthor && setEditing(true)}
          >
            {post.title}
          </h1>
        )}

        <div className="flex flex-row md:flex-row justify-between">
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
            <span>{post.author_name}</span>
            <span>•</span>
            <span>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.read_time}</span>
          </div>

          <div className="mt-6 flex space-x-4">
            {!editing ? (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-[#6941C6] text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-[#E72A2D] text-white rounded-full hover:bg-red-600 transition"
                >
                  Delete Post
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="mt-4 w-1/2 bg-gray-100 rounded-lg overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full object-cover"
              />
            ) : (
              <img
                src={`${post.blog_image}`}
                alt={post.title}
                className="w-full object-cover"
              />
            )}
            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm"
              />
            )}
          </div>

          {/* Editable Content */}
          <div className="mt-6 w-1/2">
            {editing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full text-gray-700 leading-relaxed border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                rows={6}
              />
            ) : (
              <p
                className="text-gray-700 leading-relaxed cursor-pointer"
                onClick={() => isAuthor && setEditing(true)}
              >
                {post.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
