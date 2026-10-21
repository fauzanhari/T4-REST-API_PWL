import express from "express";
import { olahraga } from "./src/data/olahraga.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// Endpoint sambutan
app.get("/", (req, res) => {
  res.status(200).send("Halo dari REST API Olahraga Favorit!");
});

// GET semua data olahraga
app.get("/olahraga", (req, res) => {
  res.status(200).json({
    data: olahraga,
  });
});

// GET detail olahraga berdasarkan ID
app.get("/olahraga/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = olahraga.find((data) => data.id === id);

  if (!Number.isInteger(id) || id < 1 || !item) {
    return res.status(404).json({
      error: {
        pesan: "Data olahraga tidak ditemukan",
        kode: 404,
      },
    });
  }

  return res.status(200).json({
    data: item,
  });
});

// BONUS: DELETE olahraga berdasarkan ID
app.delete("/olahraga/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = olahraga.findIndex((data) => data.id === id);

  if (!Number.isInteger(id) || id < 1 || index === -1) {
    return res.status(404).json({
      error: {
        pesan: "Data olahraga tidak ditemukan",
        kode: 404,
      },
    });
  }

  olahraga.splice(index, 1);
  return res.status(204).send();
});

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error("Gagal menjalankan server:", err.message);
    process.exit(1);
  }
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Menampilkan error listen yang mungkin terjadi (misalnya port sedang dipakai).
server.on("error", (err) => {
  console.error("Gagal menjalankan server:", err.message);
  process.exit(1);
});
