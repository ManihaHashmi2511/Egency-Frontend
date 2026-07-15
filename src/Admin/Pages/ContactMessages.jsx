import AdminLayout from "../Components/AdminLayout";
import ContactMessagesTable from "../Components/ContactMessagesTable";

const ContactMessages = () => {
  return (
    <AdminLayout title="Contact Messages">
      <ContactMessagesTable />
    </AdminLayout>
  );
};

export default ContactMessages;