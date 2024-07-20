import DataCount from "./data-count";
import TopUsers from "./top-users";

export default function Home() {

  

  return (
    <div className="container py-4">
      <DataCount />
      <div className="">
        <h2 className="font-bold text-2xl font-mono pt-4 pb-8">Top 5 ta yaxshi natija</h2>
        <TopUsers />
      </div>
    </div>
  );
}
