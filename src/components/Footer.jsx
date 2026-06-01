import { footerLinks } from "../constants/index.js";

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>Built with passion on a MacBook Pro.</p>
            </div>

            <hr />

            <div className="links">
                <p>© 2026 Rithwick. All rights reserved.</p>

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