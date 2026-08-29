"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserModal from "@/components/common/UserModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import SearchInput from "@/components/common/SearchInput";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "../common/Pagination";
import { ApiUser } from "@/types/user";
import { ApiSkill } from "@/types/skill";
import { userService } from "@/services/user.service";
import UserAvatar from "../common/UserAvatar";
import { formatDate } from "@/utils/date";

interface UserManagementProps {
  users: ApiUser[];
  skills: ApiSkill[];
}

const UserManagement = ({ users, skills }: UserManagementProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "create">("create");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesGender =
        genderFilter === "all" || (genderFilter === "male" ? user.gender === true : user.gender === false);

      return matchesSearch && matchesRole && matchesGender;
    });
  }, [users, searchTerm, roleFilter, genderFilter]);

  const {
    currentPage,
    currentData: currentUsers,
    totalPages,
    handlePageChange,
    resetPage,
  } = usePagination({ data: filteredUsers, itemsPerPage: 10 });

  const handleOpenCreateModal = () => {
    setSelectedUser(null);
    setModalMode("create");
    setIsUserModalOpen(true);
  };

  const handleOpenEditRoleModal = (user: ApiUser) => {
    setSelectedUser(user);
    setModalMode("edit");
    setIsUserModalOpen(true);
  };

  const confirmDeleteUser = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await userService.deleteUser(selectedUserId);
      toast.success("User deleted successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      toast.error(error?.response?.data?.message || "Failed to delete user. Please try again!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage platform accounts, user roles, and permissions.</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchInput
            placeholder="Search users by name or email..."
            onSearch={(keyword) => {
              setSearchTerm(keyword);
              resetPage();
            }}
            className="w-full"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                resetPage();
              }}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium hover:border-accent focus:outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                resetPage();
              }}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium hover:border-accent focus:outline-none cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 cursor-pointer text-center"
          >
            + Add New User
          </button>
        </div>
      </div>
      {filteredUsers.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground border border-border rounded-xl bg-card">
          No users found matching your criteria.
        </div>
      ) : (
        <>
          <div className="hidden lg:block rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
            <div className="p-6">
              <div className="relative w-full overflow-hidden">
                <table className="w-full text-sm table-fixed">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[28%]">
                        User
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[22%]">
                        Email
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[15%]">
                        Phone
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[12%]">
                        Role
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[13%]">
                        Birthday
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[10%]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {currentUsers.map((u) => (
                      <tr key={u.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <UserAvatar src={u.avatar} name={u.name} size={36} />
                            <span className="font-medium truncate max-w-50" title={u.name}>
                              {u.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground truncate" title={u.email}>
                          {u.email}
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">{u.phone || "N/A"}</td>
                        <td className="p-4 align-middle">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                              u.role === "ADMIN"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {u.role || "USER"}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground text-xs">{formatDate(u.birthday)}</td>
                        <td className="p-4 align-middle text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenEditRoleModal(u)}
                              className="rounded-lg text-muted-foreground hover:text-accent transition-colors cursor-pointer inline-flex items-center justify-center"
                              title="Edit User Role"
                            >
                              <FaPencil className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => confirmDeleteUser(e, u.id)}
                              className="rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer inline-flex items-center justify-center"
                              title="Delete User"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {currentUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => handleOpenEditRoleModal(u)}
                className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar src={u.avatar} name={u.name} size={48} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground truncate" title={u.name}>
                      {u.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                    <div className="mt-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          u.role === "ADMIN"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {u.role || "USER"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-end justify-between text-xs text-muted-foreground">
                  <div>
                    <p>
                      Phone: <span className="font-medium text-foreground">{u.phone || "N/A"}</span>
                    </p>
                    <p>
                      Birthday: <span className="font-medium text-foreground">{formatDate(u.birthday) || "N/A"}</span>
                    </p>
                    <p>
                      Gender: <span className="font-medium text-foreground">{u.gender ? "Male" : "Female"}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => confirmDeleteUser(e, u.id)}
                    className="rounded-lg bg-destructive/10 text-destructive p-2 hover:bg-destructive/20 transition-colors cursor-pointer"
                    title="Delete User"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        skills={skills}
        isAdminMode={true}
        mode={modalMode}
        onSuccess={() => router.refresh()}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        type="danger"
        onConfirm={handleDeleteUser}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
