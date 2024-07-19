import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSciences } from "@/features/sciences/sciences-slice";
import { ClipboardList } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ProfileSciences() {
  const dispatch = useDispatch();
  const { sciences, scienceTotalPages, scienceCurrentPage } = useSelector(
    (state: RootState) => state.science
  );

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

  return (
    <ul className="flex flex-col gap-2 p-4 rounded-md h-[527px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 w-full lg:max-w-[500px]">
      {sciences &&
        sciences.map((science) => {
          return (
            <li
              key={science._id}
              className="flex justify-between px-2 py-1 border items-center"
            >
              <div className="flex flex-col font-mono">
                <p className="font-bold line-clamp-1">{science?.title}</p>
                <p className="flex items-center gap-1">
                  <span className="text-sm">{science?.teacher}</span>
                  <span className="text-sm bg-green-500 text-white font-extrabold px-1 rounded-lg">
                    {science?.course}-kurs
                  </span>
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Ishlash</Button>
                </DialogTrigger>
                <DialogContent>
                  <form className="flex flex-col gap-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Variantlar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mix">Tasodifiy</SelectItem>
                        <SelectItem value="a">
                          Barcha to'g'ri jovoblar A
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Testlar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="random">Tasodifiy</SelectItem>
                        {Array.from(
                          {
                            length:
                              science?.total! % 25 === 0
                                ? science?.total! / 25
                                : science?.total! / 25 + 1,
                          },
                          (_, index) => index
                        ).map((index) => {
                          return (
                            <SelectItem key={index} value={`${index + 1}-25`}>
                              {index + 1}-25
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Button>Boshlash</Button>
                  </form>
                </DialogContent>
              </Dialog>
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