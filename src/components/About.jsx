function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-28 bg-slate-900 px-6 py-14 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Sobre mí</h2>

          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Soy técnico electricista matriculado. Tengo 20 años de experiencia
            en instalaciones de sistemas de seguridad electrónica y soy técnico
            matriculado en instalación y reparación de aires acondicionados.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Mi objetivo es brindar soluciones técnicas para hogares y comercios,
            trabajando con responsabilidad, prolijidad y compromiso en cada
            instalación.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Las buenas prácticas hacen a la confianza del cliente, y mi mayor
            objetivo es convertirme en una buena recomendación.
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-sky-700">
            Áreas de trabajo
          </h3>

          <ul className="mt-4 space-y-3 text-slate-200">
            <li>Electricidad domiciliaria</li>
            <li>Sistemas de seguridad electrónica</li>
            <li>Instalación de aires acondicionados</li>
            <li>Reparación de aires acondicionados</li>
            <li>Mantenimiento y asesoramiento técnico</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;