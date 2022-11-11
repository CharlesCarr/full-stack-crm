import { useMutation } from "@apollo/client";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_ACCOUNT } from "../../mutations/accountMutations";
import { GET_ACCOUNTS } from "../../queries/accountQueries";

const AddAccountModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const [addAccount] = useMutation(ADD_ACCOUNT, {
    variables: { name, size, industry, description, notes },
    update(cache, { data: { addAccount } }) {
      const { accounts } = cache.readQuery({ query: GET_ACCOUNTS });
      cache.writeQuery({
        query: GET_ACCOUNTS,
        data: { accounts: [...accounts, addAccount] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: improve validation later
    if (name === "" || size === "" || industry === "" || description === "" || notes === "") {
      return alert("Please fill in all fields");
    }

    addAccount(name, size, industry, description, notes);

    setName("");
    setSize("");
    setIndustry("");
    setDescription("");
    setNotes("");
    setShowModal(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Button onClick={() => setShowModal(true)} className="mb-10">
        <div className="flex items-center justify-center w-full">
          <FaUser className="w-10 h-10" /> <p>Add Account</p>
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
              Add Account
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
                <Label htmlFor="size" value="Size" />
                <TextInput
                  id="size"
                  required={true}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="industry" value="Industry" />
                <TextInput
                  id="industry"
                  required={true}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
                <TextInput
                  id="description"
                  required={true}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="notes" value="Notes" />
                <TextInput
                  id="notes"
                  required={true}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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

export default AddAccountModal;
