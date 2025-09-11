import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAmericas,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  profilePictureUrl?: string;
  roles: string[];
}

interface UpdateAddressData {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

const ProfileSettings = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } =
    useForm<UpdateAddressData>();

  // Fetch user profile
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserProfile> => {
      const response = await api.get<ApiResponse<UserProfile>>("/auth/profile");
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch profile");
    },
    enabled: !!user,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateAddressData) => {
      const response = await api.put<ApiResponse<UserProfile>>(
        "/auth/profile",
        data
      );
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Update failed");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      setIsEditing(false);
      reset();
    },
    onError: (error: any) => {
      console.error("Profile update failed:", error);
    },
  });

  // Populate form when editing starts
  useEffect(() => {
    if (isEditing && profileData) {
      setValue("address", profileData.address || "");
      setValue("city", profileData.city || "");
      setValue("state", profileData.state || "");
      setValue("zipCode", profileData.zipCode || "");
      setValue("country", profileData.country || "");
    }
  }, [isEditing, profileData, setValue]);

  const onSubmit = (data: UpdateAddressData) => {
    // Only send fields that have values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value && value.trim() !== "")
    );
    updateProfileMutation.mutate(filteredData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to load profile</div>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["profile"] })
          }
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg  overflow-hidden">
        {/* Header */}
        <div className="text-slate-700 p-2">
          <div className="flex items-center space-x-4">
            <div className="w-15 h-15 bg-white/20 rounded-full flex items-center justify-center">
              {profileData.profilePictureUrl ? (
                <img
                  src={profileData.profilePictureUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-8 h-8 " />
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.roles.map((role) => (
                  <span
                    key={role}
                    className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pl-2">
          {/* Personal Information */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaUser className="text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <p className="text-gray-800">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="text-gray-800">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
                <FaUser className="text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <p className="text-gray-800">
                    {formatDate(profileData.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Edit Address</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("address")}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your street address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCity className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("city")}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      {...register("state")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your state/province"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      {...register("zipCode")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your ZIP/postal code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaGlobeAmericas className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        {...register("country")}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>

                {updateProfileMutation.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">
                      {updateProfileMutation.error.message ||
                        "Failed to update profile"}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaSave className="w-4 h-4" />
                    <span>
                      {updateProfileMutation.isPending
                        ? "Saving..."
                        : "Save Changes"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updateProfileMutation.isPending}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Street Address
                    </label>
                    <p className="text-gray-800">
                      {profileData.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaCity className="text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      City
                    </label>
                    <p className="text-gray-800">
                      {profileData.city || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      State/Province
                    </label>
                    <p className="text-gray-800">
                      {profileData.state || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      ZIP/Postal Code
                    </label>
                    <p className="text-gray-800">
                      {profileData.zipCode || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FaGlobeAmericas className="text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <p className="text-gray-800">
                      {profileData.country || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
