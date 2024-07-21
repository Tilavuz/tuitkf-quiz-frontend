import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { useDispatch } from "react-redux";
import { createScience } from "@/features/sciences/sciences-slice";

export default function ScienceForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const teacherRef = useRef<HTMLInputElement>(null);
  const [course, setCourse] = useState<string>();
  const [semester, setSemester] = useState<string>();

  const dispatch = useDispatch();

  const addScience = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const scienceData = {
        course: parseInt(course!),
        teacher: teacherRef?.current?.value,
        title: titleRef?.current?.value,
        semester: parseInt(semester!),
      };

      const res = await apiClient.post("/sciences/add", scienceData);
      dispatch(createScience(res.data.science));
      toast.success(res.data.message);
      if (titleRef.current) titleRef.current.value = "";
      if (teacherRef.current) teacherRef.current.value = "";
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
    <form
      onSubmit={(e) => addScience(e)}
      className="flex flex-col gap-2 p-2 border w-full"
    >
      <Input required ref={titleRef} type="text" placeholder="Fan nomi!" />
      <Input
        required
        ref={teacherRef}
        type="text"
        placeholder="Muallif: Ustoz ism familyasi!"
      />
      <Select required onValueChange={(value) => setCourse(value)}>
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
      <Select required onValueChange={(value) => setSemester(value)}>
        <SelectTrigger>
          <SelectValue placeholder={"semester..."} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1-semester</SelectItem>
          <SelectItem value="2">2-semester</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Yuklash</Button>
    </form>
  );
}
