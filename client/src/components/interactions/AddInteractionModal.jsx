import { useMutation } from "@apollo/client";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GET_INTERACTIONS } from "../../queries/interactionQueries";
import { ADD_INTERACTION } from "../../mutations/interactionMutations";
import { useParams } from "react-router-dom";

const AddInteractionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("");

  const { id: prospectId } = useParams();
 
  const [addInteraction] = useMutation(ADD_INTERACTION, {
    variables: { date, notes, type, outcome, prospectId },
    update(cache, { data: { addInteraction } }) {
      const { interactions } = cache.readQuery({ query: GET_INTERACTIONS });
      cache.writeQuery({
        query: GET_INTERACTIONS,
        data: { interactions: [...interactions, addInteraction] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: improve validation later
    if (date === "" || type === "" || notes === "" || outcome === "") {
      return alert("Please fill in all fields");
    }

    console.log('date', date, typeof date);
    console.log('notes', notes, typeof notes);
    console.log('type', type, typeof type);
    console.log('outcome', outcome, typeof outcome);
    console.log('prospectId', prospectId, typeof prospectId);

    addInteraction(date, notes, type, outcome, prospectId);

    setDate("");
    setType("");
    setNotes("");
    setOutcome("");

    setShowModal(false);
  };

  return (
    <div className="w-1/2 flex justify-end items-center">
      <Button onClick={() => setShowModal(true)}>
        <div className="flex items-center justify-center w-full">
          <FaUser className="w-6 h-6 mr-4" /> <p>New Interaction</p>
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
              New Interaction
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
                <TextInput
                  id="date"
                  required={true}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Type" />
                <TextInput
                  id="type"
                  required={true}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
              <div className="mb-2 block">
                <Label htmlFor="outcome" value="Outcome" />
                <TextInput
                  id="outcome"
                  required={true}
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
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

export default AddInteractionModal;
