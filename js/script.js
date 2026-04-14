// ========================================
// Load dashboard content from JSON
// ========================================
fetch("data/dashboard.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    loadSummaryCards(data.summaryCards);
    loadUnresolvedTickets(data.unresolvedTickets);
    loadTasks(data.tasks);
  })
  .catch(function (error) {
    console.log("Error loading JSON:", error);
  });

// ========================================
// Summary cards
// ========================================
function loadSummaryCards(cards) {
  const summaryContainer = document.getElementById("summary-cards");
  let cardsHTML = "";

  cards.forEach(function (card) {
    cardsHTML += `
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card summary-card h-100">
          <div class="card-body text-center">
            <h2 class="card-title">${card.title}</h2>
            <p class="summary-number mb-0">${card.number}</p>
          </div>
        </div>
      </div>
    `;
  });

  summaryContainer.innerHTML = cardsHTML;
}

// ========================================
// Unresolved tickets
// ========================================
function loadUnresolvedTickets(ticketData) {
  const unresolvedContainer = document.getElementById("unresolved-container");
  let ticketItemsHTML = "";

  ticketData.items.forEach(function (item) {
    ticketItemsHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${item.name}</span>
        <span>${item.count}</span>
      </li>
    `;
  });

  unresolvedContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2 class="section-title mb-1">${ticketData.title}</h2>
        <p class="small-text mb-0">${ticketData.group}</p>
      </div>
      <a href="#" class="view-link">${ticketData.linkText}</a>
    </div>

    <ul class="list-group list-group-flush">
      ${ticketItemsHTML}
    </ul>
  `;
}

// ========================================
// Tasks
// ========================================
function loadTasks(taskData) {
  const tasksContainer = document.getElementById("tasks-container");
  let taskItemsHTML = "";

  taskData.items.forEach(function (item, index) {
    const circleClass = item.done
      ? "task-circle task-circle-filled task-toggle-btn"
      : "task-circle task-toggle-btn";

    const circleText = item.done ? "✓" : "";

    taskItemsHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <button
            class="${circleClass}"
            data-index="${index}"
            type="button"
            aria-label="Toggle task"
          >${circleText}</button>
          <span>${item.name}</span>
        </div>
        <span class="badge rounded-pill ${item.statusClass}">${item.status}</span>
      </li>
    `;
  });

  tasksContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2 class="section-title mb-1">${taskData.title}</h2>
        <p class="small-text mb-0">${taskData.group}</p>
      </div>
      <a href="#" class="view-link">${taskData.linkText}</a>
    </div>

    <div class="create-task-row d-flex justify-content-between align-items-center">
      <span class="create-task-text">Create new task</span>

      <button
        class="create-task-plus border-0"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"
        aria-label="Create task"
      >
        <i class="bi bi-plus"></i>
      </button>
    </div>

    <ul class="list-group list-group-flush task-list">
      ${taskItemsHTML}
    </ul>
  `;

  const toggleButtons = document.querySelectorAll(".task-toggle-btn");

  toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (this.classList.contains("task-circle-filled")) {
        this.classList.remove("task-circle-filled");
        this.textContent = "";
      } else {
        this.classList.add("task-circle-filled");
        this.textContent = "✓";
      }
    });
  });
}