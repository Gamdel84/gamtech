import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AdminQuickCalculator from "../components/AdminQuickCalculator";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("es-AR");
  };

  const getReviews = async () => {
    setReviewsLoading(true);
    setAdminMessage("");

    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, service, rating, comment, approved, created_at")
      .order("created_at", { ascending: false });

    setReviewsLoading(false);

    if (error) {
      console.error("Error al cargar opiniones:", error.message);
      setAdminMessage("No se pudieron cargar las opiniones.");
      return;
    }

    setReviews(data);
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error al obtener usuario:", error.message);
      }

      setUser(data?.user ?? null);
      setCheckingSession(false);
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      getReviews();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("reviews-inserts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
        },
        (payload) => {
          const newReview = payload.new;

          setReviews((currentReviews) => {
            const alreadyExists = currentReviews.some(
              (review) => review.id === newReview.id
            );

            if (alreadyExists) {
              return currentReviews;
            }

            return [newReview, ...currentReviews];
          });

          setAdminMessage(`Nueva opinión recibida de ${newReview.name}.`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoginLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoginLoading(false);

    if (error) {
      console.error("Error al iniciar sesión:", error.message);
      setMessage("Email o contraseña incorrectos.");
      return;
    }

    setUser(data.user);
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      setAdminMessage("No se pudo cerrar sesión.");
      return;
    }

    setUser(null);
    setReviews([]);
    setAdminMessage("");
    navigate("/");
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar esta opinión?"
    );

    if (!confirmDelete) return;

    setAdminMessage("");

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar opinión:", error.message);
      setAdminMessage("No se pudo eliminar la opinión.");
      return;
    }

    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== id)
    );

    setAdminMessage("Opinión eliminada correctamente.");
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <p className="text-slate-700">Verificando sesión...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-slate-900">Panel admin</h1>

          <p className="mt-2 text-slate-600">
            Iniciá sesión para gestionar las opiniones publicadas.
          </p>

          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-700">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="mt-6 w-full rounded-md bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loginLoading ? "Ingresando..." : "Ingresar"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">
              {message}
            </p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Panel admin</h1>
            <p className="mt-2 text-slate-600">
              Sesión iniciada como {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-5 py-2 font-semibold text-white transition hover:bg-slate-700"
          >
            Cerrar sesión
          </button>
        </div>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Opiniones recibidas
              </h2>

              <p className="mt-2 text-slate-600">
                Administrá las opiniones publicadas en la landing.
              </p>
            </div>

            <button
              onClick={getReviews}
              className="rounded-md bg-sky-700 px-5 py-2 font-semibold text-white transition hover:bg-sky-800"
            >
              Actualizar opiniones
            </button>            
          </div>

          {adminMessage && (
            <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm font-medium text-slate-700">
              {adminMessage}
            </p>
          )}

          <div className="mt-6">
            {reviewsLoading ? (
              <p className="text-slate-600">Cargando opiniones...</p>
            ) : reviews.length === 0 ? (
              <p className="rounded-lg bg-slate-100 p-4 text-slate-600">
                No hay opiniones publicadas.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-sky-700">
                          {review.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {review.service}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(review.created_at)}
                        </p>

                        <div className="mt-3 text-yellow-500">
                          {"★".repeat(review.rating)}
                          <span className="text-slate-300">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </div>

                        <p className="mt-3 text-slate-700">
                          “{review.comment}”
                        </p>
                      </div>

                      <div className="flex gap-2 md:flex-col">
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <AdminQuickCalculator />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
