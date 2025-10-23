import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-12 bg-[#1b1c1d]">
      {/* <footer className="py-12 bg-slate-50 border-t border-slate-200"> */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <div>
            <h4 className="text-md sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 sm:px-0 text-white">
              Quick Links
            </h4>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              {[
                { to: "/", label: "Home" },
                { to: "/bags", label: "Bags" },
                { to: "/orders", label: "Orders" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-blue-500 transition-colors duration-200 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-md sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 sm:px-0 text-white">
              Contact Us
            </h4>

            <ul className="space-y-4 text-slate-600">
              {/* Email */}
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-slate-500 mt-1" />
                <div>
                  <a
                    href="mailto:nagiyasserahmed@gmail.com"
                    className="ml-2 text-slate-300 hover:underline"
                  >
                    nagiyasserahmed@gmail.com
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start space-x-3">
                <FaPhone className="text-slate-500 mt-1" />
                <div>
                  <a
                    href="tel:+201090312546"
                    className="ml-2 text-slate-300 hover:underline"
                  >
                    (+20) 1090312546
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start text-slate-300 mt-1 space-x-3">
                <FaMapMarkerAlt />
                <div>
                  <p className="ml-2 mt-1">123 Ovelle St, Commerce City, EG</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-md sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 sm:px-0 text-white">
              Follow Us
            </h4>
            <div className="flex space-x-4">
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
                  href: "https://www.linkedin.com/in/nagy-yasser-629bab239/",
                  icon: (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.941v5.665H9.352V9.015h3.414v1.557h.048c.477-.9 1.638-1.852 3.37-1.852 3.602 0 4.265 2.371 4.265 5.455v6.277z" />
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

            <p className="text-slate-300 mt-4 text-sm">
              Follow us for updates, offers, and inspiration.
            </p>
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
