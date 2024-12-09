//Terminal: yarn start

import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./App.css";

function App() {
  const [lng, setLng] = useState(""); // Längengrad
  const [lat, setLat] = useState(""); // Breitengrad
  const [result, setResult] = useState(""); // Transformationsergebnis
  const [copyright, setCopyright] = useState("");
  const [version, setVersion] = useState("");

  const transformCoordinates = async () => {
    try {
      const antwort = await axios.get("http://127.0.0.1:8000/wgs84lv95", {
        params: { lng: parseFloat(lng), lat: parseFloat(lat) },
      });
      setResult(
        `Easting: ${antwort.data.east}, Northing: ${antwort.data.north}`
      );
      setCopyright("© 2024");
      setVersion("v1.0");
    } catch (error) {
      console.error("Fehler bei der Anfrage:", error);
      setResult("Fehler bei der Koordinatentransformation");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        WGS84 zu LV95 Koordinatentransformation
      </Typography>
      <TextField
        label="Längengrad (lng)"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        type="number"
        margin="normal"
        fullWidth
        placeholder="z. B. 8.5432"
      />
      <TextField
        label="Breitengrad (lat)"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        type="number"
        margin="normal"
        fullWidth
        placeholder="z. B. 47.3769"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={transformCoordinates}
        style={{ marginTop: "20px" }}
      >
        Umwandeln
      </Button>
      <Typography variant="h5" style={{ marginTop: "20px", color: "blue" }}>
        {result}
      </Typography>
      <Typography variant="body2" style={{ marginTop: "40px" }}>
        {copyright}
      </Typography>
      <Typography variant="body2">{version}</Typography>
    </Container>
  );
}

export default App;
