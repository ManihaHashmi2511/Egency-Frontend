import AdminLayout from "../Components/AdminLayout";
import BlogPostsTable from "../Components/BlogPostsTable";

const BlogPosts = () => {
  return (
    <AdminLayout title="Blog">
      <BlogPostsTable />
    </AdminLayout>
  );
};

export default BlogPosts;