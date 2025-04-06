##### Authentication

![hero](https://jorgelorenzom.vercel.app/projects/grocery-planner/hero.jpg)

- Secure authentication implementation with **Google OAuth 2.0**, using token-based authorization flow to validate the user's identity without storing sensitive credentials in the backend.
- User data such as email, name, and profile picture are extracted and processed in the **ASP.NET Core** backend, ensuring fast and secure access to the platform.
- Integration with Google's identity service to verify email authenticity and enhance security through the use of **JWT (JSON Web Token)** and custom claims.
- Integration of Identity for user and role management.

##### Export to PDF

![pdf](https://jorgelorenzom.vercel.app/projects/grocery-planner/pdf.jpg)

- Dynamic generation of **PDF** documents for the shopping list, organized by days and categories, optimizing user experience.
- Implementation of **OpenHTMLToPDF** for HTML-to-PDF conversion with custom styles and rendering optimization.
- The backend, developed in **ASP.NET Core**, receives a request from the frontend to export the list to PDF. It uses a specialized service, `ViewRenderer`, which utilizes **ICompositeViewEngine** to render Razor HTML templates and generate structured content.
- Use of **Razor Templates** to dynamically define the structure and styles of the PDF, ensuring compatibility and flexibility in design.

##### Share List

![lista compartida](https://jorgelorenzom.vercel.app/projects/grocery-planner/index.jpg)

- Implementation of a **sharing feature with unique links**, generated with secure unique identifiers (UUID), allowing real-time collaboration.

##### Add Groceries

![añadir compras](https://jorgelorenzom.vercel.app/projects/grocery-planner/add-grocery.jpg)

- Advanced grocery creation form, with real-time validation and user experience improvements using **ReactiveFormsModule** from Angular.
- Ability to add custom products with name, description, image, link, and category, ensuring flexibility in managing the shopping list.
  ![editar compras](https://jorgelorenzom.vercel.app/projects/grocery-planner/edit-grocery.jpg)
- Editing and deleting products with visual confirmations, ensuring better user interaction.
  ![compras](https://jorgelorenzom.vercel.app/projects/grocery-planner/groceries.jpg)
- Optimized data persistence with **Entity Framework Core** in the backend, ensuring secure and efficient transactions.

##### Lists for Every Occasion

![listas](https://jorgelorenzom.vercel.app/projects/grocery-planner/grocery-lists.jpg)

- Creation and management of multiple categorized shopping lists for different events or needs.
  ![añadir-lista](https://jorgelorenzom.vercel.app/projects/grocery-planner/add-new-grocery-list.jpg)
  ![editar-lista](https://jorgelorenzom.vercel.app/projects/grocery-planner/edit-grocery-list.jpg)

##### Receipt

![recibo](https://jorgelorenzom.vercel.app/projects/grocery-planner/receipt.jpg)

- Automatic generation of a detailed receipt with breakdown of costs for each product and total amount.
- Advanced currency formatting and number presentation using Angular's currency pipe from CommonModule on the frontend to enhance clarity of the information.

This project is developed with an architecture based on **Angular 19 on the frontend and ASP.NET Core on the backend**, ensuring scalability, performance, and enterprise-level maintainability.
