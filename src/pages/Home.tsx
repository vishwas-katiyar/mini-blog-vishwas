import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchPosts } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface BlogPost {
  id: number;
  title: string;
  blog_image: string;
  category_name: string;
  content: string;
  created_at: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const postsData = await fetchPosts();
    setPosts(postsData.posts);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.category_name.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query)
    );
  });


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[75vh] sm:h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/BannerHero.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl ">
            <div className="absolute top-4 left-4 sm:left-16">
              <span className="text-white text-2xl font-bold">LOGO</span>
            </div>

            <div className="absolute top-4 right-4 sm:right-16">
              <Link to="/login">
                {!user ? (
                  <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded">
                    Sign In
                  </button>
                ) : (
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                )}
              </Link>
            </div>

            <div className="mt-20 sm:mt-24">
              <span className="text-white text-sm uppercase tracking-wider">
                Adventure
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-white max-w-2xl">
                Richird Norton photorealistic rendering as real photos
              </h1>
              <p className="mt-4 text-gray-200 text-sm max-w-xl">
                1 Jan 2024 — Photograph retouching composite system through
                hundreds sound type mistakes. The realistic production seamless
                data.
              </p>
              <div className="mt-8 flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-6 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Blogs</h2>
        <div className="mt-4 sm:mt-0 flex w-full sm:w-auto justify-between sm:justify-end items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-3/4 sm:w-60"
          />
          <button
            className="bg-[#6941C6] text-white px-4 py-2 w-1/4 rounded-full"
            onClick={() => navigate("/create-post")}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={`${post.blog_image}`}
                  alt={post.title}
                  className="w-full h-48 sm:h-52 object-cover"
                />
                <div className="p-5">
                  <p className="text-gray-500 text-sm">
                    {post.author.name} •{" "}
                    {new Date(post.created_at).toDateString()}
                  </p>
                  <div className="w-full flex justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">
                      {post.title}
                    </h2>
                    <Link
                      to={`/post/${post.id}`}
                      className="text-indigo-600 font-semibold"
                    >
                      <img src="icon wrap.png" alt="icon" />
                    </Link>
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm px-3 py-1 bg-[#F9F5FF] text-[#6941C6] rounded-full">
                      {post.category_name}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-1 sm:col-span-2 md:col-span-3">
              No posts found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
