import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ScienceForm() {
  return (
    <form className="max-w-[500px] flex flex-col gap-2 p-2 border">
      <Input type="text" placeholder="Fan nomi!" />
      <Input type="text" placeholder="Muallif: Ustoz ism familyasi!" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={"Kurs..."} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">1-kurs</SelectItem>
            <SelectItem value="2">2-kurs</SelectItem>
            <SelectItem value="3">3-kurs</SelectItem>
            <SelectItem value="4">4-kurs</SelectItem>
        </SelectContent>
      </Select>
      <Button>Yuklash</Button>
    </form>
  );
}
