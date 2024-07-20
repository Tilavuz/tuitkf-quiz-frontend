import { apiClient } from "@/api/api-client";
import { SolutionInterface } from "@/interface/solution-interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Session() {
  const { id } = useParams();
  const [solutions, setSolutions] = useState<SolutionInterface[] | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get(`/sessions/solution/${id}`);
        setSolutions(res.data);
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
    <div className="container flex flex-col gap-4 border py-4 my-4">
      {solutions &&
        solutions.map((solution, i) => {
          return (
            <div key={solution?._id} className="border p-2">
              <div className="font-bold flex items-start gap-1">
                <span>{i+1})</span>
                <div dangerouslySetInnerHTML={{ __html: solution?.question }} />
              </div>
              <div className={`${solution?.status ? 'bg-green-500' : 'bg-red-500'} text-white font-bold px-2`} dangerouslySetInnerHTML={{ __html: solution?.answer }}/>
            </div>
          );
        })}
    </div>
  );
}
