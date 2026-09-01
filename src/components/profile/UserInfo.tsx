"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import UserModal from "../modals/UserModal";
import { ApiSkill } from "@/types/skill";
import UserAvatar from "../common/UserAvatar";
import { redirectToAuth } from "@/utils/redirectToAuth";

interface UserInfoProps {
  skills: ApiSkill[];
}

const UserInfo = ({ skills }: UserInfoProps) => {
  const { user, initializeAuth } = useAuthStore();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    initializeAuth();
    setIsMounted(true);
  }, [initializeAuth]);

  useEffect(() => {
    if (isMounted && !user) {
      redirectToAuth(router);
    }
  }, [user, isMounted, router]);

  if (!isMounted || !user) {
    return <div className="w-full wrapper pt-10 min-h-100"></div>;
  }

  return (
    <div className="w-full wrapper pt-10">
      <div className="bg-card border border-border backdrop-blur-lg rounded-2xl p-10 mb-8">
        <div className="flex flex-col sm:flex-row sm: items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <UserAvatar src={user.avatar} name={user.name} size={72} className="text-3xl" />
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold tracking-wide">{user.name.toUpperCase()}</h1>
              <button
                onClick={() => setIsEditOpen(true)}
                className="p-2 text-muted-foreground hover:text-accent transition-all duration-200 cursor-pointer"
                title="Chỉnh sửa thông tin"
              >
                <FaPenToSquare />
              </button>
            </div>
          </div>
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="w-full sm:w-fit text-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Admin dashboard
            </Link>
          )}
        </div>
        <div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Phone number</p>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Date of birth</p>
              <p className="text-sm font-medium">{formatDate(user.birthday)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Gender</p>
              <p className="text-sm font-medium">{user.gender ? "Male" : "Female"}</p>
            </div>
          </div>
          {user.skill?.length || user.certification?.length || user.bookingJob?.length ? (
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              {user.skill && user.skill.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skill.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-card border border-border px-3 py-1 rounded-full text-foreground pointer-events-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {user.certification && user.certification.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {user.certification.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-card border border-border px-3 py-1 rounded-full text-foreground pointer-events-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <UserModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} user={user} skills={skills} />
    </div>
  );
};

export default UserInfo;
