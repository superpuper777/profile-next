import Link from "next/link";

type FooterProps = {
  text: string;
  linkText: string;
  linkHref: string;
};

const Footer: React.FC<FooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <footer className="flex items-center justify-center py-5.75 bg-background-primary">
      <p className="paragraph text-custom-gray">
        {text}{" "}
        <Link href={linkHref} className="btnText text-txt-color font-medium">
          {linkText}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
