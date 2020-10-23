import { cpuUsage } from "process";
import { useState } from "react";

interface SectionProps {
  children: JSX.Element | JSX.Element[];
  fold?: boolean;
  title?: string;
}
const Section = ({ children, fold = false, title }: SectionProps) => {
  const [unfold, setUnfold] = useState<boolean>(fold);

  const handleClick = () => {
    setUnfold(!unfold);
  };
  return (
    <section className="pos-relative">
      <header className="d-flex ai-start jc-start">
        <h2 className="ta-left fxg-0">{title}</h2>

        <button
          onClick={() => handleClick()}
          className="w-auto m-auto mh-16 cursor-pointer"
          style={{ padding: "4px" }}
        >
          {unfold ? "▷" : "▽"}
        </button>
      </header>
      <div className={unfold ? "h-0 ov-hidden" : "h-auto"}>{children}</div>
    </section>
  );
};

export default Section;
