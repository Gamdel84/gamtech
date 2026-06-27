import Carrusel from "./Carrusel";

function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-32 relative min-h-[70vh] overflow-hidden bg-slate-900 px-6 py-6 text-white"
    >
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-sky-700/20 blur-3xl animate-glow-move"></div>

      <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl animate-glow-move"></div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="animate-fade-up text-center text-2xl font-bold md:text-3xl">
          Soluciones técnicas integrales para tu hogar o comercio
        </h2>

        <hr className="my-2 border-slate-700" />

        <p className="animate-fade-up rounded-md bg-slate-800 px-2 py-2 text-center text-lg font-medium text-sky-300 [animation-delay:150ms]">
          Servicios de electricidad, seguridad electrónica y climatización
        </p>

        <hr className="my-2 border-slate-700" />

        <Carrusel />
      </div>
    </section>
  );
}

export default Hero;