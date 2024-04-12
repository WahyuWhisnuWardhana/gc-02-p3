import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServerProtectedComponents from "@/components/ServerProtectedComponent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServerProtectedComponents>
          <Navbar />
          {children}
          <Footer />
        </ServerProtectedComponents>
      </body>
    </html>
  );
}
