"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPenToSquare } from "react-icons/fa6";

const UserInfo = () => {
  const { user, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="w-full wrapper pt-10">
      <div className="bg-card border border-border backdrop-blur-lg rounded-2xl p-10 mb-8">
        <div className="flex items-center gap-6">
          {!!user.avatar ? (
            <Image
              loading="eager"
              src={user.avatar}
              alt="user-avatar"
              width={72}
              height={72}
              className="rounded-full"
            />
          ) : (
            <div className="h-18 w-18 rounded-full bg-linear-to-br from-primary to-accent text-primary-foreground text-3xl flex items-center justify-center">
              <span>{user.name[0].toUpperCase()}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold tracking-wide">{user.name.toUpperCase()}</h1>
              <button
                className="p-2 text-muted-foreground hover:text-accent transition-all duration-200 cursor-pointer"
                title="Chỉnh sửa thông tin"
              >
                <FaPenToSquare />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Admin dashboard
              </Link>
            )}
          </div>
        </div>
        <div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
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
          </div>
          {user.skill?.length || user.certification?.length || user.bookingJob?.length ? (
            <div className="mt-6 pt-6 border-t border-border space-y-4">
              {user.skill && user.skill.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skill.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-card border border-border px-3 py-1 rounded-full text-accent"
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
                        className="text-xs bg-card border border-border px-3 py-1 rounded-full text-gray-300"
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
    </div>
  );
};

export default UserInfo;
