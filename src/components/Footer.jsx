function Footer() {
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

        <a
          href="https://wa.me/5491162623005?text=Hola%20Gustavo,%20quiero%20consultar%20por%20un%20presupuesto."
          target="_blank"
          className="mt-2 mb-2 inline-block rounded-md bg-emerald-400 px-5 py-2 text-lg font-semibold text-white transition hover:bg-cyan-600"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </footer>
  );
}

export default Footer;