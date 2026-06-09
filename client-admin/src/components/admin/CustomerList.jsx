const CustomerList = ({
    customers,
  }) => {
  
    return (
  
      <div className="mt-10">
  
        <h2 className="text-2xl font-bold mb-4">
  
          Customers
  
        </h2>
  
        {customers.map(
          (customer) => (
  
            <div
              key={customer.id}
              className="bg-zinc-900 p-4 rounded-xl mb-3"
            >
  
              <p className="font-bold">
  
                {customer.name}
  
              </p>
  
              <p className="text-zinc-400">
  
                {customer.email}
  
              </p>
  
            </div>
  
          )
        )}
  
      </div>
  
    );
  
  };
  
  export default CustomerList;