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
  FaBirthdayCake,
  FaUserTag,
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateAddressData>();

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
    <div className="max-w-4xl mx-auto p-4 shadow-[0_0_5px_rgba(0,0,0,0.3)] my-8 rounded-md">
      <div className="bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-white overflow-hidden">
          {/* Header */}
          <div className="flex justify-center text-slate-500 p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                {profileData.profilePictureUrl ? (
                  <img
                    src={profileData.profilePictureUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-10 h-10" />
                )}
              </div>

              <div className="text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  {profileData.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaUserTag className="mr-2 text-purple-600" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FaUser className="text-purple-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FaEnvelope className="text-purple-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">
                    {profileData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100 md:col-span-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FaBirthdayCake className="text-purple-600" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <p className="text-gray-800 font-medium">
                    {formatDate(profileData.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-purple-600" />
                Address Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Edit Address</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>

                {updateProfileMutation.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">
                      {updateProfileMutation.error.message ||
                        "Failed to update profile"}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
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
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-md"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100 md:col-span-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaMapMarkerAlt className="text-purple-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Street Address
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profileData.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaCity className="text-purple-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      City
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profileData.city || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaMapMarkerAlt className="text-purple-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      State/Province
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profileData.state || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaMapMarkerAlt className="text-purple-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      ZIP/Postal Code
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profileData.zipCode || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <FaGlobeAmericas className="text-purple-600" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <p className="text-gray-800 font-medium">
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
