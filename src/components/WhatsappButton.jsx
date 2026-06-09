function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5491162623005?text=Hola%20Gustavo,%20quiero%20consultar%20por%20un%20presupuesto."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-50 right-10 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 p-3 shadow-lg transition hover:scale-110 hover:bg-emerald-600 md:h-16 md:w-16"
    >
      <img
        src="/wapp.svg"
        alt="WhatsApp"
        className="h-full w-full object-contain"
      />
    </a>
  );
}

export default WhatsappButton;