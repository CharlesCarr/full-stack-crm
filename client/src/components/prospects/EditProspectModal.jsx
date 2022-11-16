import { Modal } from "flowbite-react";
import EditForm from "../EditForm";

const EditProspectModal = ({ prospect, showEditModal, setShowEditModal }) => {
  return (
    <Modal
      show={showEditModal}
      size="md"
      popup={true}
      onClose={() => setShowEditModal(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Prospect
          </h3>
          <EditForm prospect={prospect} setShowEditModal={setShowEditModal} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProspectModal;
