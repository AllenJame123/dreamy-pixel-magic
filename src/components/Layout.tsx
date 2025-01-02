import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, Palette, Image, Smile, Type } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MobileMenu />
              <div className="hidden md:flex">
                <Link
                  to="/"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === "/"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Image Generator
                </Link>
                <Link
                  to="/logo-generator"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === "/logo-generator"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Logo Generator
                </Link>
                <Link
                  to="/favicon-generator"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === "/favicon-generator"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Favicon Generator
                </Link>
                <Link
                  to="/meme-generator"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === "/meme-generator"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Smile className="w-4 h-4 mr-2" />
                  Meme Generator
                </Link>
                <Link
                  to="/add-text-to-photo"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === "/add-text-to-photo"
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Type className="w-4 h-4 mr-2" />
                  Add Text to Photo
                </Link>
                <Link
                  to="/blog"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname.startsWith("/blog")
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;