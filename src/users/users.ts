import axios from 'axios';

// Interface untuk tipe data User
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export class UsersTable {
    private tableBody: HTMLTableSectionElement;

    constructor(tableId: string) {
        const table = document.querySelector<HTMLTableSectionElement>(`#${tableId} tbody`);
        if (!table) {
            throw new Error(`Table with id '${tableId}' not found.`);
        }
        this.tableBody = table;
    }

    public async fetchAndDisplayUsers() {
        try {
            const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
            this.populateTable(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    private populateTable(users: User[]) {
        this.tableBody.innerHTML = ''; // Clear existing rows
        users.forEach(user => {
            const row = this.tableBody.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.website}</td>
            `;
        });
    }
}
