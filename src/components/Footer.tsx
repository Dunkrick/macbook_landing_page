import { footerLinks } from "../constants/index.js";

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>
                    Built on the machine it celebrates.
                    <span className="text-dark-100 ml-2">
                        — an engineering student who lives at the intersection of design, film, and code.
                    </span>
                </p>
            </div>

            <hr />

            <div className="links">
                <p>© 2026 Rithwick. Built with passion on a MacBook Pro M3 Pro.</p>

                <ul>
                    {footerLinks.map(({ label, link }) => (
                        <li key={label}>
                            <a href={link} target="_blank" rel="noopener noreferrer">{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
export default Footer