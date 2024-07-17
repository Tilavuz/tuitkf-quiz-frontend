import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getSciences } from "@/features/sciences/sciences-slice";


export default function Sciences() {
  const dispatch = useDispatch()
  const { sciences, scienceTotalPages, sciencesCurrentPage } = useSelector((state: RootState) => state.science)
  
  const handlePage = async (sciencesCurrentPage: number, limit: number) => {
    try {
      if (sciencesCurrentPage > 0 && scienceTotalPages! >= limit) {
        const res = await apiClient.get(
          `/sciences?page=${sciencesCurrentPage}&limit=${limit}`
        );
        dispatch(getSciences(res.data));
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

  return (
    <ul className="flex flex-col gap-2 p-4 rounded-md h-[500px] overflow-hidden overflow-y-auto select-none dark:bg-inherit dark:border bg-slate-50 w-full lg:max-w-[500px]">
      <li className="flex justify-between px-2 py-1 border items-center">
        <div className="flex flex-col font-mono">
          <p className="font-bold line-clamp-1">Falsafa fanidan test</p>
          <p className="flex items-center gap-1">
            <span className="text-sm">Tilovov Shavqiddin</span>
            <span className="text-sm bg-green-500 text-white font-extrabold px-1 rounded-lg">
              2-kurs
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
              Tanlash
            </Button>
            <Button variant={"link"} className="p-0 text-red-500">
              Deletee
            </Button>
          </PopoverContent>
        </Popover>
      </li>
      {sciences && sciences.length > 10 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationPrevious
                onClick={() => handlePage(sciencesCurrentPage! - 1, 10)}
              />
            </PaginationItem>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationNext
                onClick={() => handlePage(sciencesCurrentPage! + 1, 10)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </ul>
  );
}
