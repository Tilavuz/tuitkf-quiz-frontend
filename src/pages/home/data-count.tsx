import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getStatistics } from "@/features/statistics/statistics-slice";
import { BookOpenCheck, FileQuestion, Shield, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function DataCount() {
  const statistics = useSelector((state: RootState) => state.statistics)
  const dispatch = useDispatch()

  useEffect(() => {
    (async function () {
      try {
        if (!statistics.admins) {
          const res = await apiClient.get("/statistics");
          dispatch(getStatistics(res.data))
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
