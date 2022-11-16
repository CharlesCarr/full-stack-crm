import { GET_PROSPECT } from "../queries/prospectQueries";
import { UPDATE_PROSPECT } from "../mutations/prospectMutations";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const EditForm = ({ prospect: { prospect }, setShowEditModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: prospect.name,
      position: prospect.position,
      // dmLevel: dmLevel,
      email: prospect.email,
      phone: prospect.phone,
    },
  });

  const name = watch("name");
  const position = watch("position");
  const dmLevel = watch("dmLevel");
  console.log('dmLevel', dmLevel);
  const email = watch("email");
  const phone = watch("phone");

  const [updateProspect] = useMutation(UPDATE_PROSPECT, {
    variables: { id: prospect.id, name, position, dmLevel, email, phone },
    refetchQueries: [{ query: GET_PROSPECT, variables: { id: prospect.id } }],
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log(prospect.id);
    const { name, position, dmLevel, email, phone } = data;
    updateProspect( prospect.id, name, position, dmLevel, email, phone);
    setShowEditModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full justify-center items-center pt-3"
    >
      <label className="w-full">Name</label>
      <div className="flex items-center justify-start border border-black rounded w-full mb-3">
        <input
          className="w-full focus:border-none"
          {...register("name", {
            required: "Name required",
          })}
        />
      </div>
      {errors.name && (
        <span className="text-red-600">{errors.name.message}</span>
      )}

      <label className="w-full">Position</label>
      <div className="flex items-center justify-start border border-black rounded w-full mb-3">
        <input
          placeholder="Position"
          className="w-full focus:border-none"
          {...register("position", {
            required: "Position required",
          })}
        />
      </div>
      {errors.position && (
        <span className="text-red-600">{errors.position.message}</span>
      )}

      <label className="w-full">DM Level</label>
      <div className="flex items-center justify-start border border-black rounded w-full mb-3">
        <select
          name="dmLevel"
          className="w-full focus:border-none"
          {...register("dmLevel", {
            required: "DM Level required",
          })}
        >
          <option value="select">Select DM Level</option>
          <option value="gk">Gatekeeper</option>
          <option value="influencer">Influencer</option>
          <option value="dm">Decision Maker</option>
        </select>
      </div>
      {errors.dmLevel && (
        <span className="text-red-600">{errors.dmLevel.message}</span>
      )}

      <label className="w-full">Email</label>
      <div className="flex items-center justify-start border border-black rounded w-full mb-3">
        <input
          placeholder="user@rapptrlabs.com"
          className="w-full focus:border-none"
          {...register("email", {
            required: "Not a valid email",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Not a valid email",
            },
            maxLength: {
              value: 50,
              message: "Not a valid email",
            },
          })}
        />
      </div>
      {errors.email && (
        <span className="text-red-600">{errors.email.message}</span>
      )}

      <label className="w-full">Phone</label>
      <div className="flex items-center justify-start border border-black rounded w-full mb-6">
        <input
          type="tel"
          className="w-full"
          placeholder="Must be a valid phone number"
          {...register("phone", {
            required: "Not a valid phone number",
            pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}",
          })}
        />
      </div>
      {errors.phone && (
        <span className="text-red-600">Not a valid phone number</span>
      )}

      <input
        type="submit"
        value="Submit"
        className="w-20 border border-black py-2 px-4 rounded-xl cursor-pointer"
      />
    </form>
  );
};

export default EditForm;
