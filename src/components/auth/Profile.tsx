import { User, MapPin, Shield, Lock, Trash2 } from "lucide-react";
import ContactAddressForm from "./ContactAddressForm";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import AccordionSection from "./AccordionSection";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!user) return <Navigate to="/" replace />;

  const handleEdit = () => {
    setIsEditing(true);
    setOpenAccordion("contact"); // keep Contact & Address open
  };

  const handleCancel = () => setIsEditing(false);
  const handleSuccess = () => setIsEditing(false);

  const handleAccordionToggle = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-4 md:py-8 px-3 md:px-4">
      <div className="container mx-auto px-0 sm:px-4">
        {/* Header */}
        <ProfileHeader user={user} isEditing={isEditing} onEdit={handleEdit} />

        {/* Personal Information Accordion */}
        <AccordionSection
          title="Personal Information"
          icon={<User className="w-5 h-5 text-purple-600" />}
          isOpen={openAccordion === "personal"}
          onToggle={() => handleAccordionToggle("personal")}
        >
          <PersonalInfo user={user} />
        </AccordionSection>

        {/* Contact & Address Accordion */}
        <AccordionSection
          title="Contact & Address"
          icon={<MapPin className="w-5 h-5 text-purple-600" />}
          isOpen={openAccordion === "contact"}
          onToggle={() => handleAccordionToggle("contact")}
        >
          <ContactAddressForm
            user={user}
            isEditing={isEditing}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        </AccordionSection>

        {/* Account Settings Accordion */}
        <AccordionSection
          title="Account Settings"
          icon={<Shield className="w-5 h-5 text-purple-600" />}
          isOpen={openAccordion === "settings"}
          onToggle={() => handleAccordionToggle("settings")}
        >
          <div className="flex flex-col gap-2">
            <Link
              to="/change-password"
              className="flex items-center justify-center gap-2 md:gap-3 px-1 py-2 md:px-6 md:py-2 w-fit text-sm md:text-base"
            >
              <Lock className="w-4 h-4 md:w-5 md:h-5" />
              Change Password
            </Link>
            <button className="flex items-center justify-center gap-2 md:gap-3 px-1 py-2 md:px-6 md:py-2 w-fit text-sm md:text-base cursor-pointer">
              <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
              Delete Account
            </button>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}
