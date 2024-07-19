import { apiClient } from "@/api/api-client";
import QuestionForm from "@/components/controllers/question-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeScience } from "@/features/sciences/sciences-slice";
import { ScienceInterface } from "@/interface/science-interface";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


export default function Science() {
  const { id } = useParams();
  const [science, setScience] = useState<ScienceInterface>();
  const titleRef = useRef<HTMLInputElement>(null)
  const teacherRef = useRef<HTMLInputElement>(null);
  const [course, setCourse] = useState<string>();
  const [semester, setSemester] = useState<string>();

  const dispatch = useDispatch()

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient(`/sciences/${id}`);
        setScience(res.data);
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

  const updateScience = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const changeData = {
        title: titleRef?.current?.value,
        course,
        semester,
        teacher: teacherRef?.current?.value
      }
      const res = await apiClient.put(`/sciences/update/${id}`, changeData);
      dispatch(changeScience(res.data.science));
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
    <div className="p-4">
      <div className="flex items-start gap-4">
        <form
          onSubmit={(e) => updateScience(e)}
          className="max-w-[500px] flex flex-col gap-3 border p-2 w-full"
        >
          <Input
            defaultValue={science?.createdAt
              ?.slice(0, 10)
              ?.split("-")
              ?.reverse()
              ?.join("-")}
            type="text"
            disabled
          />
          <Input
            defaultValue={science?.updatedAt
              ?.slice(0, 10)
              ?.split("-")
              ?.reverse()
              ?.join("-")}
            type="text"
            disabled
          />
          <Input ref={titleRef} defaultValue={science?.title} type="text" />
          <Input ref={teacherRef} defaultValue={science?.teacher} type="text" />
          <Input defaultValue={science?.total} type="number" disabled />
          <Select onValueChange={(value) => setCourse(value)}>
            <SelectTrigger>
              <SelectValue placeholder={"Kurs..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1-kurs</SelectItem>
              <SelectItem value="2">2-kurs</SelectItem>
              <SelectItem value="3">3-kurs</SelectItem>
              <SelectItem value="4">4-kurs</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={science?.semester.toString()}
            onValueChange={(value) => setSemester(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={"semester..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1-semester</SelectItem>
              <SelectItem value="2">2-semester</SelectItem>
            </SelectContent>
          </Select>
          <Button>Change</Button>
        </form>
        <QuestionForm id={id ?? ''} />
      </div>
    </div>
  );
}
