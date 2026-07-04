import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-6 py-8 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-lg font-bold text-sky-700">
            GAM Soluciones Técnicas
          </h2>

          <p className="mt-1 text-sm">
            Electricidad · Seguridad electrónica · Climatización
          </p>
        </div>

        <div className="text-sm">
          <p>© 2026 Gustavo Alejandro Miguel</p>
          <p className="mt-1">Todos los derechos reservados</p>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          

          <Link
            to="/admin"
            aria-label="Panel admin"
            title="Panel admin"
            className="text-lg leading-none text-slate-700 transition hover:text-slate-400"
          >
            •
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
