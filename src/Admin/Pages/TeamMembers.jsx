import AdminLayout from "../Components/AdminLayout";
import TeamMembersTable from "../Components/TeamMembersTable";

const TeamMembers = () => {
  return (
    <AdminLayout title="Team Members">
      <TeamMembersTable />
    </AdminLayout>
  );
};

export default TeamMembers;