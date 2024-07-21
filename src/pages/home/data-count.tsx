import { apiClient } from "@/api/api-client";
import { BookOpenCheck, FileQuestion, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DataCount() {
  const [statistics, setStatistics] = useState<{
    users: number;
    admins: number;
    questions: number;
    sciences: number;
  }>();

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get("/statistics");
        setStatistics(res.data);
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
    <div className="flex items-start gap-4 justify-between flex-wrap mb-6">
      <div className="flex items-start justify-between w-full  border md:max-w-[300px] p-4 rounded-lg">
        <div className="">
          <h4 className="font-bold text-xl font-mono">Foydalanuvchilar</h4>
          <span className="text-xl italic font-bold">{statistics?.users}</span>
        </div>
        <div>
          <Users />
        </div>
      </div>
      <div className="flex items-start justify-between w-full  border md:max-w-[300px] p-4 rounded-lg">
        <div className="">
          <h4 className="font-bold text-xl font-mono">Testlar soni</h4>
          <span className="text-xl italic font-bold">
            {statistics?.sciences}
          </span>
        </div>
        <div>
          <BookOpenCheck />
        </div>
      </div>
      <div className="flex items-start justify-between w-full  border md:max-w-[300px] p-4 rounded-lg">
        <div className="">
          <h4 className="font-bold text-xl font-mono">Adminlar soni</h4>
          <span className="text-xl italic font-bold">{statistics?.admins}</span>
        </div>
        <div>
          <Shield />
        </div>
      </div>
      <div className="flex items-start justify-between w-full  border md:max-w-[300px] p-4 rounded-lg">
        <div className="">
          <h4 className="font-bold text-xl font-mono">Barcha savollar soni</h4>
          <span className="text-xl italic font-bold">
            {statistics?.questions}
          </span>
        </div>
        <div>
          <FileQuestion />
        </div>
      </div>
    </div>
  );
}
