"use client";

import { userEditRoleSchema, UserFormData, userSchema } from "@/lib/schemas";
import { updateSession } from "@/lib/session";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/useAuthStore";
import { ApiSkill } from "@/types/skill";
import { ApiUser } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import FormError from "../common/FormError";
import UserAvatar from "../common/UserAvatar";
import { MAX_FILE_SIZE } from "@/utils/constants";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: ApiUser | null;
  skills?: ApiSkill[];
  isAdminMode?: boolean;
  mode?: "edit" | "create";
  onSuccess?: () => void;
}

const UpdateProfileModal = ({
  isOpen,
  onClose,
  user,
  skills = [],
  isAdminMode = false,
  mode = "edit",
  onSuccess,
}: UpdateProfileModalProps) => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState("");

  const isCreateMode = isAdminMode && mode === "create";
  const isEditRoleMode = isAdminMode && mode === "edit";
  const currentResolver = isEditRoleMode ? zodResolver(userEditRoleSchema as any) : zodResolver(userSchema);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: currentResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      certification: "",
      role: "USER",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setSelectedSkills(user.skill || []);
        setAvatarPreview(user.avatar || "");
        setSelectedFile(null);
        setAvatarError("");
        reset({
          name: user.name || "",
          email: user.email || "",
          password: "",
          phone: user.phone || "",
          birthday: user.birthday || "",
          gender: user.gender ?? true,
          certification: user.certification ? user.certification.join(", ") : "",
          role: user.role || "USER",
        });
      } else {
        setSelectedSkills([]);
        setAvatarPreview("");
        setSelectedFile(null);
        setAvatarError("");
        reset({
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: true,
          certification: "",
          role: "USER",
        });
      }
    }
  }, [isOpen, user, reset]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditRoleMode) return;
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select a valid image file (PNG, JPG, JPEG)...");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setAvatarError(`Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }
    setAvatarError("");
    setSelectedFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleSkill = (skillName: string) => {
    if (isEditRoleMode) return;
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName],
    );
  };

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (isAdminMode && isEditRoleMode && user) {
        const payload = {
          ...user,
          role: data.role,
          skill: user.skill || [],
          certification: user.certification || [],
        };
        await userService.updateUser(user.id, payload);
        toast.success("User role updated successfully!");
        router.refresh();
        if (onSuccess) onSuccess();
        onClose();
        return;
      }
      let avatarUrl = avatarPreview;
      if (selectedFile && !isCreateMode) {
        const uploadRes = await userService.uploadAvatar(selectedFile);
        avatarUrl = uploadRes.content.avatar;
      }
      const certArray = data.certification
        ? data.certification
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : [];

      if (isAdminMode && isCreateMode) {
        const payload = {
          ...data,
          avatar: avatarUrl,
          skill: selectedSkills,
          certification: certArray,
          gender: Boolean(data.gender),
        };
        await userService.createUser(payload);
        toast.success("User created successfully!");
      } else if (user) {
        const updatedPayload: ApiUser = {
          ...user,
          name: data.name,
          phone: data.phone,
          birthday: data.birthday,
          gender: Boolean(data.gender),
          avatar: avatarUrl,
          skill: selectedSkills,
          certification: certArray,
        };
        if (data.password && data.password.trim() !== "") {
          updatedPayload.password = data.password;
        }
        const updatedRes = await userService.updateUser(user.id, updatedPayload);
        if (updatedRes.content) {
          const responseUser = updatedRes.content;
          const parseToArray = (val: any): string[] => {
            if (Array.isArray(val)) return val;
            if (typeof val === "string") {
              try {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [];
              } catch {
                return val
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
              }
            }
            return [];
          };
          const normalizedUser: ApiUser = {
            ...responseUser,
            skill: parseToArray(responseUser.skill),
            certification: parseToArray(responseUser.certification),
          };
          setUser(normalizedUser);
          updateSession(normalizedUser);
        }
        toast.success("Profile updated successfully!");
      }
      router.refresh();
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to save user profile:", error);
      const errorMessage = error?.response?.data?.message || "Failed to save user profile. Please try again!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => onClose()}
      className="form-modal-bg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="form-modal"
      >
        <div className="form-modal-header">
          <h3 className="form-modal-title">
            {!isAdminMode ? "Edit Profile" : isCreateMode ? "Create New User" : "Edit User Role"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="form-modal-cancel-icon"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative group">
              <UserAvatar src={avatarPreview} name={user?.name} size={80} className="border-2 border-accent text-2xl" />
              {!isEditRoleMode && !isCreateMode && (
                <>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                  >
                    <FaCamera size={20} />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
            <FormError message={avatarError} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-modal-label">Email</label>
              <input
                type="email"
                disabled={!isCreateMode}
                {...register("email")}
                className={`mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground ${!isCreateMode ? "cursor-not-allowed bg-muted" : ""} `}
              />
            </div>
            <div>
              <label className="form-modal-label">Full Name</label>
              <input
                type="text"
                disabled={isEditRoleMode}
                {...register("name")}
                className={`form-modal-input ${isEditRoleMode ? "cursor-not-allowed bg-muted" : ""}`}
              />
              <FormError message={errors.name?.message} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isEditRoleMode && (
              <div>
                <label className="form-modal-label">Password</label>
                <div className="flex items-center mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-within:border-accent">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="flex-1 min-w-0 outline-none"
                    placeholder={isCreateMode ? "Enter password" : "Leave blank to keep current"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="opacity-50 hover:opacity-100 cursor-pointer transition-all"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <FormError message={errors.password?.message} />
              </div>
            )}
            <div>
              <label className="form-modal-label">Phone Number</label>
              <input
                type="text"
                disabled={isEditRoleMode}
                {...register("phone")}
                className={`form-modal-input ${isEditRoleMode ? "cursor-not-allowed bg-muted" : ""}`}
              />
              <FormError message={errors.phone?.message} />
            </div>
            {isAdminMode && (
              <div className={isCreateMode ? "col-span-1 sm:col-span-2" : ""}>
                <label className="form-modal-label">Role</label>
                <select
                  {...register("role")}
                  className="form-modal-input cursor-pointer"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-modal-label">Date of Birth</label>
              <input
                type="date"
                disabled={isEditRoleMode}
                {...register("birthday")}
                className={`form-modal-input ${isEditRoleMode ? "cursor-not-allowed bg-muted" : ""}`}
              />
              <FormError message={errors.birthday?.message} />
            </div>
            <div>
              <label className="form-modal-label">Gender</label>
              <select
                disabled={isEditRoleMode}
                {...register("gender", { setValueAs: (v) => v === "true" || v === true })}
                className={`form-modal-input ${isEditRoleMode ? "cursor-not-allowed bg-muted" : ""}`}
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="form-modal-label block mb-2">
              Skills ({selectedSkills.length} selected)
            </label>
            {isAdminMode && mode === "edit" ? (
              <div>
                <div className="flex flex-wrap gap-2">
                  {user?.skill && user.skill.length > 0 ? (
                    user.skill.map((skillItem, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted border border-border px-3 py-1 rounded-full text-foreground"
                      >
                        {skillItem}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">No skills added.</p>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`max-h-36 overflow-y-auto border border-border rounded-lg p-3 bg-background flex flex-wrap gap-2 ${isEditRoleMode ? "opacity-60 pointer-events-none" : ""}`}
              >
                {skills.map((s) => {
                  const isSelected = selectedSkills.includes(s.tenSkill);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSkill(s.tenSkill)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-accent text-accent-foreground border-accent font-semibold"
                          : "bg-card text-muted-foreground border-border hover:border-accent"
                      }`}
                    >
                      {s.tenSkill} {isSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <label className="form-modal-label">Certifications</label>
            <input
              type="text"
              disabled={isEditRoleMode}
              placeholder={isEditRoleMode ? "" : "e.g. AWS Certified, TOEIC 800"}
              {...register("certification")}
              className={`form-modal-input ${isEditRoleMode ? "cursor-not-allowed bg-muted" : ""}`}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="form-modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="form-modal-save-btn"
            >
              {loading ? "Saving..." : isAdminMode && isEditRoleMode ? "Update Role" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
