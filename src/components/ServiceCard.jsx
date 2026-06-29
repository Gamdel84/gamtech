const ServiceCard = ({ title, description }) => {
  return (
    <article className="rounded-xl bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold text-sky-700">{title}</h3>

      <p className="mt-3 text-slate-700">{description}</p>
    </article>
  );
};

export default ServiceCard;
