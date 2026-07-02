const RideList = ({

    rides,

  }) => {

  

    return (

  

      <div className="w-full">

  

        <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/40">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[640px] border-collapse text-left text-sm">

              <thead>

                <tr className="border-b border-slate-800/80 bg-slate-900/60">

                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">

                    Pickup

                  </th>

                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">

                    Drop

                  </th>

                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">

                    Fare

                  </th>

                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">

                    Status

                  </th>

                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-6">

                    Created

                  </th>

                </tr>

              </thead>



              <tbody className="divide-y divide-slate-800/60">

                {rides.map(

                  (ride) => (

  

                    <tr

                      key={ride.id}

                      className="group transition-colors hover:bg-slate-800/40"

                    >

  

                      <td className="px-4 py-4 font-medium text-white sm:px-6">

                        <span className="line-clamp-2 max-w-[200px]">

                          {ride.pickup}

                        </span>

                      </td>

  

                      <td className="px-4 py-4 text-slate-300 sm:px-6">

                        <span className="line-clamp-2 max-w-[200px]">

                          {ride.drop}

                        </span>

                      </td>

  

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-yellow-400 sm:px-6">

                        ₹{ride.fare}

                      </td>

  

                      <td className="px-4 py-4 sm:px-6">

                        <span

                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ${

                            ride.status === "pending"

                              ? "bg-yellow-400/10 text-yellow-400 ring-yellow-400/25"

                              : ride.status === "accepted"

                                ? "bg-blue-500/10 text-blue-400 ring-blue-500/25"

                                : ride.status === "arrived"

                                  ? "bg-violet-500/10 text-violet-400 ring-violet-500/25"

                                  : ride.status === "started"

                                    ? "bg-cyan-500/10 text-cyan-400 ring-cyan-500/25"

                                    : ride.status === "completed"

                                      ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/25"

                                      : ride.status === "cancelled"

                                        ? "bg-red-500/10 text-red-400 ring-red-500/25"

                                        : "bg-slate-500/10 text-slate-400 ring-slate-500/25"

                          }`}

                        >

                          {ride.status}

                        </span>

                      </td>

  

                      <td className="whitespace-nowrap px-4 py-4 text-slate-500 sm:px-6">

  

                        {ride.createdAt

                          ? new Date(

                              ride.createdAt

                            ).toLocaleString()

                          : "N/A"}

  

                      </td>

  

                    </tr>

  

                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

  

      </div>

  

    );

  

  };

  

  export default RideList;

