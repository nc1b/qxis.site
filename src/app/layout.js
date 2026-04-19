import "./globals.css";

export const metadata = {
  title: "Qxis | ERLC Alter • Server Manager • Full Stack Developer",
  description:
    "Portfolio of Qxis — an expert ERLC alter, server manager, and full stack developer crafting exceptional digital experiences.",
  keywords: [
    "ERLC",
    "Roblox",
    "Full Stack Developer",
    "Server Manager",
    "Portfolio",
    "Discord Bot Developer",
  ],
  openGraph: {
    title: "Qxis | ERLC Alter • Server Manager • Full Stack Developer",
    description:
      "Portfolio of Qxis — crafting exceptional digital experiences across ERLC, server management, and full stack development.",
    type: "website",
    url: "https://qxis.site",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain-overlay">{children}</body>
    </html>
  );
}
