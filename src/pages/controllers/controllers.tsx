import Questions from "@/components/controllers/questions";
import ScienceForm from "@/components/controllers/science-form";
import Sciences from "@/components/controllers/sciences";
import Users from "@/components/controllers/users";
import PrivateRoute from "@/private/private-route";

export default function Controllers() {
  return (
    <div className="p-4">
      <div className="flex gap-3 items-start flex-wrap xl:flex-nowrap">
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
    </div>
  );
}
