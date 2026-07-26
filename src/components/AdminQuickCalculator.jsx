import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";

const MATERIAL_MARKUP = 0.15;

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
};

const createEmptyMaterial = () => {
  return {
    id: crypto.randomUUID(),
    name: "",
    price: "",
  };
};

const AdminQuickCalculator = () => {
  const [materials, setMaterials] = useState([createEmptyMaterial()]);
  const [labor, setLabor] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [focusMaterialId, setFocusMaterialId] = useState(null);

  const nameInputRefs = useRef({});
  const priceInputRefs = useRef({});

  const subtotalMaterials = materials.reduce((accumulator, material) => {
    return accumulator + (Number(material.price) || 0);
  }, 0);

  const materialMarkupAmount = subtotalMaterials * MATERIAL_MARKUP;
  const laborAmount = Number(labor) || 0;
  const total = subtotalMaterials + materialMarkupAmount + laborAmount;

  useEffect(() => {
    if (!focusMaterialId) return;

    const input = nameInputRefs.current[focusMaterialId];

    if (input) {
      input.focus();
    }

    setFocusMaterialId(null);
  }, [focusMaterialId, materials]);

  const handleMaterialChange = (id, field, value) => {
    setMaterials((currentMaterials) => {
      return currentMaterials.map((material) => {
        if (material.id === id) {
          return {
            ...material,
            [field]: value,
          };
        }

        return material;
      });
    });

    setCopyMessage("");
  };

  const handleAddMaterial = () => {
    const newMaterial = createEmptyMaterial();

    setMaterials((currentMaterials) => [...currentMaterials, newMaterial]);
    setFocusMaterialId(newMaterial.id);
    setCopyMessage("");
  };

  const handleRemoveMaterial = (id) => {
    setMaterials((currentMaterials) => {
      if (currentMaterials.length === 1) {
        return currentMaterials;
      }

      return currentMaterials.filter((material) => material.id !== id);
    });

    setCopyMessage("");
  };

  const handleClear = () => {
    const emptyMaterial = createEmptyMaterial();

    setMaterials([emptyMaterial]);
    setLabor("");
    setCopyMessage("");
    setFocusMaterialId(emptyMaterial.id);
  };

  const handleNameKeyDown = (event, id) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const priceInput = priceInputRefs.current[id];

    if (priceInput) {
      priceInput.focus();
    }
  };

  const handlePriceKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    handleAddMaterial();
  };

  const buildBudgetText = () => {
    const materialsText = materials
      .filter((material) => material.name.trim() || Number(material.price))
      .map((material) => {
        return `- ${material.name || "Material"}: ${formatCurrency(
          Number(material.price) || 0
        )}`;
      })
      .join("\n");

    return `Presupuesto estimativo - GAM Soluciones Técnicas

Materiales:
${materialsText || "Sin materiales cargados."}

Mano de obra: ${formatCurrency(laborAmount)}

Total estimado: ${formatCurrency(total)}

El valor puede variar según condiciones reales de instalación, disponibilidad y precio actualizado de materiales.`;
  };

const handleCopyBudget = async () => {
  const budgetText = buildBudgetText();

  try {
    await navigator.clipboard.writeText(budgetText);
    setCopyMessage("Presupuesto copiado.");
  } catch (error) {
    console.error("Error al copiar presupuesto:", error);
    setCopyMessage("No se pudo copiar automáticamente.");
  }
};

const getImageBase64 = async (imagePath) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const handleDownloadPdf = async () => {
  const doc = new jsPDF();

  const today = new Date().toLocaleDateString("es-AR");

  const validMaterials = materials.filter((material) => {
    return material.name.trim() || Number(material.price);
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  let y = 18;

  const drawPageFrame = () => {
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.6);
    doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

    doc.setDrawColor(14, 116, 144);
    doc.setLineWidth(1.2);
    doc.line(margin, margin + 28, pageWidth - margin, margin + 28);
  };

  const drawFooter = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);

    doc.text(
      "Presupuesto estimativo sujeto a revisión técnica, disponibilidad y precio actualizado de materiales.",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  };

  drawPageFrame();

  try {
  const logoBase64 = await getImageBase64("/logo.png");

  const logoProperties = doc.getImageProperties(logoBase64);

  const logoMaxWidth = 34;
  const logoMaxHeight = 22;

  const logoRatio = logoProperties.width / logoProperties.height;

  let logoWidth = logoMaxWidth;
  let logoHeight = logoWidth / logoRatio;

  if (logoHeight > logoMaxHeight) {
    logoHeight = logoMaxHeight;
    logoWidth = logoHeight * logoRatio;
  }

  doc.addImage(logoBase64, "PNG", 20, 18, logoWidth, logoHeight);
} catch (error) {
  console.error("No se pudo cargar el logo:", error);
}

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(15, 23, 42);
  doc.text("GAM Soluciones Tecnicas", 55, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text("Electricidad · Seguridad electrónica · Climatización", 55, y + 14);
  doc.text("Instalaciones, reparaciones, mantenimiento y asesoramiento técnico", 55, y + 20);

  y = 54;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(20, y, pageWidth - 40, 27, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Presupuesto estimativo", 25, y + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text(`Fecha: ${today}`, 25, y + 17);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(14, 116, 144);
  doc.text("GAM Soluciones Técnicas", pageWidth - 25, y + 9, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text("WhatsApp: +54 9 11 6262-3005", pageWidth - 25, y + 17, {
    align: "right",
  });

  y += 43;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Detalle de materiales considerados", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  if (validMaterials.length === 0) {
    doc.text("Sin materiales detallados.", 24, y);
    y += 7;
  } else {
    validMaterials.forEach((material) => {
      const materialName = material.name.trim() || "Material";

      const line = `- ${materialName}`;
      const lines = doc.splitTextToSize(line, pageWidth - 48);

      if (y > pageHeight - 45) {
        drawFooter();
        doc.addPage();
        y = 25;
        drawPageFrame();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text("Detalle de materiales considerados", 20, y);

        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85);
      }

      doc.text(lines, 24, y);
      y += lines.length * 6;
    });
  }

  y += 8;

  if (y > pageHeight - 70) {
    drawFooter();
    doc.addPage();
    y = 25;
    drawPageFrame();
  }

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(20, y, pageWidth - 40, 28, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Materiales + mano de obra", 25, y + 11);

  doc.setFontSize(17);
  doc.text(formatCurrency(total), pageWidth - 25, y + 18, {
    align: "right",
  });

  y += 42;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Servicios", 20, y);

  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const servicesText =
    "Electricidad domiciliaria y comercial · Seguridad electrónica · Cámaras · Alarmas · Control de accesos · Climatización · Instalación y mantenimiento de aire acondicionado";

  const serviceLines = doc.splitTextToSize(servicesText, pageWidth - 40);
  doc.text(serviceLines, 20, y);

  drawFooter();

  doc.save(`presupuesto-gam-${Date.now()}.pdf`);
};

  return (    
    <section className="mt-10 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-slate-900">
        Formulario de presupuesto
      </h2>      

      <div className="mt-6 space-y-4">
        {materials.map((material, index) => (
          <div
            key={material.id}
            className="grid grid-cols-1 gap-3 rounded-xl bg-slate-100 p-4 md:grid-cols-[1fr_180px_auto]"
          >
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Material {index + 1}
              </label>

              <input
                ref={(input) => {
                  nameInputRefs.current[material.id] = input;
                }}
                type="text"
                value={material.name}
                onChange={(event) =>
                  handleMaterialChange(material.id, "name", event.target.value)
                }
                onKeyDown={(event) => handleNameKeyDown(event, material.id)}
                placeholder="Ej: cable, térmica, cámara, caño..."
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Precio
              </label>

              <input
                ref={(input) => {
                  priceInputRefs.current[material.id] = input;
                }}
                type="number"
                min="0"
                value={material.price}
                onChange={(event) =>
                  handleMaterialChange(material.id, "price", event.target.value)
                }
                onKeyDown={handlePriceKeyDown}
                placeholder="Ej: 25000"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => handleRemoveMaterial(material.id)}
                disabled={materials.length === 1}
                className="w-full rounded-md bg-red-100 px-4 py-2 font-semibold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddMaterial}
        className="mt-4 rounded-md bg-sky-700 px-5 py-2 font-semibold text-white transition hover:bg-sky-800"
      >
        Agregar material
      </button>

      <div className="mt-6">
        <label className="text-sm font-semibold text-slate-700">
          Mano de obra
        </label>

        <input
          type="number"
          min="0"
          value={labor}
          onChange={(event) => {
            setLabor(event.target.value);
            setCopyMessage("");
          }}
          placeholder="Ej: 80000"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-700"
        />
      </div>

      <div className="mt-6 rounded-xl bg-slate-900 p-5 text-white">
        <div className="flex justify-between gap-4 text-sm text-slate-300">
          <span>Subtotal materiales: </span>
          <strong>{formatCurrency(subtotalMaterials)}</strong>
        </div>

        <div className="mt-2 flex justify-between gap-4 text-sm text-slate-300">
          <span>Mano de obra: </span>
          <strong>{formatCurrency(laborAmount)}</strong>
        </div>

        <div className="mt-4 flex justify-between gap-4 border-t border-slate-700 pt-4 text-xl font-bold">
          <span>Total: </span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleCopyBudget}
          className="rounded-md bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Copiar presupuesto
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="rounded-md bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
        >
          Descargar PDF
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="rounded-md bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
        >
          Limpiar
        </button>
      </div>

      {copyMessage && (
        <p className="mt-3 text-sm font-medium text-slate-600">
          {copyMessage}
        </p>
      )}
    </section>
  );
};

export default AdminQuickCalculator;