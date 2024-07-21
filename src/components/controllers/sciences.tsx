import { ClipboardList, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getSciences, removeScience } from "@/features/sciences/sciences-slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getQuestions } from "@/features/question/question-slice";

export default function Sciences() {
  const dispatch = useDispatch();
  const { sciences, scienceTotalPages, scienceCurrentPage } = useSelector(
    (state: RootState) => state.science
  );

  const handlePage = async (currentPage: number, limit: number) => {
    try {
      const res = await apiClient.get(
        `/sciences?page=${currentPage}&limit=${limit}`
      );

      dispatch(getSciences(res.data));
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

  const checkScience = async (id: string) => {
    try {
      const res = await apiClient.get(`/questions/${id}?page=1&limit=25`);
      dispatch(getQuestions({...res.data, id}))
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
  }

  const deleteScience = async (id: string) => {
    try {
      const res = await apiClient.delete(`/sciences/delete/${id}`);
      dispatch(removeScience(id));
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

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get("/sciences?page=1&limit=10");
        dispatch(getSciences(res.data));
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
    })();
  }, []);

  return (
    <ul className="flex flex-col gap-2 p-4 rounded-md h-[483px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 w-full">
      {sciences &&
        sciences.map((science) => {
          return (
            <li
              key={science._id}
              className="flex justify-between px-2 py-1 border items-center"
            >
              <div className="flex flex-col font-mono">
                <p className="flex items-center gap-1">
                  <span className="font-bold line-clamp-1">
                    {science?.title}
                  </span>
                  <span className="text-sm bg-black/70 text-white font-extrabold px-1 rounded-lg">
                    {science?.semester}-smtr
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="text-sm">{science?.teacher}</span>
                  <span className="text-sm bg-green-500 text-white font-extrabold px-1 rounded-lg">
                    {science?.course}-kurs
                  </span>
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>
                    <Ellipsis />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-24">
                  <Button variant={"link"} className="p-0">
                    <Link to={`sciences/${science._id}`}>Ko'rish</Link>
                  </Button>
                  <Button
                    onClick={() => checkScience(science._id)}
                    variant={"link"}
                    className="p-0"
                  >
                    Tanlash
                  </Button>
                  <Button
                    onClick={() => deleteScience(science._id)}
                    variant={"link"}
                    className="p-0 text-red-500"
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </li>
          );
        })}
      {!sciences?.length && (
        <div className="h-full w-full flex items-center justify-center opacity-60">
          <ClipboardList size={120} />
        </div>
      )}
      {sciences && scienceTotalPages! > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationPrevious
                onClick={() => handlePage(scienceCurrentPage! - 1, 10)}
              />
            </PaginationItem>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationNext
                onClick={() => handlePage(scienceCurrentPage! + 1, 10)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </ul>
  );
}
