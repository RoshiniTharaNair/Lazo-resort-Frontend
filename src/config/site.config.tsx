import { Metadata } from "next";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "Lazo resort - Admin Dashboard",
  description: `Introducing "Lazo Resort Admin" – the quintessential administrative platform meticulously crafted for resort management. Engineered with cutting-edge technology, this admin site serves as a centralized hub for overseeing every facet of your resort's operations. From seamless booking management to intricate service coordination, "Lazo Resort Admin" ensures a harmonious blend of functionality and elegance. Elevate your resort's operational efficiency with our intuitive, responsive design, tailored to meet the sophisticated demands of luxury hospitality. Empower your team, enhance guest experiences, and redefine the essence of resort administration with "Lazo Resort Admin".`,
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Lazo Resort` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Lazo Resort` : title,
      description,
      url: "https://isomorphic-furyroad.vercel.app",
      siteName: "Lazo Resort", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
