import { useMutation } from "@apollo/client";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ADD_PROSPECT } from "../../mutations/prospectMutations";
import { GET_PROSPECTS } from "../../queries/prospectQueries";

const AddProspectModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [dmLevel, setDmLevel] = useState("");
  console.log("dmLevelAdd", dmLevel);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { id: accountId } = useParams();

  const [addProspect] = useMutation(ADD_PROSPECT, {
    variables: { name, position, dmLevel, email, phone, accountId },
    update(cache, { data: { addProspect } }) {
      const { prospects } = cache.readQuery({ query: GET_PROSPECTS });
      cache.writeQuery({
        query: GET_PROSPECTS,
        data: { prospects: [...prospects, addProspect] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: improve validation later
    if (
      name === "" ||
      position === "" ||
      dmLevel === "" ||
      email === "" ||
      phone === ""
    ) {
      return alert("Please fill in all fields");
    }

    // dmLevel is enum so needs to be "dm" or "influencer"
    // TO DO: add this with a select / options
    console.log(dmLevel);
    addProspect(name, position, dmLevel, email, phone, accountId);

    setName("");
    setPosition("");
    setDmLevel("");
    setEmail("");
    setPhone("");

    setShowModal(false);
  };

  return (
    <div className="w-1/2 flex justify-end items-center">
      <Button onClick={() => setShowModal(true)}>
        <div className="flex items-center justify-center w-full">
          <FaUser className="w-5 h-5 mr-2" /> <p>New Prospect</p>
        </div>
      </Button>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              New Prospect
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
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
    </div>
  );
};

export default AddProspectModal;
