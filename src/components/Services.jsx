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

function Services() {
  return (
    <section id="servicios" className="scroll-mt-32 bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Servicios
        </h2>

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
    </section>
  );
}

export default Services;