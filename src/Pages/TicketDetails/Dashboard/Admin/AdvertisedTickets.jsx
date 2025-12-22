import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AdvertisedTickets = () => {
  const axiosSecure = useAxiosSecure()
  const {
    data: tickets = [],
  } = useQuery({
    queryKey: ["adminTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });
  return (
    <>
      <h2 className="font-bold text-3xl text-center py-7 text-primary">Advertise Tickets</h2>
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
            {tickets?.map((t) => (
              t.verificationStatus === "approved" &&
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
                      className="btn btn-xs md:btn-sm btn-success"
                      disabled={
                        t.isAdvertised === true
                      }
                    >
                      Advertise
                    </button>

                    <button
                      className="btn btn-xs md:btn-sm btn-error"
                      disabled={
                        t.isAdvertised === false 
                      }
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
