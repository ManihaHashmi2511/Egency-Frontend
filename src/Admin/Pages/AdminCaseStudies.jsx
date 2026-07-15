import AdminLayout from "../Components/AdminLayout";
import CaseStudiesTable from "../Components/CaseStudiesTable";

const AdminCaseStudies = () => {
  return (
    <AdminLayout title="Case Studies">
      <CaseStudiesTable />
    </AdminLayout>
  );
};

export default AdminCaseStudies;