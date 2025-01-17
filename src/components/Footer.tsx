import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const footerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#282c34',
    color: 'white',
};

const socialLinksStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
};

const linkStyle: React.CSSProperties = {
    color: 'white',
    margin: '0 10px',
    textDecoration: 'none',
};

const contributeStyle: React.CSSProperties = {
    marginTop: '10px',
};

const Footer: React.FC = () => {
    return (
        <footer style={footerStyle}>
            <div style={socialLinksStyle}>
                <a href="https://github.com" style={linkStyle}>
                    <FaGithub />
                </a>
                <a href="https://linkedin.com" style={linkStyle}>
                    <FaLinkedin />
                </a>
                <a href="https://twitter.com" style={linkStyle}>
                    <FaTwitter />
                </a>
            </div>
            <div style={contributeStyle}>
                <p>Contribute to this project on GitHub</p>
            </div>
        </footer>
    );
};

export default Footer;
