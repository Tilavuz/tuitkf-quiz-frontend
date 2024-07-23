import { FormEvent, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { useDispatch } from "react-redux";
import { createNews } from "@/features/news/news-slice";

export default function NewsForm() {
    const dispatch = useDispatch()
    const titleRef = useRef<HTMLInputElement | null>(null)
    const descRef = useRef<HTMLInputElement | null>(null);

    const addNews = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const newsData = {
                title: titleRef?.current?.value,
                desc: descRef?.current?.value
            }
            const res = await apiClient.post('/news/create', newsData)
            dispatch(createNews(res.data.news))
            toast.success(res.data.message)
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

  return (
    <form
      onSubmit={(e) => addNews(e)}
      className="max-w-[600px] flex flex-col gap-2 w-full"
    >
      <Input required ref={titleRef} type="text" placeholder="Yangilik sarlavhasi" />
      <Input required ref={descRef} type="text" placeholder="Yangilik tavsifi" />
      <Button>Chop etish</Button>
    </form>
  );
}
