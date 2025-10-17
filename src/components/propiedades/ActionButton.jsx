import Link from "next/link";

const ActionButton = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="rounded-full bg-primary text-contrast py-3 px-5 hover:bg-secondary transition-all duration-300 w-fit"
    >
      {text}
    </Link>
  );
};

export default ActionButton;
