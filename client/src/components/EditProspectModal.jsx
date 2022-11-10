import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROSPECT } from "../queries/prospectQueries";
import { UPDATE_PROSPECT } from "../mutations/prospectMutations";
import { Button, Label, Modal, TextInput } from "flowbite-react";

const EditProspectModal = ({ prospect, showEditModal, setShowEditModal }) => {
  console.log(prospect);
  const [name, setName] = useState(prospect.name);
  const [position, setPosition] = useState(prospect.description);
  // const [dmLevel, setDmLevel] = useState(() => {
  //   switch (prospect.dmLevel) {
  //     case "Decision Maker":
  //       return "dm";
  //     case "Influencer":
  //       return "influencer";
  //     default:
  //       throw new Error(`Unknown status: ${prospect.dmLevel}`);
  //   }
  // });
  const [dmLevel, setDmLevel] = useState(prospect.dmLevel);
  const [email, setEmail] = useState(prospect.email);
  const [phone, setPhone] = useState(prospect.phone);

  // const ref = useRef(null);

  const [updateProspect] = useMutation(UPDATE_PROSPECT, {
    variables: { id: prospect.id, name, position, dmLevel, email, phone },
    refetchQueries: [{ query: GET_PROSPECT, variables: { id: prospect.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !position || !dmLevel || !email || !phone) {
      return alert("Please fill out all fields");
    }

    // updateProspect(name, position, dmLevel, email, phone);
  };

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
          <form onSubmit={handleSubmit}>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                // ref={ref}
                // defaultValue={name}
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="position" value="Position" />
              <TextInput
                id="position"
                required={true}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            {/* change to select with options */}
            <div className="mb-2 block">
              <Label htmlFor="dmLevel" value="DM Level" />
              <TextInput
                id="dmLevel"
                required={true}
                value={dmLevel}
                onChange={(e) => setDmLevel(e.target.value)}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone" />
              <TextInput
                id="phone"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProspectModal;
