import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  checkoutPersist,
  type CheckoutData,
} from "../persist/checkout.persist";

export const useCheckoutPersistence = (formMethods: UseFormReturn<any>) => {
  const { setValue, watch } = formMethods;

  // Load saved data on component mount
  useEffect(() => {
    const savedState = checkoutPersist.load();

    // Restore form data
    if (savedState.formData) {
      Object.entries(savedState.formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key, value);
        }
      });
    }
  }, [setValue]);

  // Watch for form changes and auto-save
  useEffect(() => {
    const subscription = watch((formData) => {
      checkoutPersist.saveFormData(formData as Partial<CheckoutData>);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    saveActiveSection: checkoutPersist.saveActiveSection.bind(checkoutPersist),
    saveCompletedSections:
      checkoutPersist.saveCompletedSections.bind(checkoutPersist),
    getActiveSection: checkoutPersist.getActiveSection.bind(checkoutPersist),
    getCompletedSections:
      checkoutPersist.getCompletedSections.bind(checkoutPersist),
    clearCheckoutData: checkoutPersist.clear.bind(checkoutPersist),
    hasSavedData: checkoutPersist.hasSavedData.bind(checkoutPersist),
  };
};
