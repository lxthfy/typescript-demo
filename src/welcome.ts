export class WelcomePage {
    private content: HTMLElement;

    constructor(contentId: string) {
        const content = document.getElementById(contentId);
        if (!content) throw new Error(`Content with id '${contentId}' not found.`);
        this.content = content;
    }

    render(): void {
        this.content.innerHTML = `
            <h2>Selamat Datang!</h2>
            <p>Ini adalah halaman utama aplikasi.</p>
        `;
    }
}
