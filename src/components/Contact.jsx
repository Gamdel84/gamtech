const Contact = () => {
  return (
    <section id="contacto" className="scroll-mt-32 bg-slate-100 px-6 py-14">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Contacto
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
          Consultame para coordinar una visita, resolver una duda o solicitar un
          presupuesto para tu hogar o comercio.
        </p>

        <div className="mx-auto mt-8 max-w-md space-y-4 text-left">
          <div className="rounded-xl bg-slate-100 p-4">
            <h3 className="font-bold text-sky-700">Celular</h3>
            <div>Llamar:
            <a
              href=" tel:+5491162623005"
              className="mt-1 text-slate-700 transition hover:text-sky-700"
            >
              +54 9 11 6262-3005
            </a>
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <h3 className="font-bold text-sky-700">Instagram</h3>
            <a
              href="https://www.instagram.com/gamtechserv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-slate-700 transition hover:text-sky-700"
            >
              @gamtechserv
            </a>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/5491162623005?text=Hola%20Gustavo,%20quiero%20consultar%20por%20un%20presupuesto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-emerald-600"
          >
            Contactame por WhatsApp
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
