# ShopMini - Bài thực hành 03

Ứng dụng cửa hàng ShopMini xây dựng bằng React, TypeScript (Vite), React Router DOM, Context API và Redux Toolkit.

## Quản lý State trong dự án

### 1. Local State (`useState`)

- **Dữ liệu lưu trữ:**
  - Từ khóa tìm kiếm sản phẩm (`searchTerm`) tại `HomePage.tsx`.
  - Dữ liệu nhập trên form (`username`, `password`) và thông báo lỗi đăng nhập (`error`) tại `LoginPage.tsx`.
  - Trạng thái xác nhận đã đặt hàng (`isOrdered`) tại `CheckoutPage.tsx`.
- **Lý do lựa chọn:** Dữ liệu cục bộ, chỉ phục vụ cho giao diện của một trang duy nhất và không cần chia sẻ sang các component khác. Dùng `useState` giúp code đơn giản và tối ưu hiệu năng.

### 2. Context API

- **Dữ liệu lưu trữ:**
  - Trạng thái giao diện Sáng/Tối (`theme`) và hàm chuyển đổi (`toggleTheme`) trong `ThemeContext.tsx`.
  - Thông tin người dùng đăng nhập (`user`) cùng các hàm `login`, `logout` trong `AuthContext.tsx`.
- **Lý do lựa chọn:** Giao diện và trạng thái đăng nhập cần được truy cập ở nhiều nơi (`Header`, `ProtectedRoute`, `LoginPage`, `CheckoutPage`) nhưng ít khi thay đổi và không có logic xử lý phức tạp. Context API giúp truyền dữ liệu xuyên suốt cây component mà không cần truyền props qua nhiều cấp (prop drilling).

### 3. Redux Toolkit

- **Dữ liệu lưu trữ:**
  - Danh sách sản phẩm lấy từ API (`items`), trạng thái gọi API (`status`: `loading`, `succeeded`, `failed`) và thông báo lỗi (`error`) trong `productsSlice.ts`.
  - Danh sách sản phẩm trong giỏ hàng (`items`) và các thao tác `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` cùng selector tính tổng số lượng, tổng tiền trong `cartSlice.ts`.
- **Lý do lựa chọn:** Dữ liệu sản phẩm và giỏ hàng là dữ liệu dùng chung quan trọng, được nhiều trang và component đọc/cập nhật liên tục. Redux Toolkit giúp quản lý tập trung, hỗ trợ xử lý bất đồng bộ với `createAsyncThunk` và tách biệt rõ ràng giữa giao diện với logic xử lý dữ liệu.
