import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionInterface } from "@/interface/question-interface";
import { SessionInterface } from "@/interface/session-interface";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function TestWork() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const [tests, setTests] = useState<QuestionInterface[] | null>(null);
  const [answers, setAnswers] = useState<
    { answer: string; question: string; status: boolean }[] | null
  >();
  const [session, setSession] = useState<{
    session: SessionInterface;
    solutions: { answer: string; question: string; status: boolean }[] | null;
  }>();

  const [modal, setModale] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

  const saveSession = async () => {
    try {
      const res = await apiClient.post(`/sessions/add/${id}`, session);
      toast.success(res.data.message);
      navigate("/profile");
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
  };

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            handleFinishTest();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    };

    if (!loading && tests?.length) {
      startTimer();
    }

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [loading]);

  const handleFinishTest = () => {
    if (timeLeft < 1800) {
      setModale(true);
      if (timerRef.current) {
        setSession({
          session: {
            questions: tests?.length ? tests?.length : 0,
            time: 1800 - timeLeft,
            score: answers?.filter((answer) => answer.status === true).length
              ? answers?.filter((answer) => answer.status === true).length * 2
              : 0,
            percent:
              answers?.filter((answer) => answer.status === true).length &&
              tests?.length
                ? parseFloat(
                    (
                      (answers?.filter((answer) => answer.status === true)
                        .length /
                        tests?.length) *
                      100
                    ).toFixed(1)
                  )
                : 0,
          },
          solutions: answers ? answers : null,
        });
        clearInterval(timerRef.current);
      }
    }
  };

  useEffect(() => {
    if (answers?.length === tests?.length) {
      handleFinishTest();
    }
  }, [answers]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.post(`/tests/${id}`, {
          order: location.state.order,
          random: location.state.random,
        });
        if (Array.isArray(res.data)) {
          setTests(res.data);
        } else {
          console.error("Qaytgan ma'lumot massiv emas:", res.data);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, location.state]);

  const handleAnswer = async (
    answer: string,
    question: string,
    correct_answer: string
  ) => {
    setAnswers((prev) => {
      if (prev && answer && question && correct_answer) {
        return [
          ...prev,
          { answer, question, status: correct_answer === answer },
        ];
      } else if (!prev) {
        return [{ answer, question, status: correct_answer === answer }];
      } else {
        return prev;
      }
    });
  };

  const getLabelClass = (question: string, option: string) => {
    const answer = answers?.find((ans) => ans.question === question);
    if (answer) {
      return answer.answer === option
        ? answer.status
          ? "bg-green-500 text-white font-bold"
          : "bg-red-500 text-white font-bold"
        : "";
    }
    return "";
  };

  return (
    <div>
      <div className="container pt-4 pb-8 border my-8 select-none">
        <div
          className={`w-[90px] h-[40px] ${timeLeft < 900 && "bg-yellow-500"} ${
            timeLeft < 180 && "bg-red-500"
          } ${
            timeLeft > 900 && "bg-green-500"
          } flex items-center justify-center text-white rounded-md my-2`}
        >
          <p className="font-bold text-2xl">{formatTime(timeLeft)}</p>
        </div>
        <div className="flex flex-col gap-4">
          {tests &&
            !loading &&
            Array.isArray(tests) &&
            tests.map((test, i) => (
              <div key={test._id} className="border p-2">
                <div className="flex items-start gap-2 mb-4">
                  <span className="font-bold">{i + 1})</span>
                  <div
                    className="font-bold"
                    dangerouslySetInnerHTML={{ __html: test.question }}
                  />
                </div>
                <RadioGroup
                  disabled={
                    modal ||
                    answers?.some((answer) => answer.question === test.question)
                  }
                  onValueChange={(value) =>
                    handleAnswer(value, test.question, test.correct_answer)
                  }
                >
                  {test.options.map((option, index) => (
                    <div key={`${test._id}-${index}`}>
                      <Label
                        className={`flex p-1 items-start gap-2 ${getLabelClass(
                          test.question,
                          option
                        )}`}
                      >
                        <RadioGroupItem className="hidden" value={option} />
                        <p className="uppercase">{alphabet[index]})</p>
                        <div className="cursor-pointer" dangerouslySetInnerHTML={{ __html: option }} />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          {!loading && !tests?.length && <div>Bu fan bo'yicha hali test mavjut emas!</div>}
        </div>
        <div className="w-full flex justify-end p-4">
          <Button onClick={() => handleFinishTest()}>Tugatish</Button>
        </div>
      </div>
      {modal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 dark:bg-black/80 flex items-center justify-center">
          <div className="max-w-[700px] w-full bg-white rounded-lg py-4 dark:bg-[#020817]">
            <h3 className="font-bold text-xl px-2 pb-2">Test natijasi</h3>
            <ul className="mb-4">
              <li className="bg-slate-100 dark:bg-black/40 px-2 py-4 flex items-center gap-4">
                <span className="font-bold">Imtixon</span>
                <span className="capitalize">{location.state.title}</span>
              </li>
              <li className="px-2 py-4 flex items-center gap-4">
                <span className="font-bold">
                  {user?.auth?.role === "user" && "Talaba"}
                  {user?.auth?.role === "admin" && "Admin"}
                  {user?.auth?.role === "teacher" && "Ustoz"}
                </span>
                <span className="capitalize">{user?.name}</span>
              </li>
              <li className="bg-slate-100 dark:bg-black/40 px-2 py-4 flex items-center gap-4">
                <span className="font-bold">Vaqt</span>
                <span className="capitalize">{`${Math.floor(
                  (1800 - timeLeft) / 60
                )}m ${Math.floor((1800 - timeLeft) % 60)}s`}</span>
              </li>
              <li className="px-2 py-4 flex items-center gap-4">
                <span className="font-bold">Savollar</span>
                <span className="capitalize">{tests?.length}</span>
              </li>
              <li className="bg-slate-100 dark:bg-black/40 px-2 py-4 flex items-center gap-4">
                <span className="font-bold">Ball</span>
                <span className="capitalize">
                  {answers?.filter((answer) => answer.status === true).length &&
                  answers?.filter((answer) => answer.status === true).length > 0
                    ? answers?.filter((answer) => answer.status === true)
                        .length * 2
                    : 0}
                </span>
              </li>
              <li className="px-2 py-4 flex items-center gap-4">
                <span className="font-bold">Foiz</span>
                <span className="capitalize">
                  {answers?.filter((answer) => answer.status === true).length &&
                  tests?.length
                    ? parseFloat(
                        (
                          (answers?.filter((answer) => answer.status === true)
                            .length /
                            tests?.length) *
                          100
                        ).toFixed(1)
                      )
                    : 0}
                  %
                </span>
              </li>
            </ul>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => saveSession()}
                disabled={location.state.order === "a"}
              >
                Saqlash
              </Button>
              <Button variant={"ghost"}>
                <Link to={"/profile"}>Ortga qaytish</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
