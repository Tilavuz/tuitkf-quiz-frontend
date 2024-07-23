import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import {
  changeNews,
  getNews,
  newsStart,
  newsStop,
  removeNews,
} from "@/features/news/news-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Switch } from "../ui/switch";
import PrivateRoute from "@/private/private-route";

export default function NewsBody() {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state: RootState) => state.news);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    (async function () {
      try {
        if (!news) {
          dispatch(newsStart());
          const res = await apiClient.get("/news");
          dispatch(getNews(res.data));
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
      } finally {
        dispatch(newsStop());
      }
    })();
  }, []);

  const deleteNews = async (id: string) => {
    try {
      const res = await apiClient.delete(`/news/delete/${id}`);
      dispatch(removeNews(id));
      toast.success(res.data.message);
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

  const permissionNews = async (id: string, value: boolean) => {
    try {
      const res = await apiClient.put(`/news/${id}`, { status: value });
      dispatch(changeNews(res.data));
      toast.success(res.data.message);
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

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      {news &&
        news.map((item) => {
          if (user?.auth?.role === "admin" || user?.auth?.role === "teacher") {
            return (
              <div key={item?._id}>
                <p>
                  {item?.createdAt.slice(0, 10).split("-").reverse().join("-")}
                </p>
                <Link to={`/news/${item?._id}`} className="border-b block pb-2">
                  <h5 className="font-bold text-xl">{item?.title}</h5>
                  <p className="font-mono line-clamp-2">{item?.desc}</p>
                </Link>
                <div className="p-2 flex items-center gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"destructive"}>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Rostdan ham bu post-ni o'chirmoqchimisiz!
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Yo'q</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteNews(item?._id)}>
                          Ha
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <PrivateRoute roles={["admin"]}>
                    <Switch
                      onCheckedChange={(value) =>
                        permissionNews(item?._id, value)
                      }
                      defaultChecked={item?.status}
                    />
                  </PrivateRoute>
                  <PrivateRoute roles={["teacher"]}>
                    <p
                      className={`${
                        item?.status ? "bg-green-500" : "bg-red-500"
                      } p-2 rounded-full`}
                    ></p>
                  </PrivateRoute>
                </div>
              </div>
            );
          } else if (user?.auth.role === "user") {
            if (item?.status) {
              return (
                <div key={item?._id}>
                  <p>
                    {item?.createdAt.slice(0, 10).split("-").reverse().join("-")}
                  </p>
                  <Link
                    to={`/news/${item?._id}`}
                    className="border-b block pb-2"
                  >
                    <h5 className="font-bold text-xl">{item?.title}</h5>
                    <p className="font-mono line-clamp-2">{item?.desc}</p>
                  </Link>
                </div>
              );
            }
          }
        })}
      {!loading && !news?.find((item) => item?.status) && (
        <div>
          <p className="font-bold">Hozircha active postlar yo'q!</p>
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
