import { useMutation } from "@apollo/client";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/accountMutations";
import { GET_CLIENTS } from "../queries/accountQueries";

const AddClientModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: improve validation later
    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Button onClick={() => setShowModal(true)}>
        <div className="flex items-center justify-center w-full">
          <FaUser className="w-5 h-5" /> <p>Add Client</p>
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
              Add Client
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

export default AddClientModal;
