import UserManagement from "@/components/admin/UserManagement";
import { userService } from "@/services/user.service";
import { skillService } from "@/services/skill.service";

const AdminUsersPage = async () => {
  const usersRes = await userService.getUserList();
  const users = usersRes.content;
  const skillRes = await skillService.getSkillList();
  const skills = skillRes.content;

  return <UserManagement users={users} skills={skills} />;
};

export default AdminUsersPage;
