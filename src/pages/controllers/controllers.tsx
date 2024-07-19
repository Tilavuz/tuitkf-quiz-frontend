import Questions from "@/components/controllers/questions";
import ScienceForm from "@/components/controllers/science-form";
import Sciences from "@/components/controllers/sciences";
import Users from "@/components/controllers/users";
import PrivateRoute from "@/private/private-route";

export default function Controllers() {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <PrivateRoute roles={['admin']}>
          <Users />
        </PrivateRoute>
        <div className="flex flex-col gap-2 w-full max-w-[500px]">
          <ScienceForm />
          <Sciences />
        </div>
        <Questions />
      </div>
    </div>
  );
}
