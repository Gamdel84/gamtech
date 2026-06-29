import ServiceCard from "./ServiceCard";

const services = [
  {
    id: 1,
    title: "Electricidad",
    description:
      "Instalaciones, reparaciones, tableros, térmicas, disyuntores, tomas y luminarias.",
  },
  {
    id: 2,
    title: "Seguridad electrónica",
    description:
      "Instalación de cámaras, alarmas, sensores, porteros eléctricos y mantenimiento.",
  },
  {
    id: 3,
    title: "Climatización",
    description:
      "Instalación, limpieza, revisión y mantenimiento de equipos de aire acondicionado.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="scroll-mt-32 bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Servicios
        </h2>
        <h3 className="mt-4 text-center text-lg text-slate-700">Todos los servicios tienen garantía</h3>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-xl bg-slate-800 p-5 text-slate-200">
          <h3 className="font-bold text-sky-400">Climatización</h3>

          <p className="mt-2 text-2xl leading-relaxed">
            <b className="text-2xl text-red-500 underline">CÁLCULO TÉRMICO</b><b className= "text-2xl text-red-500">:</b> Si aún no compraste tu equipo, puedo asesorarte de forma gratuita, para comprar con seguridad y garantizar una buena climatización todo el año.
          </p>
        </div>
    </section>
  );
};

export default Services;
