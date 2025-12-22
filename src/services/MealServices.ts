import HttpClient from "./HttpClient";


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



export interface CreateCategoryPayload {
  title: string;
  subTitle?: string;
}

export const MealService = {
 

  getAllMealPlans: async (): Promise<any[]> => {
    const response = await HttpClient.get("/meal-plans");
    return response.data; 
  },


  getAllCategories: async (): Promise<any[]> => {
    const response = await HttpClient.get("/categories");
    return response.data;
  },



  getMealPlansByCategory: async (categoryId: string): Promise<any[]> => {
    const response = await HttpClient.get(
      `/categories/${categoryId}/meal-plans`
    );
    return response.data;
  },
};
