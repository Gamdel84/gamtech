function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-32 min-h-[70vh] bg-slate-900 px-6 py-2 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Soluciones técnicas integrales para tu hogar o comercio
        </h2>
        <hr className="my-2"/>

        <p className="rounded-md bg-slate-800 px-2 py-2 text-center text-lg font-medium text-sky-300">
          Servicios de electricidad, seguridad electrónica y Climatización
        </p>
        <hr className="my-2"/>       

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          <img
            src="/GAM_instalaciones_electricas.png"
            alt="Servicio de instalaciones eléctricas"
            className="mx-auto w-full max-w-xs rounded-lg object-contain shadow-lg sm:max-w-sm lg:max-w-sm"
          />

          <img
            src="/GAM_seguridad_electronica.png"
            alt="Servicio de seguridad electrónica"
            className="mx-auto w-full max-w-xs rounded-lg object-contain shadow-lg sm:max-w-sm lg:max-w-sm"
          />

          <img
            src="/GAM_climatizacion.png"
            alt="Servicio de climatización"
            className="mx-auto w-full max-w-xs rounded-lg object-contain shadow-lg sm:max-w-sm lg:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;