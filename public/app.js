document.addEventListener('DOMContentLoaded', () => {
  const refreshButton = document.getElementById('refresh-btn');
  refreshButton.addEventListener('click', fetchData);
  fetchData();
});

async function fetchData() {
  const refreshButton = document.getElementById('refresh-btn');
  const errorMessage = document.getElementById('error-message');
  const connection = document.querySelector('.connection');
  const connectionStatus = document.getElementById('connection-status');

  refreshButton.textContent = 'Loading...';
  refreshButton.disabled = true;

  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !Array.isArray(data.users)) {
      throw new Error('API returned an invalid user data response');
    }

    renderTable(data.users);
    updateStats(data.users);
    updateLastUpdated();
    connection.classList.remove('disconnected');
    connectionStatus.textContent = 'API Connected';
    errorMessage.style.display = 'none';
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    errorMessage.textContent = 'Failed to connect to the API. Please check the server and try again.';
    errorMessage.style.display = 'block';
    connection.classList.add('disconnected');
    connectionStatus.textContent = 'API Disconnected';
    document.getElementById('table-body').replaceChildren();
    document.getElementById('stat-total').textContent = '—';
    document.getElementById('stat-active').textContent = '—';
    document.getElementById('stat-inactive').textContent = '—';
    document.getElementById('stat-departments').textContent = '—';
  } finally {
    refreshButton.textContent = 'Refresh Data';
    refreshButton.disabled = false;
  }
}

function renderTable(users) {
  const tableBody = document.getElementById('table-body');
  tableBody.replaceChildren();

  users.forEach((user) => {
    const row = document.createElement('tr');
    const values = [
      user.id,
      user.name,
      user.email,
      user.department,
      user.role
    ];

    values.forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    const isActive = user.status === 'active';
    badge.className = isActive ? 'badge-active' : 'badge-inactive';
    badge.textContent = isActive ? 'Active' : 'Inactive';
    statusCell.appendChild(badge);
    row.appendChild(statusCell);

    const joinedCell = document.createElement('td');
    const [year, month, day] = user.joinedDate.split('-').map(Number);
    joinedCell.textContent = new Date(year, month - 1, day).toLocaleDateString(
      undefined,
      { month: 'short', day: '2-digit', year: 'numeric' }
    );
    row.appendChild(joinedCell);

    tableBody.appendChild(row);
  });
}

function updateStats(users) {
  const activeUsers = users.filter((user) => user.status === 'active').length;
  const inactiveUsers = users.filter((user) => user.status === 'inactive').length;
  const departments = new Set(users.map((user) => user.department)).size;

  document.getElementById('stat-total').textContent = users.length;
  document.getElementById('stat-active').textContent = activeUsers;
  document.getElementById('stat-inactive').textContent = inactiveUsers;
  document.getElementById('stat-departments').textContent = departments;
}

function updateLastUpdated() {
  document.getElementById('last-updated').textContent = new Date().toLocaleTimeString(
    undefined,
    { hour12: false }
  );
}
