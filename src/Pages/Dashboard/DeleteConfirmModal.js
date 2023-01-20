import React from "react";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({ deleteDoctor, refetch, setDeleteDoctor }) => {
  const { name, email } = deleteDoctor;

  const handleDelete = () => {
    fetch(`https://doctors-portal-server2.onrender.com/doctor/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success(`Doctor ${name} is deleted`);
          setDeleteDoctor(null);
          refetch();
        }
      });
  };
  return (
    <div>
      {/* <!-- The button to open modal --> */}

      {/* <!-- Put this part before </body> tag-- > */}
      <input type="checkbox" id="delete-confirm-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-red-500">
            Are you sure you want to delete ${name}
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div class="modal-action">
            <button class="btn btn-xs btn-error" onClick={() => handleDelete()}>
              Delete
            </button>
            <label for="delete-confirm-modal" class="btn btn-xs">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
