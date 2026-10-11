import genAtSite from "@/assets/gen-at-site.webp";
import genAtSiteSm from "@/assets/gen-at-site-800.webp";
import genAtSiteXs from "@/assets/gen-at-site-480.webp";
import genDelivery from "@/assets/project-generator-delivery.webp";
import genDeliverySm from "@/assets/project-generator-delivery-800.webp";
import genDeliveryXs from "@/assets/project-generator-delivery-480.webp";
import solarRoof from "@/assets/solar-rts.webp";
import solarRoofSm from "@/assets/solar-rts-800.webp";
import solarRoofXs from "@/assets/solar-rts-480.webp";
import solarContainer from "@/assets/solar.webp";
import solarContainerSm from "@/assets/solar-800.webp";
import solarContainerXs from "@/assets/solar-480.webp";
import distributionBoard from "@/assets/project-distribution-board.webp";
import distributionBoardSm from "@/assets/project-distribution-board-800.webp";
import distributionBoardXs from "@/assets/project-distribution-board-480.webp";
import containerUnits from "@/assets/datacentre.webp";
import containerUnitsSm from "@/assets/datacentre-800.webp";
import containerUnitsXs from "@/assets/datacentre-480.webp";
import borehole from "@/assets/borehole.webp";
import boreholeSm from "@/assets/borehole-800.webp";
import boreholeXs from "@/assets/borehole-480.webp";

export type ProjectCategory = "Generators" | "Solar" | "Electrical" | "Water & pumps";

export type Project = {
  image: string;
  /** 800px-wide version for phones and grid thumbnails */
  imageSmall: string;
  /** 480px-wide version for small grid tiles on phones */
  imageTiny: string;
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
    imageSmall: genAtSiteSm,
    imageTiny: genAtSiteXs,
    title: "20 kVA Perkins diesel generator",
    description: "Canopied standby generator supplied, installed and commissioned on a client site.",
    category: "Generators",
  },
  {
    image: genDelivery,
    imageSmall: genDeliverySm,
    imageTiny: genDeliveryXs,
    title: "Standby generator delivery",
    description: "Silent-canopy diesel generator delivered and positioned ready for connection.",
    category: "Generators",
  },
  {
    image: solarRoof,
    imageSmall: solarRoofSm,
    imageTiny: solarRoofXs,
    title: "Rooftop solar PV array",
    description: "Tilt-mounted solar panels installed on a commercial corrugated roof.",
    category: "Solar",
  },
  {
    image: solarContainer,
    imageSmall: solarContainerSm,
    imageTiny: solarContainerXs,
    title: "Solar on containerised unit",
    description: "Solar panels mounted on a container structure for off-grid power.",
    category: "Solar",
  },
  {
    image: distributionBoard,
    imageSmall: distributionBoardSm,
    imageTiny: distributionBoardXs,
    title: "Distribution board installation",
    description: "Wiring, breakers and protection devices fitted in a power distribution board.",
    category: "Electrical",
  },
  {
    image: containerUnits,
    imageSmall: containerUnitsSm,
    imageTiny: containerUnitsXs,
    title: "Containerised power units",
    description: "Containerised power installation for a data-centre application.",
    category: "Electrical",
  },
  {
    image: borehole,
    imageSmall: boreholeSm,
    imageTiny: boreholeXs,
    title: "Borehole pump installation",
    description: "Borehole pump and pipework installation and maintenance.",
    category: "Water & pumps",
  },
];

/** srcSet for a project photo: browsers pick the small file on phones. */
export const projectSrcSet = (p: Project) => `${p.imageTiny} 480w, ${p.imageSmall} 800w, ${p.image} 1600w`;
