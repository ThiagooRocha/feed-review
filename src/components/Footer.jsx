import "./Footer.css";
import { Logo } from "./Logo";

import { LinkedinLogo, GithubLogo } from "phosphor-react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-infos text-sm">
        <div>
          <p>Pesquise por tags que te interessem.</p>
          <p>Publique algum assunto que deseja compartilhar!</p>
        </div>

        <ul className="contact">
          <li>
            <a
              href="https://www.linkedin.com/in/thiago-rocha-787468223/"
              target="blank"
            >
              <LinkedinLogo size={32} />
            </a>
          </li>
          <li>
            <a href="https://github.com/ThiagooRocha" target="blank">
              <GithubLogo size={32} />
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-rights-reserved text-sm">
        <Logo /> &copy; 2022 Todos direitos reservados.
      </div>
    </footer>
  );
};
