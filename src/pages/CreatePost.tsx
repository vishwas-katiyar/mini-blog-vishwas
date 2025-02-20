import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return navigate("/login"), null;

  const handlePostCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!blogImage) {
      setError("Please upload a valid image.");
      return;
    }

    if (!blogImage.type.startsWith("image/")) {
      setError("Invalid file format. Please upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_name", category);
    formData.append("content", content);
    formData.append("blog_image", blogImage);

    try {
      const { data, status } = await createPost(formData);
      if (status === 201) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to create post.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <form onSubmit={handlePostCreation} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title Here..."
            className="w-full text-3xl font-bold text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex justify-between flex-col md:flex-row gap-3">
            <p className="text-gray-600">
              {user.name} • {new Date().toDateString()}
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg relative">
              {blogImage ? (
                <img
                  src={URL.createObjectURL(blogImage)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Upload Image</span>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
                accept="image/*"
                required
              />
            </div>

            <textarea
              placeholder="Type here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-80 focus:ring-2 focus:ring-indigo-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
