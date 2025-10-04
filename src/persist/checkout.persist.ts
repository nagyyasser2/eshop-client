// checkout.persist.ts

export interface CheckoutData {
  ShippingFirstName: string;
  ShippingLastName: string;
  ShippingAddress: string;
  ShippingCity: string;
  ShippingState: string;
  ShippingZipCode: string;
  ShippingCountry: string;
  ShippingPhone: string;
  PaymentMethod: string;
  ShippingAmount: number;
  DiscountAmount: number;
  Notes: string;
}

export interface CheckoutState {
  formData: Partial<CheckoutData>;
  activeSection: string | null;
  completedSections: {
    shipping?: boolean;
    payment?: boolean;
  };
}

const STORAGE_KEY = "checkout_data";
const EXPIRY_KEY = "checkout_data_expiry";
const EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

class CheckoutPersist {
  /**
   * Save checkout data to localStorage
   */
  save(data: Partial<CheckoutState>): void {
    try {
      const currentData = this.load();
      const updatedData: CheckoutState = {
        ...currentData,
        ...data,
        formData: {
          ...currentData.formData,
          ...data.formData,
        },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      localStorage.setItem(EXPIRY_KEY, Date.now().toString());
    } catch (error) {
      console.error("Error saving checkout data:", error);
    }
  }

  /**
   * Load checkout data from localStorage
   */
  load(): CheckoutState {
    try {
      const expiryTime = localStorage.getItem(EXPIRY_KEY);

      // Check if data has expired
      if (expiryTime) {
        const timePassed = Date.now() - parseInt(expiryTime, 10);
        if (timePassed > EXPIRY_DURATION) {
          this.clear();
          return this.getDefaultState();
        }
      }

      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as CheckoutState;
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
    }

    return this.getDefaultState();
  }

  /**
   * Save form data only
   */
  saveFormData(formData: Partial<CheckoutData>): void {
    this.save({ formData });
  }

  /**
   * Save active section
   */
  saveActiveSection(activeSection: string | null): void {
    this.save({ activeSection });
  }

  /**
   * Save completed sections
   */
  saveCompletedSections(completedSections: {
    shipping?: boolean;
    payment?: boolean;
  }): void {
    this.save({ completedSections });
  }

  /**
   * Get form data only
   */
  getFormData(): Partial<CheckoutData> {
    const state = this.load();
    return state.formData || {};
  }

  /**
   * Get active section
   */
  getActiveSection(): string | null {
    const state = this.load();
    return state.activeSection || "shipping";
  }

  /**
   * Get completed sections
   */
  getCompletedSections(): { shipping?: boolean; payment?: boolean } {
    const state = this.load();
    return state.completedSections || {};
  }

  /**
   * Clear all checkout data
   */
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    } catch (error) {
      console.error("Error clearing checkout data:", error);
    }
  }

  /**
   * Check if there's saved data
   */
  hasSavedData(): boolean {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data !== null && data !== undefined;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get default state
   */
  private getDefaultState(): CheckoutState {
    return {
      formData: {},
      activeSection: "shipping",
      completedSections: {},
    };
  }

  /**
   * Merge saved data with default values
   */
  loadWithDefaults(defaults: Partial<CheckoutData>): Partial<CheckoutData> {
    const saved = this.getFormData();
    return {
      ...defaults,
      ...saved,
    };
  }
}

// Export singleton instance
export const checkoutPersist = new CheckoutPersist();

// Export class for testing purposes
export default CheckoutPersist;
