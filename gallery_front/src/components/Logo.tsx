import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="페스타그램 홈"
      className={`inline-flex shrink-0 items-center gap-2 ${className}`}
    >
      <img src="/festagram-mark.png" alt="" className="h-12 w-12 object-contain" />
      <span className="text-xl font-bold text-[#292c28]">Festagram</span>
    </Link>
  );
}
