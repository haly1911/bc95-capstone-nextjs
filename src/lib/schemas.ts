import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  birthday: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  role: z.string(),
  skill: z.array(z.string()),
  certification: z.array(z.string()),
});

export const userEditRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export const userSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  birthday: z.string().min(1, "Date of birth is required"),
  gender: z.boolean(),
  avatar: z.string().optional(),
  skill: z.array(z.string()).optional(),
  certification: z.string().optional(),
  role: z.string(),
});

export const gigSchema = z.object({
  tenCongViec: z
    .string()
    .min(1, "Gig title is required")
    .refine((val) => !val.includes("'"), {
      message: "Gig title cannot contain single quotes (')",
    }),
  giaTien: z.number().min(1, "Price must be greater than 0"),
  maChiTietLoaiCongViec: z.number().min(1, "Please select a subcategory"),
  moTaNgan: z
    .string()
    .min(1, "Short description is required")
    .refine((val) => !val.includes("'"), {
      message: "Short description cannot contain single quotes (')",
    }),
  moTa: z
    .string()
    .min(1, "Description is required")
    .refine((val) => !val.includes("'"), {
      message: "Description cannot contain single quotes (')",
    }),
  hinhAnh: z.string().optional().or(z.literal("")),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type UserEditRoleFormData = z.infer<typeof userEditRoleSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type GigFormData = z.infer<typeof gigSchema>;
