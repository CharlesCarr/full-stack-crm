import { useMutation, useQuery } from "@apollo/client";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addClient } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addClient] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: improve validation later
    if (name === "" || description === "" || clientId === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;
  if (error) return <p>'Something went wrong...'</p>;

  return (
    <div className="w-full flex justify-center items-center">
      {!loading && !error && (
        <>
          <Button onClick={() => setShowModal(true)}>
            <div className="flex items-center justify-center w-full">
              <FaUser className="w-5 h-5" /> <p>New Project</p>
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
                  New Project
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
                    <Label htmlFor="description" value="Description" />
                    <TextInput
                      id="description"
                      required={true}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 block">
                    <Label htmlFor="status" value="Status" />
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-2 block">
                    <Label htmlFor="clientId" value="Client" />
                    <select
                      id="clientId"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="">Select Client</option>
                      {data.client.map((client) => {
                        return (
                          <option key={client.id} value={client.id}>
                            {client.nam}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AddClientModal;
