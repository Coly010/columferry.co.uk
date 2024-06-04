import { NavLink } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faAmazon,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const Menu = () => {
  return (
    <nav className="flex items-center justify-between p-4 relative">
      <div className="">
        <h2 className="font-bold text-xl">Colum Ferry</h2>
      </div>
      <div className="fixed bottom-0 right-1/2 z-50 h-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2 lg:block lg:relative lg:transform-none lg:right-auto xl:absolute xl:w-full xl:-ml-4 xl:top-4 xl:flex xl:justify-center select-none">
        <div className="pointer-events-auto rounded-xl w-96 h-10 p-0.5 bg-white border border-zinc-300 shadow-sm flex justify-between items-center gap-x-1">
          <NavPill to="/">Home</NavPill>
          <NavPill to="/blog">Blog</NavPill>
          <NavPill to="/books">Books</NavPill>
          <NavPill to="/tutarium">Tutarium</NavPill>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <MenuButton
          Icon={<FontAwesomeIcon icon={faGithub} />}
          to="https://github.com/Coly010"
        />
        <MenuButton
          Icon={<FontAwesomeIcon icon={faXTwitter} />}
          to="https://x.com/FerryColum"
        />
        <MenuButton
          Icon={<FontAwesomeIcon icon={faAmazon} />}
          to="https://www.amazon.co.uk/stores/Colum-Ferry/author/B0BRT1WQGB"
        />
      </div>
    </nav>
  );
};

const NavPill = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center rounded-xl w-full h-full font-semibold text-lg no-underline hover:no-underline hover:bg-zinc-100 transition ${isActive ? "bg-zinc-100" : ""}`
      }
    >
      {children}
    </NavLink>
  );
};

const MenuButton = ({ Icon, to }: { Icon: any; to: string }) => {
  return (
    <a
      href={to}
      target="_blank"
      className="flex justify-center items-center p-2 border border-zinc-300 min-w-[48px] h-10 rounded-xl transition transform shadow active:scale-95 bg-white text-black hover:bg-zinc-100 select-none"
    >
      {Icon}
    </a>
  );
};
