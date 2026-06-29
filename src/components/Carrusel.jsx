import { useEffect, useState } from "react";

const slides = [
  {
    src: "/hero/elec1.jpg",
    category: "Electricidad",
    title: "Instalaciones eléctricas",
    text: "Trabajos domiciliarios y comerciales.",
  },
  {
    src: "/hero/camext4.jpg",
    category: "Seguridad electrónica",
    title: "Cámaras de seguridad",
    text: "Instalación y configuración de sistemas CCTV.",
  },
  {
    src: "/hero/abel2.jpg",
    category: "Climatización",
    title: "Aire acondicionado",
    text: "Instalación, mantenimiento y revisión de equipos.",
  },
  {
    src: "/hero/ventecho3.jpg",
    category: "Electricidad",
    title: "Tableros y protecciones",
    text: "Térmicas, disyuntores y reparaciones.",
  },
  {
    src: "/hero/camint2.jpg",
    category: "Seguridad electrónica",
    title: "Alarmas y sensores",
    text: "Soluciones para hogares y comercios.",
  },
  {
    src: "/hero/manifold1.jpg",
    category: "Climatización",
    title: "Mantenimiento",
    text: "Limpieza, control y diagnóstico técnico.",
  },
  {
    src: "/hero/lumi1.jpg",
    category: "Electricidad",
    title: "Instalaciones eléctricas",
    text: "Trabajos domiciliarios y comerciales.",
  },
  {
    src: "/hero/biometrico1.jpg",
    category: "Seguridad electrónica",
    title: "Cámaras de seguridad",
    text: "Instalación y configuración de sistemas CCTV.",
  },
  {
    src: "/hero/cond1.jpg",
    category: "Climatización",
    title: "Aire acondicionado",
    text: "Instalación, mantenimiento y revisión de equipos.",
  },
  {
    src: "/hero/elec2.jpg",
    category: "Electricidad",
    title: "Tableros y protecciones",
    text: "Térmicas, disyuntores y reparaciones.",
  },
  {
    src: "/hero/rack1.jpg",
    category: "Seguridad electrónica",
    title: "Alarmas y sensores",
    text: "Soluciones para hogares y comercios.",
  },
  {
    src: "/hero/vacio.jpg",
    category: "Climatización",
    title: "Mantenimiento",
    text: "Limpieza, control y diagnóstico técnico.",
  },
];

const Carrusel = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((currentIndex) => (currentIndex + 3) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const visibleSlides = [
    slides[startIndex],
    slides[(startIndex + 1) % slides.length],
    slides[(startIndex + 2) % slides.length],
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
      {visibleSlides.map((slide) => (
        <article
          key={`${slide.src}-${slide.title}`}
          className="overflow-hidden rounded-2xl bg-slate-800 shadow-lg ring-1 ring-slate-700 transition duration-500 hover:-translate-y-1 hover:ring-sky-500"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={slide.src}
              alt={slide.title}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">
                {slide.category}
              </p>

              <h3 className="mt-1 text-lg font-bold text-white">
                {slide.title}
              </h3>

              <p className="mt-1 text-sm text-slate-200">{slide.text}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Carrusel;
