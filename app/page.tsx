// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Is your&nbsp;</span>
        <span className={title()}>child's&nbsp;</span>
        <br />
        <span className={title()}>health being monitored?</span>
        <div>
          <span className={title()}>Get a&nbsp;</span>
          <span className={title({ color: "violet" })}>DHRC!</span>
        </div>
      </div>

      <div className="flex gap-3"></div>
    </section>
  );
}
