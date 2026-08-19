import type { ResponsiveImageAsset } from "../types/media";

// Source photography is drawn from the GreenDawn Drive imagery supplied for the
// rebuild unless noted otherwise. Keeping the asset map separate means imagery
// can be swapped later without coupling file paths to presentation components.
export const homeMedia = {
  heroCharging: {
    sources: [
      { src: "/images/optimized/commercial-ev-charging-installation-480.webp", width: 480 },
      { src: "/images/optimized/commercial-ev-charging-installation-640.webp", width: 640 },
      { src: "/images/optimized/commercial-ev-charging-installation-960.webp", width: 960 },
      { src: "/images/optimized/commercial-ev-charging-installation-1440.webp", width: 1440 },
    ],
    width: 1440,
    height: 891,
  },
  wallChargers: {
    sources: [
      { src: "/images/optimized/commercial-ev-wall-chargers-480.webp", width: 480 },
      { src: "/images/optimized/commercial-ev-wall-chargers-800.webp", width: 800 },
      { src: "/images/optimized/commercial-ev-wall-chargers-1200.webp", width: 1200 },
    ],
    width: 1200,
    height: 900,
  },
  syncCharger: {
    sources: [
      { src: "/images/optimized/sync-commercial-ev-charger-480.webp", width: 480 },
      { src: "/images/optimized/sync-commercial-ev-charger-800.webp", width: 800 },
      { src: "/images/optimized/sync-commercial-ev-charger-1200.webp", width: 1200 },
    ],
    width: 1200,
    height: 1200,
  },
  chargerHardware: {
    sources: [
      { src: "/images/optimized/commercial-ev-charger-hardware-480.webp", width: 480 },
      { src: "/images/optimized/commercial-ev-charger-hardware-800.webp", width: 800 },
      { src: "/images/optimized/commercial-ev-charger-hardware-1200.webp", width: 1200 },
    ],
    width: 1200,
    height: 900,
  },
  electricalCapacity: {
    sources: [
      { src: "/images/optimized/commercial-ev-electrical-capacity-480.webp", width: 480 },
      { src: "/images/optimized/commercial-ev-electrical-capacity-720.webp", width: 720 },
      { src: "/images/optimized/commercial-ev-electrical-capacity-900.webp", width: 900 },
    ],
    width: 900,
    height: 900,
  },
  surveyDucting: {
    sources: [
      { src: "/images/optimized/ev-charging-ducting-survey-480.webp", width: 480 },
      { src: "/images/optimized/ev-charging-ducting-survey-768.webp", width: 768 },
    ],
    width: 768,
    height: 1024,
  },
  johnsonsCars: {
    sources: [
      { src: "/images/optimized/johnsons-cars-ev-charging-480.webp", width: 480 },
      { src: "/images/optimized/johnsons-cars-ev-charging-666.webp", width: 666 },
    ],
    width: 666,
    height: 466,
  },
  salvationArmy: {
    sources: [
      { src: "/images/optimized/salvation-army-ev-charging-480.webp", width: 480 },
      { src: "/images/optimized/salvation-army-ev-charging-666.webp", width: 666 },
    ],
    width: 666,
    height: 466,
  },
} satisfies Record<string, ResponsiveImageAsset>;
