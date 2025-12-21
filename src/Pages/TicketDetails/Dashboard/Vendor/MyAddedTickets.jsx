import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AddedTicketCard from "./AddedTicketCard";
import Spinner from "../../../../Components/Spinner/Spinner";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vendorTickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/tickets/vendor?email=${user.email}`)).data,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spinner></Spinner>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-error mt-10">
        Failed to load tickets. Try again.
      </p>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-primary">
        My Added Tickets ({tickets.length})
      </h2>

      {tickets.length === 0 ? (
        <p className="text-center text-base-content/70">
          You have not added any tickets yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <AddedTicketCard ticket={ticket} key={ticket._id}></AddedTicketCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
