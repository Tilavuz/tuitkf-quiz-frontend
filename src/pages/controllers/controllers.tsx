import ScienceForm from "@/components/controllers/science-form";
import Sciences from "@/components/controllers/sciences";
import Users from "@/components/controllers/users";

export default function Controllers() {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <Users />
        <div className="w-full flex flex-col gap-2">
          <ScienceForm />
          <Sciences />
        </div>
      </div>
    </div>
  );
}
