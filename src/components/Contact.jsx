function Contact() {
  return (
    <section id="contacto" className="scroll-mt-32 bg-slate-100 px-6 py-14">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Contacto
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
          Consultame por WhatsApp para coordinar una visita, resolver una duda
          o solicitar un presupuesto para tu hogar o comercio.
        </p>

        <div className="mt-8">
          <a
            href="https://wa.me/5491162623005?text=Hola%20Gustavo,%20quiero%20consultar%20por%20un%20presupuesto."
            target="_blank"
            className="mt-2 mb-2 inline-block rounded-md bg-emerald-400 px-5 py-2 text-lg font-semibold text-white transition hover:bg-cyan-600"
          >
            Enviar mensaje por WhatsApp
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4">
            <h3 className="font-bold text-sky-700">Atención</h3>
            <p className="mt-2 text-slate-700">
              Consultas y presupuestos coordinados previamente.
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <h3 className="font-bold text-sky-700">Servicios</h3>
            <p className="mt-2 text-slate-700">
              Electricidad, seguridad electrónica y climatización.
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <h3 className="font-bold text-sky-700">Zona</h3>
            <p className="mt-2 text-slate-700">
              Trabajos para hogares y comercios. Zona a coordinar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;