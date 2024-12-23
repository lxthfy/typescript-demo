import { Router } from './router';
//import { ApiService } from './developer/apiService';
//import { ProductView } from './developer/listdev';
import { WelcomePage } from './welcome';
import { UsersTable } from './users/users';
import { constants } from 'buffer';

// Inisialisasi Router
const router = new Router();
const contentId = 'content';

// Halaman Utama (Welcome Page)
const welcomePage = new WelcomePage(contentId);
function loadWelcomePage() {
    const welcomePage = new WelcomePage('content');
    welcomePage.render();
}
//halaman users
function loadUsersPage() {
    const content = document.getElementById(contentId);
    if (content) {
        content.innerHTML = `
            <h1>Daftar Pengguna</h1>
            <table id="usersTable" border="1" style="width: 100%; text-align: left;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data pengguna akan ditambahkan di sini -->
                </tbody>
            </table>
        `;
    }
    const usersTable = new UsersTable('usersTable');
    usersTable.fetchAndDisplayUsers();
}

// Halaman Daftar Produk
// async function loadListPage() {
//     const content = document.getElementById(contentId);
//     if (content) {
//         content.innerHTML = `
//             <h2>Daftar Produk</h2>
//             <table id="products" border="1" style="width: 100%; text-align: left;">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Nama Produk</th>
//                         <th>Harga</th>
//                     </tr>
//                 </thead>
//                 <tbody></tbody>
//             </table>
//         `;
//     }

 //   const apiService = new ApiService('https://localhost:5001/api/products');
 //   const productView = new ProductView('products');
 //   const products = await apiService.getProducts();
 //   productView.renderProducts(products);
//}

// Tambahkan route
router.addRoute('welcome', loadWelcomePage);
router.addRoute('users', loadUsersPage);
//router.addRoute('list', loadListPage);

// Routing untuk halaman yang berbeda
if (window.location.hash === '#list') {
    // Misalnya, routing untuk daftar produk
    console.log('Go to Daftar Produk');
} else {
    // Default route untuk welcome
    loadWelcomePage();
}
// Jalankan Router
router.listen();


// import { ApiService } from './developer/apiService';
// import { ProductView } from './developer/listdev';

// const apiService = new ApiService('https://localhost:5001/api/products');
// const productView = new ProductView('products');

// async function main() {
//     const products = await apiService.getProducts();
//     productView.renderProducts(products);
// }

// // Panggil fungsi utama saat halaman dimuat
// main();
