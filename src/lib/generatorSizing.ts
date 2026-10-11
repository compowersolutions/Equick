// Load presets and maths for the generator sizing tool.
// Watt figures are typical running values; startFactor is the inrush
// multiple for motor loads (compressors, pumps) when they switch on.

export type LoadPreset = {
  id: string;
  name: string;
  watts: number;
  startFactor?: number;
  group: "Home" | "Office & shop" | "Pumps & motors";
};

export const loadPresets: LoadPreset[] = [
  { id: "led", name: "LED lights (each)", watts: 10, group: "Home" },
  { id: "fridge", name: "Fridge", watts: 150, startFactor: 3, group: "Home" },
  { id: "freezer", name: "Chest freezer", watts: 200, startFactor: 3, group: "Home" },
  { id: "tv", name: "TV + decoder", watts: 150, group: "Home" },
  { id: "router", name: "Wi-Fi router", watts: 15, group: "Home" },
  { id: "kettle", name: "Kettle", watts: 2000, group: "Home" },
  { id: "microwave", name: "Microwave", watts: 1200, group: "Home" },
  { id: "stove", name: "Stove plate (each)", watts: 1500, group: "Home" },
  { id: "geyser", name: "Geyser", watts: 3000, group: "Home" },
  { id: "iron", name: "Iron", watts: 1000, group: "Home" },
  { id: "washer", name: "Washing machine", watts: 500, startFactor: 2.5, group: "Home" },
  { id: "ac12", name: "Air-con 12 000 BTU", watts: 1200, startFactor: 3, group: "Home" },

  { id: "pc", name: "Desktop computer", watts: 200, group: "Office & shop" },
  { id: "laptop", name: "Laptop", watts: 65, group: "Office & shop" },
  { id: "printer", name: "Laser printer", watts: 600, group: "Office & shop" },
  { id: "pos", name: "POS till", watts: 100, group: "Office & shop" },
  { id: "server", name: "Server rack", watts: 1500, group: "Office & shop" },
  { id: "ac24", name: "Air-con 24 000 BTU", watts: 2400, startFactor: 3, group: "Office & shop" },
  { id: "display", name: "Display fridge", watts: 400, startFactor: 3, group: "Office & shop" },
  { id: "coldroom", name: "Cold room", watts: 3000, startFactor: 3, group: "Office & shop" },

  { id: "bh075", name: "Borehole pump 0.75 kW", watts: 750, startFactor: 4, group: "Pumps & motors" },
  { id: "bh15", name: "Borehole pump 1.5 kW", watts: 1500, startFactor: 4, group: "Pumps & motors" },
  { id: "bh3", name: "Borehole pump 3 kW", watts: 3000, startFactor: 4, group: "Pumps & motors" },
  { id: "bh55", name: "Pump / motor 5.5 kW", watts: 5500, startFactor: 4, group: "Pumps & motors" },
  { id: "m11", name: "Motor 11 kW", watts: 11000, startFactor: 4, group: "Pumps & motors" },
  { id: "welder", name: "Welding machine", watts: 5000, group: "Pumps & motors" },
];

export const STANDARD_KVA = [
  10, 13, 15, 20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 350, 400, 500, 650, 800, 1000, 1250,
  1500, 2000, 2500, 3000,
];

const POWER_FACTOR = 0.8;
const HEADROOM = 1.25; // keep the set below ~80% load for long life

export type LineItem = { name: string; watts: number; qty: number; startFactor?: number };

export function sizeGenerator(items: LineItem[]) {
  const active = items.filter((i) => i.qty > 0 && i.watts > 0);
  const runningW = active.reduce((sum, i) => sum + i.watts * i.qty, 0);
  // Worst case: the biggest motor starts while everything else is running
  const surgeW = active.reduce((max, i) => Math.max(max, i.watts * ((i.startFactor ?? 1) - 1)), 0);
  const peakW = runningW + surgeW;
  const neededKva = Math.max((runningW * HEADROOM) / POWER_FACTOR, peakW / POWER_FACTOR) / 1000;
  const recommended = STANDARD_KVA.find((k) => k >= neededKva) ?? null;
  return {
    runningKw: runningW / 1000,
    peakKw: peakW / 1000,
    neededKva,
    recommendedKva: recommended,
    hasMotors: active.some((i) => (i.startFactor ?? 1) > 1),
  };
}
