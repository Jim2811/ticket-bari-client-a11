import React, { useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const UpdateTicket = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const perks = ["AC", "WiFi", "Meal", "Snack", "Blanket", "Charging Port"];
  const { data: ticket } = useQuery({
    queryKey: ["ticket", id],
    enabled: !!id,
    queryFn: async () => {
      const rest = await axiosSecure.get(`/tickets/${id}`);
      return rest.data;
    },
  });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: ticket,
  });

  const imgbbUrl = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;

  useEffect(() => {
    reset(ticket);
  }, [ticket, reset]);

  const onSubmit = async (data) => {
    try {
      if (data.pricePerUnit) data.pricePerUnit = parseFloat(data.pricePerUnit);
      if (data.quantity) data.quantity = parseInt(data.quantity);

      if (data.departureDateTime)
        data.departureDateTime = new Date(data.departureDateTime);
      if (data.imageFile && data.imageFile.length > 0) {
        const imageFile = data.imageFile[0];
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await fetch(imgbbUrl, {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          data.imageURL = uploadData.data.display_url;
        } else {
          Swal.fire("Error", "Image upload failed!", "error");
          return;
        }
      }

      delete data.imageFile;
      delete data._id;

      axiosSecure.put(`/tickets/${ticket._id}`, data).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ticket updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while updating!", "error");
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-base-200 py-8 px-4">
      <div className="w-full max-w-3xl bg-base-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
          Update Ticket
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Vendor Name</span>
              </label>
              <input
                type="text"
                readOnly
                defaultValue={user?.displayName || "Unknown Vendor"}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Vendor Email</span>
              </label>
              <input
                type="email"
                readOnly
                defaultValue={user?.email || "No Email Found"}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Ticket Title</span>
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. Dhaka → Cox's Bazar AC Bus"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Transport Type</span>
              </label>
              <select
                {...register("transportType")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Transport
                </option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
                <option value="Ship">Ship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">From</span>
              </label>
              <input
                {...register("from")}
                type="text"
                placeholder="From city or location"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">To</span>
              </label>
              <input
                {...register("to")}
                type="text"
                placeholder="To city or location"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Price per Unit (৳)
                </span>
              </label>
              <input
                {...register("pricePerUnit")}
                type="number"
                min="0"
                placeholder="Example: 1500"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Ticket Quantity
                </span>
              </label>
              <input
                {...register("quantity")}
                type="number"
                min="1"
                placeholder="Number of available tickets"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Departure Date & Time
                </span>
              </label>
              <input
                {...register("departureDateTime")}
                type="datetime-local"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Upload Image</span>
              </label>
              <input
                {...register("imageFile")}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Select Perks</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {perks.map((perk) => (
                <label
                  key={perk}
                  className="label cursor-pointer bg-base-200 rounded-lg px-3 py-2 gap-2"
                >
                  <input
                    type="checkbox"
                    value={perk}
                    {...register("perks")}
                    className="checkbox checkbox-primary"
                  />
                  <span>{perk}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateTicket;
