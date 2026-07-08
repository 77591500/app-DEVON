document.addEventListener("DOMContentLoaded", () => {
// Simulación interactiva de métricas de infraestructura
setInterval(() => {
const cpuUsage = Math.floor(Math.random() * (45 - 12 + 1)) + 12; // Carga simulada constante
const ramUsage = (Math.random() * (24.5 - 8.2) + 8.2).toFixed(1);
document.getElementById("cpu-value").innerText = `${cpuUsage}%`;
document.getElementById("cpu-bar").style.width = `${cpuUsage}%`;
document.getElementById("ram-value").innerText = `${ramUsage} GB / 128 GB`;
document.getElementById("ram-bar").style.style.width = `${(parseFloat(ramUsage)/128)*100}%`;
}, 2000);
});
