// Corrected Footer Component
import React from 'react';
import { FaTwitter, FaYoutube, FaTelegramPlane, FaTiktok } from 'react-icons/fa'; // Importa los iconos de Twitter, YouTube, Telegram y TikTok

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4">
      <div className="flex justify-between items-center px-8 max-w-full">
        {/* Derechos reservados alineados a la izquierda */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Flancraft. Todos los derechos reservados.
        </div>
        {/* Iconos de redes sociales alineados a la derecha */}
        <div className="flex space-x-4 text-2xl">
          <a
            href="https://x.com/flancoin_token"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.youtube.com/channel/UC_iHxExXtI2MDJF4ct1Kh6Q/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-300"
          >
            <FaYoutube />
          </a>
          <a
            href="https://t.me/+5Rc8x-x9b3lmZWRk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://www.tiktok.com/@flancraftserver"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
