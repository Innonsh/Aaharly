import HttpClient from "./HttpClient";

/* ============================
   MEAL PLAN PAYLOAD
============================ */

export interface CreateMealPlanPayload {
  title: string;
  subTitle?: string;
  coverImageUrl?: string;
  originalPrice: number;
  discountedPrice: number;
  duration?: string;
  mealsPerDay?: number;
  currency?: string;
  isActive?: boolean;
}

/* ============================
   CATEGORY PAYLOAD
============================ */

export interface CreateCategoryPayload {
  title: string;
  subTitle?: string;
}

/* ============================
   MEAL SERVICE
============================ */

export const MealService = {
  /* -------- Meal Plans -------- */

  getAllMealPlans: async (): Promise<any[]> => {
    const response = await HttpClient.get("/meal-plans");
    return response.data; // ARRAY (as confirmed)
  },

  createMealPlan: async (payload: CreateMealPlanPayload): Promise<any> => {
    const response = await HttpClient.post("/meal-plans", payload);
    return response.data;
  },

  /* -------- Categories -------- */

  createCategory: async (payload: CreateCategoryPayload): Promise<any> => {
    const response = await HttpClient.post("/categories", payload);
    return response.data;
  },

  getAllCategories: async (): Promise<any[]> => {
    const response = await HttpClient.get("/api/categories");
    return response.data;
  },

  /* -------- Mapping -------- */

  addCategoryToMealPlan: async (
    planId: string,
    categoryId: string
  ): Promise<any> => {
    const response = await HttpClient.post(
      `/api/meal-plans/${planId}/categories/${categoryId}`,
      {}
    );
    return response.data;
  },

  getMealPlansByCategory: async (categoryId: string): Promise<any[]> => {
    const response = await HttpClient.get(
      `/api/categories/${categoryId}/meal-plans`
    );
    return response.data;
  },
};
