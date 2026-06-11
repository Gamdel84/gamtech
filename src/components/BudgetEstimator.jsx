import { useState } from "react";

const tasks = [
  {
    id: "reparacion-boca",
    category: "Electricidad",
    name: "Reparación de boca de electricidad",
    type: "fixed",
    price: 20000,
  },
  {
    id: "instalacion-boca",
    category: "Electricidad",
    name: "Instalación de boca de electricidad",
    type: "fixed",
    price: 35000,
  },
  {
    id: "termica",
    category: "Electricidad",
    name: "Agregado de térmica",
    type: "fixed",
    price: 25000,
  },
  {
    id: "disyuntor",
    category: "Electricidad",
    name: "Agregado de disyuntor",
    type: "fixed",
    price: 25000,
  },
  {
    id: "ventilador-techo",
    category: "Electricidad",
    name: "Instalación de ventilador de techo",
    type: "fixed",
    price: 75000,
  },
  {
    id: "artefacto-iluminacion",
    category: "Electricidad",
    name: "Cambio o instalación de artefacto de iluminación",
    type: "fixed",
    price: 30000,
  },
  {
    id: "montaje-tv",
    category: "Montajes",
    name: "Montaje de TV en pared",
    type: "fixed",
    price: 40000,
  },
  {
    id: "cctv",
    category: "Seguridad electrónica",
    name: "Instalación de CCTV / cámaras de seguridad",
    type: "percentage",
    percentage: 0.4,
    referenceLabel: "Valor estimado de materiales + equipamiento",
  },
  {
    id: "alarma",
    category: "Seguridad electrónica",
    name: "Instalación de sistema de alarma",
    type: "percentage",
    percentage: 0.4,
    referenceLabel: "Valor estimado de materiales + equipamiento",
  },
  {
    id: "control-accesos",
    category: "Seguridad electrónica",
    name: "Instalación de control de accesos",
    type: "percentage",
    percentage: 0.4,
    referenceLabel: "Valor estimado de materiales + equipamiento",
  },
  {
    id: "aire-acondicionado",
    category: "Climatización",
    name: "Instalación de aire acondicionado",
    type: "percentage",
    percentage: 0.4,
    referenceLabel: "Valor estimado del equipo",
  },
  {
    id: "calculo-termico",
    category: "Climatización",
    name: "Cálculo térmico y asesoramiento técnico: SIN CARGO",
    type: "fixed",
    price: 0,
  },
];

function BudgetEstimator() {
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0].id);
  const [quantity, setQuantity] = useState(1);
  const [hasMaterials, setHasMaterials] = useState("yes");
  const [notes, setNotes] = useState("");
  const [budgetItems, setBudgetItems] = useState([]);
  const [referenceValue, setReferenceValue] = useState("");

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const total = budgetItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const minTotal = Math.round(total * 0.9);
  const maxTotal = Math.round(total * 1.15);

  function formatCurrency(value) {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  }

  function handleAddTask(event) {
    event.preventDefault();

    if (!selectedTask || quantity < 1) return;
    if (selectedTask.type === "percentage" && Number(referenceValue) <= 0) {
      alert("Ingresá un valor estimado para calcular esta tarea.");
      return;
    }

    const unitPrice =
      selectedTask.type === "percentage"
        ? Number(referenceValue) * selectedTask.percentage
        : selectedTask.price;

    const newItem = {
      id: crypto.randomUUID(),
      taskId: selectedTask.id,
      category: selectedTask.category,
      name: selectedTask.name,
      type: selectedTask.type,
      price: unitPrice,
      quantity: Number(quantity),
      hasMaterials,
      referenceValue: selectedTask.type === "percentage" ? Number(referenceValue) : null,
      notes: notes.trim(),
    };

    setBudgetItems([...budgetItems, newItem]);

    setQuantity(1);
    setHasMaterials("yes");
    setNotes("");
    setReferenceValue("");
  }

  function handleRemoveTask(id) {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  }

  function buildWhatsAppMessage() {
    const taskList = budgetItems
      .map((item) => {
        const materialsText =
          item.hasMaterials === "yes"
            ? "El cliente indica que cuenta con materiales."
            : "Materiales a cotizar según necesidad del trabajo.";

        const referenceText =
          item.type === "percentage"
            ? " Estimación calculada sobre valor de referencia informado."
            : "";

        const notesText = item.notes ? ` Observaciones: ${item.notes}` : "";

        return `- ${item.quantity} x ${item.name}. ${materialsText}${referenceText}${notesText}`;
      })
      .join("\n");

    return `Hola Gustavo, quiero consultar por este presupuesto estimativo:\n\n${taskList}\n\nEstimación orientativa: entre ${formatCurrency(
      minTotal
    )} y ${formatCurrency(
      maxTotal
    )}.\n\nEntiendo que el valor final puede variar según materiales, estado de la instalación, accesibilidad y evaluación técnica previa.`;
  }

  const whatsappUrl = `https://wa.me/5491162623005?text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  return (
    <section
      id="presupuesto"
      className="scroll-mt-32 bg-slate-900 px-6 py-14 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Estimador de presupuesto
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-300">
          Calcula un presupuesto estimativo para tus necesidades. Tené en cuenta que puede estar sujeto a variaciones, segun materiales necesarios y dificultades por imprevistos y estructuras. Si lo que necesitas no se encuentra, podés consultar por whatsapp, directamente.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <form
            onSubmit={handleAddTask}
            className="rounded-xl bg-white p-6 text-slate-900 shadow-md"
          >
            <h3 className="text-xl font-bold">Agregar tarea</h3>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Tarea a realizar
              </label>

              <select
                value={selectedTaskId}
                onChange={(event) => setSelectedTaskId(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-700"
              >
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.category} - {task.name}
                  </option>
                ))}
              </select>
              {selectedTask?.type === "percentage" && (
                <div className="mt-4">
                  <label className="text-sm font-semibold text-slate-700">
                    {selectedTask.referenceLabel}
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={referenceValue}
                    onChange={(event) => setReferenceValue(event.target.value)}
                    placeholder="Ej: 500000"
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-700"
                  />

                  <p className="mt-2 text-sm text-slate-500">
                    Este valor no se muestra como precio unitario; se usa solo para calcular la
                    estimación de mano de obra.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Cantidad
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-700"
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                ¿El cliente cuenta con los materiales?
              </label>

              <select
                value={hasMaterials}
                onChange={(event) => setHasMaterials(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-700"
              >
                <option value="yes">Sí, cuenta con materiales</option>
                <option value="no">
                  No, requiere cotización de materiales
                </option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Sugerencias u observaciones
              </label>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows="4"
                placeholder="Ej: ubicación del trabajo, detalles del ambiente, urgencia, medidas aproximadas..."
                className="mt-1 w-full resize-none rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-700"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              Agregar al presupuesto
            </button>
          </form>

          <div className="rounded-xl bg-white p-6 text-slate-900 shadow-md">
            <h3 className="text-xl font-bold">Detalle estimado</h3>

            {budgetItems.length === 0 ? (
              <p className="mt-4 rounded-md bg-slate-100 p-4 text-slate-600">
                Todavía no agregaste tareas.
              </p>
            ) : (
              <>
                <div className="mt-4 space-y-4">
                  {budgetItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-sky-700">
                            {item.name}
                          </h4>

                          <p className="mt-1 text-sm text-slate-600">
                            Cantidad: {item.quantity}
                          </p>

                          {item.type === "percentage" && (
                            <p className="mt-1 text-sm text-slate-600">
                              Estimación calculada sobre valor de referencia informado.
                            </p>
                          )}

                          <p className="mt-1 text-sm text-slate-600">
                            {item.hasMaterials === "yes"
                              ? "El cliente indica que cuenta con materiales."
                              : "Materiales a cotizar según necesidad del trabajo."}
                          </p>

                          {item.notes && (
                            <p className="mt-2 text-sm text-slate-500">
                              Observaciones: {item.notes}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemoveTask(item.id)}
                          className="rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Quitar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">
                    Estimación orientativa
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-400">
                    Entre {formatCurrency(minTotal)} y {formatCurrency(maxTotal)}
                  </p>

                  <p className="mt-3 text-sm text-slate-300">
                    El valor final puede variar según materiales necesarios,
                    estado de la instalación, accesibilidad, complejidad y
                    evaluación técnica previa.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  className="mt-6 inline-block w-full rounded-md bg-emerald-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-600"
                >
                  Consultar por WhatsApp
                </a>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-slate-800 p-5 text-slate-200">
          <h3 className="font-bold text-sky-400">Climatización</h3>

          <p className="mt-2 text-sm leading-relaxed">
            CÁLCULO TËRMICO: ponete en contacto y acordamos una visita para calcular qué equipo te conviene más para climatizar tu espacio.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BudgetEstimator;