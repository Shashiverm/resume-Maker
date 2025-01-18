import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/Shashiverm" icon={<Github size={20} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/shashikantkumargaya/" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://x.com/Shashivermn" icon={<Twitter size={20} />} label="Twitter" />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Made by Shashi</span>
            <Heart size={20} className="text-red-500 animate-pulse" />
          </div>
          
          <div className="text-center">
            <p className="text-sm">
              Contribute to this project on{' '}
              <a href="https://github.com/Shashiverm/resume-maker" className="inline-flex items-center hover:text-white transition-colors duration-200">
                <Github size={20} className="mr-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
    >
      {icon}
    </a>
  );
};

export default Footer;
