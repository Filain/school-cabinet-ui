"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Icons from "@/components/ui/Icons";

export default function FooterComponent() {
  const router = useRouter();

  const handleClickInfo = () => {
    router.push("/info");
  };

  const handleClickLinkedin = () => {
    window.open("https://www.linkedin.com/in/volodymyr-fylypiv/", "_blank");
  };

  const handleClickGitHub = () => {
    window.open("https://github.com/Filain", "_blank");
  };

  return (
    <footer className=" mt-auto flex justify-between items-center min-h-16 bg-green-200">
      <p className="ml-5 text-lg font-bold text-green-800 drop-shadow-xl">
        © {dayjs(new Date()).format("YYYY")}
        <span className="italic"> Created by Volodymyr Fylypiv</span>
      </p>
      <div className=" flex flex-row items-center">
        <Button className="mr-5" icon={true} onClick={handleClickInfo}>
          <Icons name="info" className="w-10 h-10 fill-transparent stroke-white  stroke-1.5" />
        </Button>
        <Button className="mr-5" icon={true} onClick={handleClickGitHub}>
          <Icons name="github" className="w-10 h-10 fill-transparent stroke-white  stroke-1.5" />
        </Button>
        <Button className="mr-5" icon={true} onClick={handleClickLinkedin}>
          <Icons name="linkedin" className="w-10 h-10 fill-transparent stroke-white  stroke-1.5" />
        </Button>
      </div>
    </footer>
  );
}
