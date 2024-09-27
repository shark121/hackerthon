"use client";
import { Comfortaa } from "next/font/google";
import { motion as m } from "framer-motion";
import Input from "next/image";
import { useState } from "react";
import Cameracapture from "@/app/utils/camera";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export async function sedFileReq({
  File,
}: // collectionType,
// nameID,
{
  File: File | null;
  // collectionType: string;
  // nameID: string;
}) {
  if (!File) {
    return;
  }
  const formData = new FormData();
  formData.append("imageFile", File);
  await fetch(`/api/image/`, {
    method: "POST",
    body: formData,
  })
    .catch((err) => {
      console.log("there a was an err ", err);
    })
    .then((response) => {
      console.log(response, "resolved");
    });
}

function LogoCSS({ shouldAnimate }: { shouldAnimate: boolean }) {
  const animated = shouldAnimate ? 3 : 0;

  return (
    <div className="absolute  right-[47%] h-[5rem] w-[5rem] scale-[1.3] s">
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 100 100"
        viewBox="0 0 100 125"
        className="absolute  -z-30 rotate-[30deg] -left-2 "
        height={"10rem"}
        width={"10rem"}
        fill="url(#gradient)"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="80%" stopColor="#f32170" />
            <stop offset="100%" stopColor="#ff6b08" />
            <stop offset="100%" stopColor="#cf23cf" />
            <stop offset="100%" stopColor="#eedd44" />
          </linearGradient>
        </defs>
        <m.path
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: 360 }}
          transition={{
            duration: animated,
            repeat: Infinity,
            repeatType: "loop",
          }}
          d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"
        ></m.path>
      </m.svg>
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 100 100"
        viewBox="0 0 100 125"
        className="absolute  -z-20 rotate-[60deg] -top-2 -left-3 "
        height={"10rem"}
        width={"10rem"}
        fill="url(#gradient)"
      >
        <m.path
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -360 }}
          transition={{
            duration: animated,
            repeat: Infinity,
            repeatType: "loop",
          }}
          d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"
        ></m.path>
      </m.svg>
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 100 100"
        viewBox="0 0 100 125"
        className="absolute "
        height={"10rem"}
        width={"10rem"}
        fill="url(#gradient)"
      >
        <m.path d="M83 10H17c-3.86 0-7 3.14-7 7v66c0 3.86 3.14 7 7 7h66c3.86 0 7-3.14 7-7V17c0-3.86-3.14-7-7-7zm5 73c0 2.757-2.243 5-5 5H17c-2.757 0-5-2.243-5-5V17c0-2.757 2.243-5 5-5h66c2.757 0 5 2.243 5 5v66z"></m.path>
      </m.svg>
      {/* <div className=" absolute diverText font-bold text-[1.3rem] top-[2.9rem] left-[3.4rem]">
          diver
        </div> */}
    </div>
  );
}

export default function Try() {
  const [fileState, setFileState] = useState<File | null>(null);

  return (
    <div
      className={`${comfortaa.className} flex  justify-center p-4 h-screen w-screen items-center gap-6 bg-[#28282B]`}
    >
      <div className="h-[90vh] w-[100vw] flex flex-col justify-between items-center">
        <div className="h-[20rem] w-[20rem]   flex items-center justify-center relative">
          <LogoCSS shouldAnimate={true} />
        </div>
        <div className="text-white text-[1.2rem] ">
          Hi there and welcome! Upload a picture to analyse
        </div>

        <div className="flex w-[15rem] h-[3rem] gap-4 items-center justify-center">
          <div className="w-[10rem] relative h-full   flex justify-center items-center rounded-2xl ">
            <div className=" bg-white  w-full relative h-full rounded-2xl opacity-[0.3] shadow-sky-200xl"></div>
            <input
              className="absolute z-20 rounded-2xl resize-none  outline-none my-8 w-[95%] p-2 h-[88%] text-gray-500 "
              placeholder="select image "
              type="file"
              onChange={async (e) => {
                e.target.files &&
                  e.target.files.length > 0 &&
                  setFileState(e.target.files[0]);
                // await  sedFileReq({ File);
                console.log(e.target.files && e.target.files[0].name, "file");
              }}
            />
            <div></div>
          </div>
          <button
            onClick={() => sedFileReq({ File: fileState })}
            className="h-[3rem] w-[3rem] rounded-full p-[1px] bg-white relative"
          />
        </div>
        {/* <button onClick={AddDocument}>add</button>
        <button onClick={fetchDocuments}>fetch</button> */}
        {/* <Cameracapture /> */}
        <a href=""></a>
      </div>
    </div>
  );
}
