import { Developer } from "./apiService";

export class DeveloperPage {
  private tableBody: HTMLTableSectionElement;
  private developers: Developer[] = [];

  constructor(tableId: string) {
    const table = document.querySelector<HTMLTableSectionElement>(`#${tableId} tbody`);
    if (!table) {
      throw new Error(`Table with id '${tableId}' not found.`);
    }
    this.tableBody = table;

    // Tambahkan event listener untuk form tambah data
    const addForm = document.getElementById("addForm") as HTMLFormElement;
    addForm.addEventListener("submit", this.handleAddDeveloper.bind(this));

    // Tambahkan event listener untuk form edit data
    const editForm = document.getElementById("editForm") as HTMLFormElement;
    editForm.addEventListener("submit", this.handleEditDeveloper.bind(this));

    const closeModal = document.getElementById("closeModal") as HTMLButtonElement;
    closeModal.addEventListener("click", () => {
      const editModal = document.getElementById("editModal") as HTMLDivElement;
      editModal.style.display = "none";
    });
  }

  renderDeveloper(): void {
    this.tableBody.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    this.developers.forEach((dev) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${dev.developerid}</td>
                <td>${dev.name}</td>
                <td>${dev.email}</td>
                <td>${dev.role}</td>
                <td>
                    <button class="edit-btn" data-id="${dev.developerid}">Edit</button>
                </td>
            `;
      this.tableBody.appendChild(row);
    });

    // Tambahkan event listener untuk tombol Edit
    const editBtns = this.tableBody.querySelectorAll(".edit-btn");
    editBtns.forEach((button) => {
      button.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLButtonElement;
        const developerId = target.getAttribute("data-id");
        if (developerId) {
          this.openEditForm(developerId);
        }
      });
    });
  }

  handleAddDeveloper(event: Event): void {
    event.preventDefault();

    const name = (document.getElementById("addName") as HTMLInputElement).value;
    const email = (document.getElementById("addEmail") as HTMLInputElement).value;
    const role = (document.getElementById("addRole") as HTMLInputElement).value;

    const newDeveloper: Developer = {
        developerid: (this.developers.length + 1).toString(),
        name,
        email,
        role,
    };

    this.developers.push(newDeveloper);

    // Simpan data ke localStorage
    localStorage.setItem("developers", JSON.stringify(this.developers));

    this.renderDeveloper();
}

  openEditForm(developerId: string): void {
    const developer = this.developers.find((dev) => dev.developerid === developerId);
    if (!developer) return;

    (document.getElementById("editId") as HTMLInputElement).value = developer.developerid;
    (document.getElementById("editName") as HTMLInputElement).value = developer.name;
    (document.getElementById("editEmail") as HTMLInputElement).value = developer.email;
    (document.getElementById("editRole") as HTMLInputElement).value = developer.role;

    const editModal = document.getElementById("editModal") as HTMLDivElement;
    editModal.style.display = "block";
  }

  handleEditDeveloper(event: Event): void {
    event.preventDefault();

    const developerId = (document.getElementById("editId") as HTMLInputElement).value;
    const name = (document.getElementById("editName") as HTMLInputElement).value;
    const email = (document.getElementById("editEmail") as HTMLInputElement).value;
    const role = (document.getElementById("editRole") as HTMLInputElement).value;

    const developer = this.developers.find((dev) => dev.developerid === developerId);
    if (!developer) return;

    developer.name = name
    developer.email = email;
    developer.role = role;

    // Simpan data ke localStorage
    localStorage.setItem("developers", JSON.stringify(this.developers));

    this.renderDeveloper();

    const editModal = document.getElementById("editModal") as HTMLDivElement;
    editModal.style.display = "none";
}
}
