export class Router {
    private routes: { [key: string]: () => void } = {};

    // Fungsi untuk menambahkan route
    addRoute(route: string, action: () => void): void {
        this.routes[route] = action;
    }

    // Fungsi untuk memproses navigasi
    navigate(route: string): void {
        const action = this.routes[route];
        if (action) {
            action();
        } else {
            console.error(`Route '${route}' not found`);
        }
    }

    // Fungsi untuk memantau perubahan hash di URL
    listen(): void {
        window.addEventListener('hashchange', () => {
            const route = location.hash.slice(1);
            this.navigate(route);
        });

        // Load default route jika ada hash saat halaman dimuat
        this.navigate(location.hash.slice(1) || 'welcome');
    }
}

