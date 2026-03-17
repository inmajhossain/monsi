import Link from "next/link";

export default function notFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-[85vh]">
      <h6 className="md:w-180 font-bold text-sm md:text-2xl text-center">
        🚧 Website is under construction... Not because of bugs
      </h6>
      <h6 className="md:w-180 font-bold text-sm md:text-2xl text-center">
        🚧 because I’m still single 😅
      </h6>
      <h6 className="md:w-190 font-bold text-sm md:text-2xl text-center">
        Work in progress… final version will be released after marriage 💍
      </h6>
      <h6 className="md:w-180 font-bold text-sm md:text-2xl text-center">
        Till then: loading... loading... loading...⏳
      </h6>
      <button className="bg-black dark:bg-cyan-950 px-6 py-3 rounded-[10px] font-medium text-white">
        <Link href="/#">Please Go To Home Page & Find A Girl For Me</Link>
      </button>
    </div>
  );
}
