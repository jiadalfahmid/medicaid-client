# Medicaid 

## Multi-Vendor Medicine Selling E-commerce Website

**Admin Username**: admin@medicaid.com  
**Admin Password**: Admin@1  
**Seller Username**: seller@medicaid.com  
**Seller Password**: Seller@1  
**Live Site URL**: [Medicaid](http://medicaid.web.app)

## Features:
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views, ensuring a seamless user experience across all devices.
- **User Authentication**: Secure user registration and login system with options for Google and GitHub social logins.
- **Dynamic Product Pages**: Display medicines by category, with a filterable and sortable interface.
- **Interactive Cart**: Users can add medicines to their cart, adjust quantities, and proceed to checkout with integrated Stripe payment.
- **Admin Dashboard**: Manage users, categories, sales reports, advertisements, and more, with the ability to promote users to sellers or admins.
- **Seller Dashboard**: Sellers can manage their products, view payment history, and request advertisements for their products.
- **Product Slider**: Admins can add or remove product slides to the homepage banner for promotional purposes.
- **Product Details**: Detailed medicine information with images and descriptions available via a modal popup.
- **Sales Reporting**: Generate downloadable reports (PDF, CSV, Excel) for admin and sellers, with filters for data range and status.
- **Invoice Generation**: After a successful payment, users receive a downloadable PDF invoice.
- **CRUD Operations**: All data handling (categories, medicines, user info, etc.) supports create, read, update, and delete operations with sweet alerts for user actions.
- **Secure API Calls**: Environment variables used to protect sensitive data like Firebase and MongoDB credentials.


### Key Features for Users:
- **Sign Up & Login**: Register with your email or via Google/GitHub. You can choose to be a regular user or a seller.
- **Shop Products**: Browse medicines across different categories. Each product has a detailed view with the option to add to the cart.
- **Cart & Checkout**: Add products to the cart, adjust quantities, and complete your purchase using Stripe payment.
- **Invoice Download**: After a successful payment, a PDF invoice is available for download.
- **View Order History**: Track past orders and payments in the user dashboard.

### Key Features for Admins:
- **Manage Users**: Promote or demote users to/from sellers or admins.
- **Manage Categories**: Add, update, or delete product categories.
- **Manage Products**: Oversee all medicines listed on the platform and approve advertisements for the homepage banner.
- **Sales Reporting**: View and download sales reports with filter options for date range and transaction status.
- **Advertise Products**: Manage products featured in the homepage slider section.

### Key Features for Sellers:
- **Manage Medicines**: Add, update, or delete your medicines from the platform.
- **Advertisement Request**: Submit products for advertisement on the homepage slider.
- **Payment History**: View all sales transactions and payment statuses for your products.

### Challenge Part:
- **Pagination, Sorting, and Search**: Implement pagination for medicine tables, allow sorting by price, and provide a search function for medicines based on name, generic name, or company.
- **JWT Token Storage**: Store access tokens in local storage for persistent sessions across page reloads.
- **Date Range Filters**: Filter sales reports by date range and download in different formats (PDF, CSV, Excel).

## Technologies Used:
- **Frontend**: React.js, React Router, TailwindCSS, Swiper.js
- **Backend**: Node.js, Express, MongoDB, Firebase, Stripe API
- **State Management**: React Context API, Tanstack Query
- **Form Handling**: React Hook Form
- **Authentication**: JWT, Firebase Authentication, Google & GitHub OAuth
- **Utilities**: SweetAlert2, React Helmet, PDFMake for invoice generation

## Notes:
- Ensure that all private routes are protected by JWT token validation.
- The admin can add or remove product slides from the homepage, which will appear in the slider section.
- Users, sellers, and admins have different dashboards with features specific to their roles.
- All form data is validated and submitted via React Hook Form to ensure smooth user interaction.
