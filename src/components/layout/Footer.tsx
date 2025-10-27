import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-12 bg-[#1b1c1d]">
      <div className="container mx-auto px-4">
        <div className="mb-4 sm:mb-8">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Stay Connected with Ovelle
          </h2>
          <p className="text-center text-slate-300 max-w-2xl mx-auto">
            Follow us on social media and stay updated with the latest news,
            offers, and collections from Ovelle. We love to hear from our
            community!
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            {[
              {
                href: "https://www.facebook.com/nagy.yasser.7/",
                icon: (
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                ),
              },
              {
                href: "https://www.instagram.com/nagi_yaser_ahmed/",
                icon: (
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987s5.367 11.987 11.988 11.987 11.987-5.367 11.987-11.987S18.637 0 12.017 0zM8.449 20.25c-2.744 0-4.968-2.213-4.968-4.944V8.694c0-2.731 2.224-4.944 4.968-4.944h7.102c2.744 0 4.968 2.213 4.968 4.944v6.612c0 2.731-2.224 4.944-4.968 4.944H8.449z" />
                ),
              },
              {
                href: "https://www.linkedin.com/in/nagiyasser/",
                icon: (
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.941v5.665H9.352V9.015h3.414v1.557h.048c.477-.9 1.638-1.852 3.37-1.852 3.602 0 4.265 2.371 4.265 5.455v6.277z" />
                ),
              },
              {
                href: "https://www.youtube.com/@nagi_yaser", // replace with your real channel
                icon: (
                  <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.107C19.402 3.5 12 3.5 12 3.5s-7.402 0-9.404.579A2.974 2.974 0 0 0 .502 6.186C0 8.2 0 12 0 12s0 3.8.502 5.814a2.974 2.974 0 0 0 2.094 2.107C4.598 20.5 12 20.5 12 20.5s7.402 0 9.404-.579a2.974 2.974 0 0 0 2.094-2.107C24 15.8 24 12 24 12s0-3.8-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                ),
              },
              {
                href: "https://www.tiktok.com/@nagi_yaser", // replace with your real handle
                icon: (
                  <path d="M12.5 2c1.49 0 2.89.56 3.95 1.57a5.44 5.44 0 0 0 3.91 1.6v3.12a8.53 8.53 0 0 1-3.91-.95v6.58c0 3.81-3.09 6.92-6.91 6.92A6.91 6.91 0 0 1 2.64 13.6c0-3.82 3.09-6.92 6.91-6.92.4 0 .8.03 1.18.1v3.3a3.63 3.63 0 0 0-1.18-.18 3.61 3.61 0 1 0 3.61 3.62V2h1.34z" />
                ),
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 bg-slate-200 hover:bg-blue-500 rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm"
              >
                <svg
                  className="w-5 h-5 text-slate-700 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 flex-wrap justify-center">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/return-policy", label: "Return Policy" },
              { to: "/shipping-policy", label: "Shipping Policy" },
              { to: "/terms-of-service", label: "Terms of Service" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-300 hover:text-blue-500 transition-colors duration-200 text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-slate-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Ovelle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
