// components/ProfileHeader.tsx
import { UserCircle, Edit2 } from "lucide-react";
import type { ApplicationUser } from "../../types/auth.types";

interface ProfileHeaderProps {
  user: ApplicationUser;
  isEditing: boolean;
  onEdit: () => void;
}

export default function ProfileHeader({
  user,
  isEditing,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl p-4 mb-3 border border-purple-100 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.ProfilePictureUrl ? (
            <img
              src={user.ProfilePictureUrl}
              alt="Profile"
              className="w-13 h-13 md:w-15 md:h-15 rounded-full object-cover ring-4 ring-purple-100"
            />
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-100">
              <UserCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-xl md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
              {user.FirstName} {user.LastName}
            </h3>
            {user.Roles && user.Roles.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-2">
                {user.Roles.map((role, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-2 px-4 py-2 md:px-4 md:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm md:text-base"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
