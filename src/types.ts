export type Food = {
  id?: number;
  name: string;
  quantity: number;
  minimumQuanlity: number;
  type: string;
};

export type UserContextType = {
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
};
