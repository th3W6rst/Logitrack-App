// src/screens/MapScreen.js
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// carrega CSS do Leaflet via CDN (evita dor de cabeça com import de CSS no Metro)
if (Platform.OS === 'web') {
  const id = 'leaflet-css';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
}

// ícone padrão do Leaflet (garante que os pins apareçam no CDN)
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// mapeia “ultimaLocalizacao” -> coordenadas (fake)
// ajuste as coords se quiser (centrei em SP só pra exemplo)
const localToCoords = (ultimaLocalizacao) => {
  const base = { lat: -23.55052, lng: -46.633308 }; // Centro de SP
  const table = {
    'Doca 3':           { lat: base.lat + 0.005, lng: base.lng + 0.005 },
    'Oficina':          { lat: base.lat - 0.004, lng: base.lng + 0.003 },
    'Corredor B':       { lat: base.lat + 0.002, lng: base.lng - 0.004 },
    'Armazém 2':        { lat: base.lat - 0.003, lng: base.lng - 0.003 },
  };
  return table[ultimaLocalizacao] || base;
};

export default function MapScreen() {
  const [robots, setRobots] = useState(null);
  const [error, setError] = useState(null);

  // URL da API vem do .env (EXPO_PUBLIC_API_URL)
  const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081/api';

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${API}/robos`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active) setRobots(data);
      } catch (e) {
        if (active) setError(String(e));
      }
    })();
    return () => { active = false; };
  }, [API]);

  const center = useMemo(() => ({ lat: -23.55052, lng: -46.633308 }), []);

  if (Platform.OS !== 'web') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text>O mapa com Leaflet está disponível apenas no Expo Web neste projeto.</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'red' }}>Erro ao carregar robôs: {error}</Text>
      </View>
    );
  }

  if (!robots) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Carregando robôs...</Text>
      </View>
    );
  }

  // container full-screen
  return (
    <View style={{ flex: 1 }}>
      <div style={{ height: '100vh', width: '100%' }}>
        <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {robots.map((r) => {
            const pos = localToCoords(r.ultimaLocalizacao);
            return (
              <Marker key={r.id} position={[pos.lat, pos.lng]} icon={defaultIcon}>
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <b>{r.nome}</b><br />
                    Status: {r.status}<br />
                    Bateria: {r.bateria}%<br />
                    Local: {r.ultimaLocalizacao}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </View>
  );
}
