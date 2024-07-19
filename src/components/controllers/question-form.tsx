import { useState } from "react";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import image from "@/assets/namuna.png";
import { Link } from "react-router-dom";

export default function QuestionForm({ id }: { id: string }) {
  const [options, setOptions] = useState<string[] | null>(null);
  const [option, setOption] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);

  const handleOption = () => {
    setOptions((prev) => {
      if (prev && option !== null) {
        return [...prev, option];
      } else if (option !== null) {
        return [option];
      } else {
        return prev;
      }
    });
    setOption("");
  };

  const createQuestion = async () => {
    try {
      const questionData = {
        science_id: id,
        question,
        options,
        correct_answer: options ? options[0] : "",
      };
      const res = await apiClient.post("/questions/add", questionData);
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
    <div className="flex flex-col w-full items-start gap-4">
      <div className="flex w-full items-start gap-6">
        <div className="flex flex-col gap-2 max-w-[500px] w-full border p-2">
          <ReactQuill
            value={question ?? ""}
            theme="snow"
            modules={{ toolbar: [[{ list: "ordered" }], ["image"]] }}
            formats={["header", "list", "image"]}
            placeholder="Savolni kiriting"
            onChange={(value) => setQuestion(value)}
          />
          <ReactQuill
            placeholder="Variant qo'shish uchun. Birinchi qo'shganingiz to'g'ri variant bo'ladi!"
            theme="snow"
            value={option ?? ""}
            modules={{ toolbar: [[{ list: "ordered" }], ["image"]] }}
            formats={["header", "list", "image"]}
            onChange={(value) => setOption(value)}
          />
          <Button type="button" onClick={() => handleOption()}>
            Variant
          </Button>
          <Button
            onClick={() => createQuestion()}
            type="button"
            disabled={!question}
          >
            Testni bazga yuborish
          </Button>
        </div>
        <div className="">
          {question && (
            <p
              className="font-bold"
              dangerouslySetInnerHTML={{ __html: question ?? "" }}
            />
          )}
          <div className="mt-2 max-w-[500px]">
            {options &&
              options.map((option, i) => {
                return (
                  <p className="flex items-start gap-1">
                    <span className="font-bold">{i + 1})</span>
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      <form className="max-w-[500px] w-full">
        <div className="flex items-center gap-4">
          <Input className="" type="file" />
          <Button>Test file yuborish</Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2">Namuna</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[900px] w-full">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="">
              <img src={image} alt="namuna uchun rasm" />
              <Link
                className="text-sm underline text-blue-600"
                to={image}
                download={true}
              >
                Yuklash
              </Link>
              <p className="text-red-500">File-da Rasm bo'lmasin!</p>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
