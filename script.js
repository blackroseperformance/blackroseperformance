const config = window.BRP_CONFIG;
const grid = document.querySelector("#pricing-grid");
const termSelect = document.querySelector("#term");
const money = value => new Intl.NumberFormat("en-US", {style:"currency", currency:config.currency, maximumFractionDigits:0}).format(value);

function getPricing(program, term) {
  const discount = program.discounts[term] || 0;
  const total = program.monthly * term * (1 - discount);
  const effectiveMonthly = total / term;
  return {discount, total, effectiveMonthly};
}

function renderPricing() {
  const term = Number(termSelect.value);
  grid.innerHTML = config.programs.map(program => {
    const pricing = getPricing(program, term);
    const discountLabel = pricing.discount ? `${Math.round(pricing.discount * 100)}% savings` : "Flexible monthly";
    const paymentLabel = term === 1 ? "per month" : `${term}-month prepaid`;
    const oldTotal = program.monthly * term;
    const paypal = program.paypalUrl || "#";
    return `
      <article class="price-card ${program.featured ? "featured" : ""}">
        ${program.featured ? '<div class="recommended">Recommended</div>' : ""}
        <p class="card-kicker">${program.shortName}</p>
        <h3>${program.name}</h3>
        <p class="card-description">${program.description}</p>
        <div class="price">${money(pricing.effectiveMonthly)}<small>/month</small></div>
        <p class="billing">${paymentLabel} · ${discountLabel}</p>
        ${term > 1 ? `<p class="compare">Regular total: <s>${money(oldTotal)}</s></p>` : '<p class="compare">&nbsp;</p>'}
        <ul>${program.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
        <a class="button ${program.featured ? "button-light" : ""}" href="${paypal}" target="_blank" rel="noopener">Enroll ↗</a>
      </article>`;
  }).join("");
}

termSelect.addEventListener("change", renderPricing);
renderPricing();
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector(".menu-button").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".nav").classList.remove("open");
}));

document.querySelector("#onboarding-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.target);
  const subject = encodeURIComponent("Black Rose Performance Coaching Inquiry");
  const body = encodeURIComponent([...form.entries()].map(([key, value]) => `${key}: ${value}`).join("\n\n"));
  window.location.href = `mailto:${config.contactEmail}?subject=${subject}&body=${body}`;
});