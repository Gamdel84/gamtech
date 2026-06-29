import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 px-4 py-2 text-sky-300">
      <div className="flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <img
            src="/GAM_soluciones_tecnicas_logo.png"
            alt="GAM Soluciones Técnicas"
            className="h-16 w-auto md:h-24 lg:h-24"
          />
        </a>

        <button
          className="rounded-md text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className="hidden gap-2 text-base font-medium md:flex">
          <a href="#inicio" className= "p-1 rounded-md border-2 border-sky-500 hover:bg-sky-700 hover:text-white">Inicio</a>
          <a href="#servicios" className= "p-1 rounded-md border-2 border-sky-500 hover:bg-sky-700 hover:text-white">Servicios</a>
          <a href="#presupuesto" className= "p-1 rounded-md border-2 border-sky-500 hover:bg-sky-700 hover:text-white">Presupuesto</a>
          <a href="#sobre-mi" className= "p-1 rounded-md border-2 border-sky-500 hover:bg-sky-700 hover:text-white">Sobre mí</a>
          <a href="#contacto" className= "p-1 rounded-md border-2 border-sky-500 hover:bg-sky-700 hover:text-white">Contacto</a>
        </nav>
      </div>

      {menuOpen && (
        <nav className="mt-4 flex flex-col gap-4 text-sm font-medium md:hidden">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>
            Inicio
          </a>

          <a href="#servicios" onClick={() => setMenuOpen(false)}>
            Servicios
          </a>

          <a href="#presupuesto" onClick={() => setMenuOpen(false)}>
            Presupuesto
          </a>

          <a href="#sobre-mi" onClick={() => setMenuOpen(false)}>
            Sobre mí
          </a>

          <a href="#opiniones" onClick={() => setMenuOpen(false)}>
            Opiniones
          </a>

          <a href="#contacto" onClick={() => setMenuOpen(false)}>
            Contacto
          </a>
        </nav>
      )}
      
      <hr className="border-2 border-sky-500"/>
    </header>
  );
};

export default Header;
