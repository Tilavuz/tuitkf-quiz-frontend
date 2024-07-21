import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { getQuestions, removeQuestion } from "@/features/question/question-slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

export default function Questions() {
  const dispatch = useDispatch();
  const { questions, questionCurrentPage, questionTotalPages, id } = useSelector((state: RootState) => state.question);

  const deleteQuestion = async (id: string) => {
    try {
      await apiClient.delete(`/questions/delete/${id}`);
      dispatch(removeQuestion(id));
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

  const handlePage = async (currentPage: number, limit: number) => {
    try {
      const res = await apiClient.get(
        `/questions/${id}?page=${currentPage}&limit=${limit}`
      );
      dispatch(getQuestions({...res.data, id}));
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
    <div className="h-[721px] w-full border overflow-y-auto">
      <div className="flex flex-col gap-4">
        {questions &&
          questions?.map((question, i) => {
            return (
              <div key={question._id} className="border-b py-2">
                <div className="flex items-start gap-2 font-bold">
                  <span>{i + 1})</span>
                  <div
                    dangerouslySetInnerHTML={{ __html: question?.question }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {question?.options?.map((option, i) => {
                    return (
                      <li className="flex" key={option}>
                        <span>{i + 1})</span>
                        <div dangerouslySetInnerHTML={{ __html: option }} />
                      </li>
                    );
                  })}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"destructive"} className="w-full">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bu savolni haqiqatdan ham o'chirishni istaysizmi!
                      </AlertDialogTitle>
                      <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Yo'q</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteQuestion(question._id)}
                      >
                        Ha
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          })}
      </div>
      {!questions && (
        <div className="w-full h-full flex items-center justify-center opacity-45 bg-[#F8FAFC] dark:bg-inherit overflow-hidden">
          <ListOrdered size={120} />
        </div>
      )}
      {questions && questionTotalPages! > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationPrevious
                onClick={() => handlePage(questionCurrentPage! - 1, 25)}
              />
            </PaginationItem>
            <PaginationItem className="cursor-pointer select-none">
              <PaginationNext
                onClick={() => handlePage(questionCurrentPage! + 1, 25)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
