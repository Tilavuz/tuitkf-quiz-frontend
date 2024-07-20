import ProfileForm from "@/components/common/profile/profile-form";
import ProfileSciences from "./profile-sciences";
import ProfileSciencesResult from "./profile-sciences-result";

export default function Profile() {
  return (
    <div className="py-12">
      <div className="container flex items-start gap-6 flex-wrap lg:flex-nowrap">
        <div className="flex items-start gap-6 w-full md:flex-nowrap flex-wrap justify-center">
          <div className="max-w-[300px] w-full dark:bg-inherit dark:border bg-slate-50 rounded-md">
            <ProfileForm />
          </div>
          <ProfileSciences />
        </div>
        <ProfileSciencesResult />
      </div>
    </div>
  );
}
