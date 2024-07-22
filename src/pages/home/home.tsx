import DataCount from "./data-count";
import FirstCoursTopUsers from "./first-cours-top-users";
import FourthCoursTopUsers from "./fourth-cours-top-users";
import SecondCoursTopUsers from "./second-cours-top-users";
import ThirdCoursTopUsers from "./third-cours-top-users";
import TopUsers from "./top-users";

export default function Home() {

  return (
    <div className="container py-4">
      <DataCount />
      <div className="mb-12">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">
          Top 4 ta yaxshi natija
        </h2>
        <TopUsers />
      </div>
      <div className="mb-12">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">
          Top 4 ta 1-kurslar ichida yaxshi natija
        </h2>
        <FirstCoursTopUsers />
      </div>
      <div className="mb-12">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">
          Top 4 ta 2-kurslar ichida yaxshi natija
        </h2>
        <SecondCoursTopUsers />
      </div>
      <div className="mb-12">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">
          Top 4 ta 3-kurslar ichida yaxshi natija
        </h2>
        <ThirdCoursTopUsers />
      </div>
      <div className="mb-12">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">
          Top 4 ta 4-kurslar ichida yaxshi natija
        </h2>
        <FourthCoursTopUsers />
      </div>
    </div>
  );
}
