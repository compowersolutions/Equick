import genAtSite from "@/assets/gen-at-site.jpg";
import genDelivery from "@/assets/project-generator-delivery.jpg";
import solarRoof from "@/assets/solar-rts.jpg";
import solarContainer from "@/assets/solar.jpg";
import distributionBoard from "@/assets/project-distribution-board.jpg";
import containerUnits from "@/assets/datacentre.jpg";
import borehole from "@/assets/borehole.jpg";

export type ProjectCategory = "Generators" | "Solar" | "Electrical" | "Water & pumps";

export type Project = {
  image: string;
  title: string;
  description: string;
  category: ProjectCategory;
  /** Optional, e.g. "Gaborone" — only fill in when accurate */
  location?: string;
};

// Real ComPower installation photos. To add a project: put the photo in
// src/assets (max ~1600px wide), import it above and add an entry here.
export const projects: Project[] = [
  {
    image: genAtSite,
    title: "20 kVA Perkins diesel generator",
    description: "Canopied standby generator supplied, installed and commissioned on a client site.",
    category: "Generators",
  },
  {
    image: genDelivery,
    title: "Standby generator delivery",
    description: "Silent-canopy diesel generator delivered and positioned ready for connection.",
    category: "Generators",
  },
  {
    image: solarRoof,
    title: "Rooftop solar PV array",
    description: "Tilt-mounted solar panels installed on a commercial corrugated roof.",
    category: "Solar",
  },
  {
    image: solarContainer,
    title: "Solar on containerised unit",
    description: "Solar panels mounted on a container structure for off-grid power.",
    category: "Solar",
  },
  {
    image: distributionBoard,
    title: "Distribution board installation",
    description: "Wiring, breakers and protection devices fitted in a power distribution board.",
    category: "Electrical",
  },
  {
    image: containerUnits,
    title: "Containerised power units",
    description: "Containerised power installation for a data-centre application.",
    category: "Electrical",
  },
  {
    image: borehole,
    title: "Borehole pump installation",
    description: "Borehole pump and pipework installation and maintenance.",
    category: "Water & pumps",
  },
];
