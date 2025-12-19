// src/main.js
// ==========================================
// 入口文件，统一管理各模块逻辑
// ==========================================

// 1. 引入 Firebase 初始化
import { auth, db, storage } from './firebase.js';

// 2. 引入模块功能
import { showNotification, getInitials } from './auth.js';
import { handleLogin, handleRegister, onAuthStateChanged } from './auth.js';
import { renderProducts, redeemProduct } from './product.js';
import { applyAsSeller, uploadProduct } from './merchant.js';
// admin.js、order.js 根据需要再引入

// 3. DOM 元素
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authModal = document.getElementById('authModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const applySellerBtn = document.getElementById('applySellerBtn');
const submitProductBtn = document.getElementById('submitProductBtn');

// 4. 显示/隐藏登录模态框
function showAuthModal() {
  authModal.classList.add('active');
}

function hideAuthModal() {
  authModal.classList.remove('active');
  loginForm.reset();
  registerForm.reset();
}

// 5. 表单切换
switchToRegister.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});
switchToLogin.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

// 6. 登录/注册事件
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  await handleLogin(email, password);
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;
  await handleRegister(email, password, name);
});

// 7. 导航栏按钮
loginBtn.addEventListener('click', showAuthModal);
logoutBtn.addEventListener('click', async () => {
  try {
    await auth.signOut();
    showNotification('已退出登录');
  } catch (error) {
    console.error(error);
    showNotification('退出登录失败', 'error');
  }
});

// 8. 商户功能
applySellerBtn.addEventListener('click', applyAsSeller);
submitProductBtn.addEventListener('click', uploadProduct);

// 9. 监听身份验证状态变化
onAuthStateChanged(auth, async (user) => {
  if (user) hideAuthModal();
  // 更新用户界面
  const { updateUserInterface } = await import('./auth.js');
  updateUserInterface();
});

// 10. 初始渲染商品
renderProducts();

// 11. 全局挂载兑换函数供 HTML 调用
window.redeemProduct = redeemProduct;
