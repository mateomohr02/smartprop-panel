import Link from "next/link"

const NavLinkButton = ({href, text, setShow}) => {
  return (
    <Link href={href} className="text-contrast w-full text-center border-b py-2 border-contrast" onClick={() => setShow(false)}>{text}</Link>
  )
}

export default NavLinkButton