import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    rating: "5",
    comment: "",
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function getReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, service, rating, comment, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar opiniones:", error.message);
    } else {
      setReviews(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    getReviews();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Enviando opinión...", formData);

    setSending(true);
    setMessage("");

    try {
      const { data, error } = await supabase.from("reviews").insert([
        {
          name: formData.name.trim(),
          service: formData.service.trim(),
          rating: Number(formData.rating),
          comment: formData.comment.trim(),
          approved: false,
        },
      ]);

      console.log("Respuesta Supabase:", { data, error });

      if (error) {
        console.error("Error al enviar opinión:", error.message);
        setMessage("No se pudo enviar la opinión. Intentá nuevamente.");
        return;
      }

      setMessage(
        "Gracias por dejar tu opinión. Será publicada cuando sea aprobada."
      );

      setFormData({
        name: "",
        service: "",
        rating: "5",
        comment: "",
      });
    } catch (error) {
      console.error("Error inesperado:", error);
      setMessage("Ocurrió un error inesperado. Intentá nuevamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
    <section id="opiniones" className="scroll-mt-32 bg-slate-100 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Opiniones de clientes
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-700">
          Comentarios de personas que confiaron en GAM Soluciones Técnicas.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            {loading ? (
              <p className="text-center text-slate-700">
                Cargando opiniones...
              </p>
            ) : reviews.length === 0 ? (
              <p className="rounded-xl bg-white p-6 text-center text-slate-700 shadow-md">
                Todavía no hay opiniones publicadas.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-xl bg-white p-6 shadow-md"
                  >
                    <div className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      <span className="text-slate-300">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>

                    <p className="mt-4 text-lg text-slate-700">
                      “{review.comment}”
                    </p>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <h3 className="font-bold text-sky-700">{review.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {review.service}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Dejá tu opinión
            </h3>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Nombre
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Servicio realizado
              </label>

              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                placeholder="Electricidad, cámaras, aire acondicionado..."
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Calificación
              </label>

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              >
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Comentario
              </label>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-md bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {sending ? "Enviando..." : "Enviar opinión"}
            </button>

            {message && (
              <p className="mt-4 text-center text-sm font-medium text-slate-600">
                {message}
              </p>
            )}

            
          </form>
        </div>
      </div>
    </section>
    <hr className="my-0.2 border-slate-700" />
    </>
  );
}

export default Reviews;