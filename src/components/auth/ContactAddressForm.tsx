// components/ContactAddressForm.tsx
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../api/auth";
import type {
  ApplicationUser,
  UpdateProfileRequest,
} from "../../types/auth.types";
import { Phone, MapPin, Save, X, Loader2 } from "lucide-react";

interface ContactAddressFormProps {
  user: ApplicationUser;
  isEditing: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ContactAddressForm({
  user,
  isEditing,
  onCancel,
  onSuccess,
}: ContactAddressFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phoneNumber: user?.PhoneNumber || "",
      address: user?.Address || "",
      city: user?.City || "",
      state: user?.State || "",
      zipCode: user?.ZipCode || "",
      country: user?.Country || "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onSuccess();
      alert("Profile updated successfully!");
    },
    onError: (error) => {
      alert(error.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: UpdateProfileRequest) => {
    mutation.mutate(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <InfoField
          icon={<Phone className="w-4 h-4" />}
          label="Phone Number"
          value={user.PhoneNumber || "Not provided"}
        />
        <InfoField
          icon={<MapPin className="w-4 h-4" />}
          label="Address"
          value={user.Address || "Not provided"}
        />
        <InfoField label="City" value={user.City || "Not provided"} />
        <InfoField label="State" value={user.State || "Not provided"} />
        <InfoField label="Zip Code" value={user.ZipCode || "Not provided"} />
        <InfoField label="Country" value={user.Country || "Not provided"} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <FormField
          icon={<Phone className="w-4 h-4" />}
          label="Phone Number"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          type="tel"
          placeholder="Enter phone number"
          validation={{
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a valid phone number",
            },
          }}
        />

        <FormField
          icon={<MapPin className="w-4 h-4" />}
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          type="text"
          placeholder="Enter address"
          validation={{ required: "Address is required" }}
        />

        <FormField
          label="City"
          name="city"
          register={register}
          error={errors.city}
          type="text"
          placeholder="Enter city"
          validation={{ required: "City is required" }}
        />

        <FormField
          label="State"
          name="state"
          register={register}
          error={errors.state}
          type="text"
          placeholder="Enter state"
          validation={{ required: "State is required" }}
        />

        <FormField
          label="Zip Code"
          name="zipCode"
          register={register}
          error={errors.zipCode}
          type="text"
          placeholder="Enter zip code"
          validation={{ required: "Zip code is required" }}
        />

        <FormField
          label="Country"
          name="country"
          register={register}
          error={errors.country}
          type="text"
          placeholder="Enter country"
          validation={{ required: "Country is required" }}
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6 md:mt-8">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              Save Changes
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={mutation.isPending}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 font-medium text-sm md:text-base"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
          Cancel
        </button>
      </div>
    </form>
  );
}

function FormField({
  icon,
  label,
  name,
  register,
  error,
  type,
  placeholder,
  validation,
}: any) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        {...register(name, validation)}
        className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm md:text-base"
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
          <span>⚠</span> {error.message}
        </p>
      )}
    </div>
  );
}

function InfoField({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1 md:mb-2">
        {icon}
        {label}
      </label>
      <p className="text-gray-900 text-base md:text-lg font-medium break-words">
        {value}
      </p>
    </div>
  );
}
