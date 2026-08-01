function Dashboard() {
  return (
    <>
      <div className="card-grid">

        <div className="dashboard-card">
          <h3>Categories</h3>
          <p>Manage Food Categories</p>
        </div>

        <div className="dashboard-card">
          <h3>Menu Items</h3>
          <p>Add & Edit Items</p>
        </div>

        <div className="dashboard-card">
          <h3>Billing</h3>
          <p>Create Customer Bills</p>
        </div>

        <div className="dashboard-card">
          <h3>Reports</h3>
          <p>Sales & Email Reports</p>
        </div>

      </div>
    </>
  );
}

export default Dashboard;