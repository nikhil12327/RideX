const AdminLayout = ({ children }) => {
    return (
      <div className="min-h-screen bg-slate-950">
        <Sidebar />
        <main className="p-8">
          {children}
        </main>
      </div>
    );
  };