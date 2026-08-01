(() => {
  const BUTTON_SELECTOR = "[data-admin-view-report], [data-admin-report-viewer]";
  const DIALOG_ID = "adminReportViewerFallbackDialog";
  const STYLE_ID = "adminReportViewerFallbackStyles";

  function ensureStyles() {
    if (document.querySelector(`#${STYLE_ID}`)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .admin-action.report-view-button {
        border-color: rgba(220, 38, 38, 0.25);
        background: #dc2626;
        color: #ffffff;
        box-shadow: 0 10px 20px rgba(220, 38, 38, 0.16);
      }

      .admin-action.report-view-button:hover {
        color: #ffffff;
        filter: brightness(0.96);
      }

      .admin-report-viewer-fallback {
        width: min(680px, calc(100% - 28px));
        border: 0;
        border-radius: 24px;
        padding: 0;
        background: transparent;
      }

      .admin-report-viewer-fallback::backdrop {
        background: rgba(17, 17, 17, 0.46);
        backdrop-filter: blur(6px);
      }

      .admin-report-viewer-card {
        position: relative;
        display: grid;
        gap: 18px;
        border-radius: 28px;
        padding: 28px;
        background: #ffffff;
        box-shadow: 0 30px 90px rgba(17, 17, 17, 0.24);
      }

      .admin-report-viewer-card > span {
        color: #dc2626;
        font-size: 0.78rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .admin-report-viewer-card h2,
      .admin-report-viewer-card p {
        margin: 0;
      }

      .admin-report-viewer-close {
        position: absolute;
        top: 14px;
        right: 14px;
        display: grid;
        width: 36px;
        height: 36px;
        place-items: center;
        border: 1px solid #e5e7eb;
        border-radius: 50%;
        background: #ffffff;
        color: #111111;
        cursor: pointer;
        font-size: 1.35rem;
        line-height: 1;
      }

      .admin-report-viewer-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .admin-report-viewer-meta span {
        display: inline-flex;
        min-height: 28px;
        align-items: center;
        border: 1px solid #e5e7eb;
        border-radius: 999px;
        padding: 0 10px;
        background: #f8fafc;
        color: #64748b;
        font-size: 12px;
        font-weight: 800;
      }

      .admin-report-viewer-section {
        display: grid;
        gap: 8px;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 16px;
        background: #ffffff;
      }

      .admin-report-viewer-section h3 {
        margin: 0;
        color: #111111;
        font-size: 15px;
        font-weight: 950;
      }

      .admin-report-viewer-section p {
        color: #111827;
        line-height: 1.65;
        white-space: pre-wrap;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureDialog() {
    let dialog = document.querySelector(`#${DIALOG_ID}`);
    if (dialog) return dialog;

    dialog = document.createElement("dialog");
    dialog.id = DIALOG_ID;
    dialog.className = "admin-report-viewer-fallback";
    dialog.innerHTML = `
      <article class="admin-report-viewer-card">
        <button class="admin-report-viewer-close" type="button" aria-label="Cerrar">x</button>
        <span id="adminReportViewerType">Reporte</span>
        <h2 id="adminReportViewerTitle">Reporte</h2>
        <div class="admin-report-viewer-meta" id="adminReportViewerMeta"></div>
        <section class="admin-report-viewer-section">
          <h3>Lo que dice el reporte</h3>
          <p id="adminReportViewerDescription">Sin descripcion.</p>
        </section>
      </article>
    `;
    document.body.appendChild(dialog);
    dialog.querySelector(".admin-report-viewer-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    return dialog;
  }

  function openReportFromRow(row) {
    const dialog = ensureDialog();
    const title = row.querySelector(".admin-row-title strong")?.textContent?.trim() || "Reporte";
    const status = row.querySelector(".admin-status")?.textContent?.trim() || "Sin estado";
    const description = row.querySelector(".admin-row-main p")?.textContent?.trim() || "Sin descripcion.";
    const meta = row.querySelector(".admin-row-main small")?.textContent?.trim() || "";
    const [category = "Reporte", date = ""] = meta.split("·").map((item) => item.trim());

    dialog.querySelector("#adminReportViewerType").textContent = category || "Reporte";
    dialog.querySelector("#adminReportViewerTitle").textContent = title;
    dialog.querySelector("#adminReportViewerDescription").textContent = description;
    dialog.querySelector("#adminReportViewerMeta").innerHTML = [status && `Estado: ${status}`, category && `Tipo: ${category}`, date && `Fecha: ${date}`]
      .filter(Boolean)
      .map((item) => `<span>${item}</span>`)
      .join("");

    dialog.showModal();
  }

  function enhanceReports() {
    const list = document.querySelector("#adminReportsList");
    if (!list) return;

    list.querySelectorAll(".admin-row").forEach((row) => {
      if (row.querySelector(BUTTON_SELECTOR)) return;

      const actions = row.querySelector(".admin-row-actions");
      if (!actions) return;

      const button = document.createElement("button");
      button.className = "admin-action report-view-button";
      button.type = "button";
      button.dataset.adminReportViewer = "true";
      button.textContent = "Ver reporte";
      actions.insertBefore(button, actions.firstChild);
    });
  }

  function init() {
    ensureStyles();
    ensureDialog();
    enhanceReports();

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-admin-report-viewer]");
      if (!button) return;

      const row = button.closest(".admin-row");
      if (row) openReportFromRow(row);
    });

    const observer = new MutationObserver(enhanceReports);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
