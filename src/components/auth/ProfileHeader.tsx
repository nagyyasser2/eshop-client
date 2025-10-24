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
    <div className="rounded-2xl py-2 mb-3  bg-white">
      <h4>Profile</h4>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-xl md:text-xl font-semibold text-slate-800 mb-1 md:mb-2">
              {user.FirstName} {user.LastName}
            </h3>
            {user.Roles && user.Roles.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-2">
                {user.Roles.map((role, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 md:px-3 md:py-1 text-blue-500  text-xs font-semibold rounded-full"
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
            className="flex items-center justify-center gap-2  py-2  md:py-2 text-slate-600 rounded-xl  transition-all duration-300 cursor-pointer font-medium text-sm md:text-base"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
