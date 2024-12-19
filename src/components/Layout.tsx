import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, Mail } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
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
              <Link
                to="/contact"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  location.pathname === "/contact"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Link>
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