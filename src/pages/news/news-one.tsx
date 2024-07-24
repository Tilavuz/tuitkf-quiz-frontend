import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { getNewsBody, newsStart, newsStop } from "@/features/news/news-slice";
import PrivateRoute from "@/private/private-route";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function NewsOne() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState<string | null>(null);
  const { newsBody, loading } = useSelector((state: RootState) => state.news);

  const createPost = async () => {
    try {
      if (post) {
        const res = await apiClient.post(`/news/body/create/${id}`, {
          news: post,
        });
        toast.success(res.data.message);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    (async function () {
      try {
        dispatch(newsStart());
        const res = await apiClient.get(`/news/body/${id}`);
        dispatch(getNewsBody(res.data));
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } finally {
        dispatch(newsStop());
      }
    })();
  }, []);

  return (
    <div className="container py-6">
      <PrivateRoute roles={["teacher", "admin"]}>
        <div className="flex flex-col gap-4">
          <ReactQuill
            value={post ?? ""}
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Post joylash!"
            onChange={(value) => setPost(value)}
          />
          <Button onClick={() => createPost()}>Chop etish</Button>
        </div>
      </PrivateRoute>
      <div className="py-4">
        <div dangerouslySetInnerHTML={{ __html: post ?? "" }} />
      </div>
      {!loading && (
        <div className="py-4">
          {newsBody &&
            newsBody?.map((news) => {
              return (
                <div key={news._id} dangerouslySetInnerHTML={{ __html: news?.news ?? "" }} />
              );
            })}
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
