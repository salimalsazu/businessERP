export type IFoodExpFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type IFoodExpCreateRequest = {
  totalCost: number;
  userFood: string[];
  foodExpDate: Date;
  totalMeal: number;
  employeeCost: number;
  mealRate: number;
};

export type ICourierUpdateRequest = {
  styleNo?: string;
  courierName?: string;
  awbNo?: string;
  courierDate?: Date;
  courierDetails?: string;
};

export type IStyleWiseCourier = {
  styleNo: string;
  _count: {
    couriers: number;
  };
};

export type IMonthlyFoodExpData = {
  firstName: string;
  lastName: string;
  month: string;
  totalMeal: number;
  mealRate: number;
  perEmployeeCost: number;
};
