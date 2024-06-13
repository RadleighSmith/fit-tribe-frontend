![FitTribe Frontend Banner](docs/readme_images/frontend_banner.png)

# FitTribe Frontend

**Developer : Radleigh Smith**

Welcome to the FitTribe frontend documentation. Developed with ReactJS, FitTribe's frontend provides a dynamic and engaging interface for our users. Here, members can explore and share their fitness journeys, interact with others in the community, and access a variety of fitness resources and tutorials. The intuitive design ensures a user-friendly experience, allowing users to create, update, and delete posts, follow other users, and participate in discussions through comments. This documentation will guide you through the features and functionalities available on FitTribe.

**Live links:**

Live Site Link: [FitTribe](https://fittribe-876c83cc52a2.herokuapp.com/)

Live API Site Link: [FitTribe API Backend](https://fit-tribe-api-97fb1c20a2ee.herokuapp.com/)

Backend Repo Link: [FitTribe Backend Repo](https://github.com/RadleighSmith/fit-tribe-api)



## Contents

[Planning](#planning)

- [The Strategy Plane](#the-strategy-plane)

- [The Scope Plane](#the-scope-plane)

- [The Structure Plane](#the-structure-plane)

- [The Skeleton Plane](#the-skeleton-plane)

- [The Surface Plane](#the-surface-plane)

[Features](#features)

- [Current Features](#current-features)

- [Future Features](#future-features)

[Languages](#languages)

[Frameworks and Libraries](#frameworks-and-libraries)

[Tools and Technologies](#tools-and-technologies)

[Testing and Validation](#testing-and-validation)

[Bugs & Fixes](#bugs--fixes)

[Cloning this Repository](#cloning-this-repository)

[Forking a Branch](#forking-a-branch)

[Credits](#credits)

[Achnowledgements](#achnowledgements)

--- 

## Planning

### The Strategy Plane

#### Why We Are Building the Project:

The primary motivation behind this project is to create a centralized platform for fitness enthusiasts to connect, share, and support each other in their fitness journeys. Current fitness resources are fragmented across various platforms, making it challenging for users to find comprehensive information and engage with a supportive community. By addressing these issues, we aim to provide a safe, privacy-focused space for users to achieve their fitness goals.

#### Product Description:

Our fitness social media site is designed to be a comprehensive platform where users can create accounts, log in, and share their fitness experiences through workout posts, blogs, and regular updates. Users can follow other members, like and comment on posts, view profiles, and join groups centered around specific fitness interests. The platform is built with user safety in mind, incorporating robust privacy settings and age verification to ensure all members are over the age of 18.

#### Target Audience:

Our target audience includes:
- Adults aged over 18.
- Fitness enthusiasts looking for a community to share and gain knowledge.
- Gym-goers seeking workout inspiration and tips.
- Personal trainers and fitness professionals wanting to connect with clients and peers.
- Nutritionists interested in sharing and learning about diet and fitness.
- Health-conscious individuals aiming to improve their lifestyle.
- Athletes seeking specialized fitness content and community support.

#### Problem Statement:

There is currently a lack of centralized platforms where fitness enthusiasts can connect, share, and support each other while ensuring their privacy and safety. This fragmentation makes it difficult for users to find reliable fitness information and engage with a cohesive community.

#### Project Aim:

Our aim is to develop a user-friendly fitness social media platform that provides a centralized space for users to share workout routines, blogs, and regular posts, connect with like-minded individuals, and participate in supportive communities. We are committed to creating an environment where users can interact freely, confident in the knowledge that their privacy is protected and all users are over the age of 18. Through this, we hope to empower users to achieve their fitness goals in a safe and supportive online community.
By focusing on these aspects within the strategy plane, we ensure that our project is aligned with user needs and our product objectives, setting a strong foundation for the subsequent stages of development.


### The Scope Plane

Guided by our product strategy, the scope plane outlines the specific features and functions that our fitness social media site will include. These features are designed to meet the needs of our target audience and support our project aims.

#### User Accounts:
- Account creation and secure login
- Profile customization (profile picture, bio, profile banner, etc.)
- Age verification process to ensure users are over 18

#### Content Creation and Sharing:
- Ability to create and share workout posts (including text, images, and videos)
- Blog writing and publishing platform
- Regular posts for status updates and fitness milestones

#### Interaction and Community Engagement:
- Follow/unfollow other users
- Like and comment on blogs and workouts
- View other users' profiles and blogs and workouts
- Join and participate in groups and group events centered around specific fitness interests

#### Privacy and Safety:
- Content moderation tools to prevent inappropriate or harmful content
- Secure authentication to protect user accounts

#### Navigation and User Interface:
- Intuitive home feed displaying recent posts from followed users and groups
- Search function to find users and specific posts
- Notifications for interactions (likes, comments, follows)

__Exclusions:__

To maintain focus and manage development resources effectively, certain features will be outside the scope of the initial release. These include:

- __Advanced Fitness Tracking and Analytics:__ Comprehensive tracking of fitness metrics, detailed analytics, and performance summaries.

- __Integration with External Fitness Devices and Apps__: Compatibility with fitness trackers, smartwatches, and other health apps.

- __E-commerce Functionalities:__ Features for selling fitness products or services directly on the platform.

- __Educational Content:__ In-depth articles, videos, and tutorials related to fitness, nutrition, and wellness.

- __Group Discussion Threads and Posts:__ Advanced functionalities for group discussions and community posts.

- __Enhanced Privacy Settings:__ More robust options for controlling who can view user content and profile information.

- __User Instant Messaging:__ Real-time chat capabilities between users.

- __User-Generated Events:__ Features allowing users to create, manage, and join fitness-related events.

- __Custom Workout Plans:__ Personalized workout routines generated based on user goals and preferences.

- __Diet and Nutrition Tracking:__ Tools for logging meals, tracking macros, and receiving dietary advice.

- __Professional Consultations:__ Integration with fitness trainers, nutritionists, and health consultants for booking sessions

- __Video Streaming and Live Workouts:__ Hosting live workout sessions and video classes.

- __Automated Workout Suggestions:__ AI-driven suggestions for workouts based on user performance and goals.

- __Leaderboard and Competitions:__ Gamification elements such as leaderboards and fitness challenges.

- __Detailed Progress Reports:__ Generation of detailed reports tracking user progress over time.

- __Third-Party App Integrations:__ Seamless integration with other popular health and fitness apps.

- __Advanced Social Features:__ Including features like fitness communities, follower recommendations, and trending workouts.

By clearly defining the scope, we ensure that our development efforts are concentrated on delivering the most critical features and functions that align with our strategic goals and meet the needs of our users. This focused approach allows us to create a robust and user-friendly platform within a manageable timeline and budget.

#### User Stories:

__User stories here__ 

### The Structure Plane

The structure plane focuses on defining how the various features and functions of our fitness social media site fit together. This includes outlining the information architecture and the user flow, ensuring a seamless and intuitive experience for our users.

#### Site Map

This site diagram, crafted using [Lucidchart](https://www.lucidchart.com/), offers a structured overview of our platform's architecture and user navigation. It serves as a clear visualization of the pathways and interactions within the system, with each element precisely positioned to illustrate the flow of information and user movement.

![FitTribe Site Map Diagram](docs/readme_images/site_map.png)

---
#### Database Plan

This diagram presents a comprehensive overview of our database structure, meticulously crafted using Lucidchart. It visually represents the relationships between various entities and the flow of data within our system.

We've chosen PostgreSQL as our database solution for its robust features, reliability, and cost-effectiveness as an open-source relational database system. To meet our hosting needs, we've selected ElephantSQL, a trusted platform renowned for its seamless PostgreSQL hosting services. This strategic choice ensures our database management is efficient, secure, and scalable, aligning perfectly with our business objectives.

![FitTribe Entity Relationship Diagram (ERD)](docs/readme_images/erd_diagram.png)

### The Skeleton Plane

We developed wireframes for desktop, tablet, and mobile views to outline the layout and design of our website across different devices. These wireframes act as a blueprint for our site's structure, showing the placement of elements, navigation flow, and overall user interface design. By creating these wireframes, we can clearly communicate our design concepts, collaborate with stakeholders, gather feedback, and make informed decisions before moving into the development phase.

Using [Uizard's](https://app.uizard.io/), an innovative wireframing tool, we streamlined the wireframing process, enhancing our design iteration cycles. [Uizard's](https://app.uizard.io/) intuitive interface allows us to quickly transform ideas into concrete wireframes, saving time and effort. With [Uizard's](https://app.uizard.io/), we can easily experiment with different layouts, iterate on design variations, and visualize our website's appearance and functionality across various devices.

#### Wireframes:

**Landing Page: (This is the Homepage of a user that is not authenticated)**

<details>
<summary>
Desktop
</summary>

![Desktop Landing Page Wireframes](docs/readme_images/wireframes/desktop/landing_page.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Landing Page Wireframes](docs/readme_images/wireframes/tablet/landing_page_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Landing Page Wireframes](docs/readme_images/wireframes/mobile/landing_page_mobile.png)
</details>

<br>

**Homepage: (This is the homepage of authenticated users)**

<details>
<summary>
Desktop
</summary>

![Desktop Homepage Wireframes](docs/readme_images/wireframes/desktop/homepage.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Homepage Wireframes](docs/readme_images/wireframes/tablet/homepage_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Homepage Wireframes](docs/readme_images/wireframes/mobile/homepage_mobile.png)
</details>

<br>

**Login Page:**

<details>
<summary>
Desktop
</summary>

![Desktop Login Wireframes](docs/readme_images/wireframes/desktop/login.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Login Wireframes](docs/readme_images/wireframes/tablet/login_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Login Wireframes](docs/readme_images/wireframes/mobile/login_mobile.png)
</details>

<br>

**Account Creation:**

<details>
<summary>
Desktop
</summary>

![Desktop Account Creation Wireframes](docs/readme_images/wireframes/desktop/account_creation.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Account Creation Wireframes](docs/readme_images/wireframes/tablet/account_creation_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Account Creation Wireframes](docs/readme_images/wireframes/mobile/account_creation_mobile.png)
</details>

<br>

**Blog Creation Page**

<details>
<summary>
Desktop
</summary>

![Desktop Blog Creation Wireframes](docs/readme_images/wireframes/desktop/blog_creation.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Blog Creation Wireframes](docs/readme_images/wireframes/tablet/blog_creation_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Blog Creation Wireframes](docs/readme_images/wireframes/mobile/blog_creation_mobile.png)
</details>

<br>

**Workout Creation Page**

<details>
<summary>
Desktop
</summary>

![Desktop Workout Creation Wireframes](docs/readme_images/wireframes/desktop/workout_creation.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Workout Creation Wireframes](docs/readme_images/wireframes/tablet/workout_creation_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Workout Creation Wireframes](docs/readme_images/wireframes/mobile/workout_creation_mobile.png)
</details>

<br>

**Blog / Workout Detail Page**

<details>
<summary>
Desktop
</summary>

![Desktop Blog and Workout Detail Page Wireframes](docs/readme_images/wireframes/desktop/blog_workout_details_page.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Blog and Workout Detail Page Wireframes](docs/readme_images/wireframes/tablet/blog_workout_details_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Blog and Workout Detail Page Wireframes](docs/readme_images/wireframes/mobile/blog_workout_details_mobile.png)
</details>

<br>

**Profile Page**

<details>
<summary>
Desktop
</summary>

![Desktop Profile Wireframes](docs/readme_images/wireframes/desktop/profile.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Table Profile Wireframes](docs/readme_images/wireframes/tablet/profile_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Profile Wireframes](docs/readme_images/wireframes/mobile/profile_mobile.png)
</details>

<br>

**Admin Page**

<details>
<summary>
Desktop
</summary>

![Desktop Admin Page Wireframes](docs/readme_images/wireframes/desktop/admin_panel.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Admin Page Wireframes](docs/readme_images/wireframes/tablet/admin_panel_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Admin Page Wireframes](docs/readme_images/wireframes/mobile/admin_panel_mobile.png)
</details>

<br>

**Group Creation Page**

<details>
<summary>
Desktop
</summary>

![Desktop Group Creation Wireframes](docs/readme_images/wireframes/desktop/group_creation.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Group Creation Wireframes](docs/readme_images/wireframes/tablet/group_creation_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Group Creation Wireframes](docs/readme_images/wireframes/mobile/group_creation_mobile.png)
</details>

<br>

**Group Detail Page**

<details>
<summary>
Desktop
</summary>

![Desktop Group Detail Wireframes](docs/readme_images/wireframes/desktop/group_detail.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Group Detail Wireframes](docs/readme_images/wireframes/tablet/group_detail_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Group Detail Wireframes](docs/readme_images/wireframes/mobile/group_detail_mobile.png)
</details>

<br>

**Event Creation Page**

<details>
<summary>
Desktop
</summary>

![Desktop Event Creation Page Wireframes](docs/readme_images/wireframes/desktop/event_creation.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Event Creation Page Wireframes](docs/readme_images/wireframes/tablet/event_creation_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Event Creation Page Wireframes](docs/readme_images/wireframes/mobile/event_creation_mobile.png)
</details>

<br>

**Event Details Page**

<details>
<summary>
Desktop
</summary>

![Desktop Event Detail Page Wireframes](docs/readme_images/wireframes/desktop/event_detail.png)
</details>
<details>
<summary>
Tablet
</summary>
 
![Tablet Event Detail Page Wireframes](docs/readme_images/wireframes/tablet/event_detail_tablet.png)
</details>
<details>
<summary>
Mobile
</summary>

![Mobile Event Detail Page Wireframes](docs/readme_images/wireframes/mobile/event_detail_mobile.png)
</details>

<br>

### The Surface Plane

#### Colour Scheme

In the colour scheme section of our Surface Plane, we've carefully selected a palette that enhances the overall user experience while reflecting our design goals. Our approach balances clean, minimalist design with vibrant accents to guide user attention and encourage engagement.

__Background and Component Colours__

- __Contrasting Background:__ #F0F0F0 - This light grey shade provides a subtle contrast against the primary white background, adding depth and dimension to the overall design.

- __Component Background:__ #FFFFFF - Pure white is used for the background of components, creating a clean and spacious feel that ensures readability and focus on content.

__Primary and Accent Colours__

__Main Colour:__ #5ac8fa - A vibrant blue hue is used for primary elements and call-to-action items, drawing users' attention and encouraging interaction. This colour adds a fresh and energetic vibe to the site.

__Contrast Colour:__ #2992a5 - A deeper blue is used to contrast the main blue colour, providing variety and visual interest while maintaining a cohesive colour scheme.

__Text and Shadows__

__Text Colour:__ #000000 - Black is used for text elements, ensuring maximum readability and sharp contrast against lighter backgrounds. This choice promotes clarity and ease of reading across all sections of the website.

__Shadow Colour:__ #000000 - Subtle shadows using black help to create depth and highlight interactive elements, enhancing the overall user experience.

![Colour Preview](docs/readme_images/colour-preview.png)

To ensure our chosen colour scheme meets accessibility standards and provides optimal readability for all users, we employed a [contrast grid](https://contrast-grid.eightshapes.com/) to evaluate the contrast ratios between text and background colours. This systematic approach allows us to assess the colour combinations used throughout the website and verify adherence to accessibility guidelines.

![Contrast Grid](docs/readme_images/colour-contrast-grid.png)

Overall, our carefully curated colour scheme aims to create a harmonious and visually appealing experience for our users, balancing contrast, readability, and engagement throughout the website. This palette ensures that our design is inclusive and accessible to all users, including those with visual impairments or disabilities.

#### Typography

In crafting our website's visual identity, we've carefully selected typography to ensure optimal readability and aesthetic appeal. Our choices of Monserrat and Roboto Mono work in harmony to create a clean, modern, and distinctive appearance across all text elements.

__Content Text__

Font: Monserrat

Usage: Monserrat is used for body text, providing a clean and modern look that enhances readability. Its sleek and contemporary design ensures that lengthy descriptions and informative articles are easy to read, contributing to a seamless user experience.

__Titles and Headers__

Font: Roboto Mono

Usage: Roboto Mono is employed for titles and headers, offering a distinctive and stylish appearance that helps differentiate headings from body text. Its unique, monospaced design commands attention and adds a touch of sophistication to our headers, making them stand out while maintaining readability across different devices and screen sizes.

By combining Monserrat and Roboto Mono, we've created a balanced typographic system that ensures both functionality and visual appeal, enhancing the overall user experience on our website.

## Features

### Current Features

### Future Features

## Languages

## Frameworks and Libraries

## Tools and Technologies

## Testing and Validation

## Bugs & Fixes

## Cloning this Repository

## Forking a Branch

## Credits

## Achnowledgements

