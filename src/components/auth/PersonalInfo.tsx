// components/PersonalInfo.tsx
import { User, Mail, Calendar, Shield } from "lucide-react";
import type { ApplicationUser } from "../../types/auth.types";

interface PersonalInfoProps {
  user: ApplicationUser;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <InfoField
        icon={<User className="w-4 h-4" />}
        label="Full Name"
        value={`${user.FirstName} ${user.LastName}`}
      />

      <InfoField
        icon={<Mail className="w-4 h-4" />}
        label="Email"
        value={user.Email || "Not provided"}
        badge={user.EmailConfirmed ? "✓ Verified" : undefined}
      />

      <InfoField
        icon={<User className="w-4 h-4" />}
        label="Username"
        value={user.UserName}
      />

      <InfoField
        icon={<Calendar className="w-4 h-4" />}
        label="Date of Birth"
        value={new Date(user.DateOfBirth).toLocaleDateString()}
      />

      <InfoField
        icon={<Shield className="w-4 h-4" />}
        label="Account Type"
        value={user.IsGoogleUser ? "Google Account" : "Standard Account"}
      />

      <InfoField
        icon={<Calendar className="w-4 h-4" />}
        label="Member Since"
        value={new Date(user.CreatedDate).toLocaleDateString()}
      />
    </div>
  );
}

function InfoField({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 md:mb-2">
        {icon}
        {label}
      </label>
      <div className="flex items-center gap-2">
        <p className="text-gray-900 text-base md:text-lg font-medium break-words">
          {value}
        </p>
        {badge && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
