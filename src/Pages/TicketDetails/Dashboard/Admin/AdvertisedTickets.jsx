import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertisedTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch, isLoading } = useQuery({
    queryKey: ["adminTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-10 font-medium text-gray-500">
        Loading...
      </p>
    );

  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  const handleAdvertise = async (ticket) => {
    if (advertisedCount >= 6) {
      Swal.fire({
        icon: "error",
        title: "Limit reached!",
        text: "Sorry, you can not advertise more than 6 tickets.",
      });
      return;
    }

    try {
      const res = await axiosSecure.put(`/tickets/${ticket._id}`, {
        isAdvertised: true,
      });

      if (res.data.success) {
        Swal.fire("Advertised!", res.data.message, "success");
        refetch();
      } else {
        Swal.fire("Info!", res.data.message || "No change detected.", "info");
      }
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Something went wrong!",
        "error"
      );
    }
  };

  const handleHalt = async (ticket) => {
    try {
      const res = await axiosSecure.put(`/tickets/${ticket._id}`, {
        isAdvertised: false,
      });
      if (res.data.success) {
        Swal.fire("Removed!", res.data.message, "success");
        refetch();
      } else {
        Swal.fire("Info!", res.data.message || "No change detected.", "info");
      }
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Something went wrong!",
        "error"
      );
    }
  };

  return (
    <>
      <h2 className="font-bold text-3xl text-center py-7 text-primary">
        Advertise Tickets
      </h2>

      <div className="overflow-x-auto bg-base-100 mx-auto shadow-2xl rounded-2xl mb-5">
        <table className="table table-zebra min-w-[1100px]">
          <thead className="bg-base-200">
            <tr className="text-sm md:text-base">
              <th>Title</th>
              <th>Route</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Type</th>
              <th>Created</th>
              <th>Departure</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets
              ?.filter((t) => t.verificationStatus === "approved")
              ?.map((t) => (
                <tr key={t._id} className="hover text-sm md:text-base">
                  <td className="font-semibold whitespace-nowrap">{t.title}</td>
                  <td className="whitespace-nowrap">
                    {t.from} → {t.to}
                  </td>
                  <td>
                    <p className="font-medium">{t.vendorName || "N/A"}</p>
                    <p className="text-xs text-gray-500">{t.vendorEmail}</p>
                  </td>
                  <td>৳ {t.pricePerUnit}</td>
                  <td className="capitalize">{t.transportType}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                  <td>{new Date(t.departureDateTime).toLocaleString()}</td>
                  <td>
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleAdvertise(t)}
                        className="btn btn-xs md:btn-sm btn-success"
                        disabled={t.isAdvertised === true}
                      >
                        Advertise
                      </button>
                      <button
                        onClick={() => handleHalt(t)}
                        className="btn btn-xs md:btn-sm btn-error"
                        disabled={t.isAdvertised === false}
                      >
                        Halt
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-center py-10 text-gray-500 font-medium">
            No tickets found.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3 md:hidden">
        Swipe left ↔ to view full table
      </p>
    </>
  );
};

export default AdvertisedTickets;