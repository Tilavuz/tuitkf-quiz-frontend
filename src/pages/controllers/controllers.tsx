import NewsForm from "@/components/controllers/news-form";
import Questions from "@/components/controllers/questions";
import ScienceForm from "@/components/controllers/science-form";
import Sciences from "@/components/controllers/sciences";
import Users from "@/components/controllers/users";
import PrivateRoute from "@/private/private-route";
import NewsBody from "@/components/controllers/news-body";

export default function Controllers() {
  return (
    <div className="px-4 mt-8 pb-24">
      <div className="flex gap-3 items-start flex-wrap xl:flex-nowrap mb-6">
        <div className="flex gap-3 items-start w-full flex-wrap lg:flex-nowrap">
          <PrivateRoute roles={["admin"]}>
            <Users />
          </PrivateRoute>
          <div className="flex flex-col gap-2 w-full xl:w-[500px]">
            <ScienceForm />
            <Sciences />
          </div>
        </div>
        <div className="w-full xl:max-w-[750px]">
          <Questions />
        </div>
      </div>
      <div className="flex items-start w-full gap-3">
        <NewsForm />
        <NewsBody />
      </div>
    </div>
  );
}
