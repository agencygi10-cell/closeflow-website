"use client";

import { Instagram, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-brand-purple/15 bg-brand-deep/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-brand-lilac/70 leading-relaxed max-w-xs">
              El partner que organiza tu caos y multiplica tus ventas. Sistema
              CRM para estudios y centros de belleza.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-brand-lilac/70">
              <li>
                <a href="#que-hacemos" className="hover:text-white">
                  Qué hacemos
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-white">
                  Casos de éxito
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-brand-lilac/70">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-brand-pink" />
                <a
                  href="mailto:agency.gi10@gmail.com"
                  className="hover:text-white"
                >
                  agency.gi10@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={15} className="text-brand-pink" />
                <a
                  href="https://www.instagram.com/iamgianguerreroo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  @iamgianguerreroo
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-pink" />
                California, EEUU
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-purple/15 pt-6 sm:flex-row">
          <p className="text-xs text-brand-lilac/50">
            © {new Date().getFullYear()} CloseFlow System. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-brand-lilac/50">
            Hecho con propósito en California.
          </p>
        </div>
      </div>
    </footer>
  );
}
