# Testing and Validation

## Contents

[Code Validation](#code-validation)

[User Story Testing](#user-story-testing)

[Accessibility Testing](#accessibility-testing)

[Compatibility Testing](#compatibility-testing)

---

## Code Validation

### JavaScript Validation

### ESLint Error Fixes

In our project, we leveraged [ESLint](https://eslint.org/) to maintain code quality and consistency throughout our JavaScript and React (JSX) codebase. ESLint helped us identify potential errors and deviations from our coding standards, ensuring our code remained clean and maintainable. By configuring ESLint with specific rules, we tailored it to meet our project's requirements and coding style.

One of the most beneficial features we utilized was the --fix command. By running eslint --fix src/**/*.{js,jsx}, we automatically corrected numerous common formatting and syntactical errors, such as incorrect quotation marks, missing semicolons, and inconsistent spacing. This automated fixing process significantly reduced the time and effort required to address these issues manually, allowing our development team to focus on more complex and critical aspects of the project.

However, there were some errors that could not be fixed automatically using the --fix command. These required manual intervention to ensure compliance with our coding standards. Below is a table summarizing the errors that were manually fixed:

---

| **File**                                 | **Error**                                                                                      | **Fix**                                                                                                                                   | **Result** |
|------------------------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|------------|
| /workspace/fit-tribe-frontend/src/components/LoggedInHomePage.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/components/LoggedOutHomePage.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/auth/LoginForm.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/blogs/BlogCreateForm.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/blogs/BlogEditForm.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/group_events/EventCreateForm.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/group_events/EventEditPage.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/groups/GroupCreateForm.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |
| /workspace/fit-tribe-frontend/src/pages/groups/GroupEditPage.js | `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`                                  | Escaped characters using `&apos;`                                                                                                         | Passed     |

---

### CSS Validation

#### W3C CSS Validation Results

We utilized the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/#validate_by_input) to ensure all our CSS files adhere to modern web standards, confirming they are error-free and optimized for cross-browser compatibility.

| File Name                     | Result |
|-------------------------------|--------|
| Background.module.css         | Passed |
| BlogCard.module.css           | Passed |
| BlogCreateForm.module.css     | Passed |
| BlogDetailForm.module.css     | Passed |
| BlogsPage.module.css          | Passed |
| Button.module.css             | Passed |
| Comment.module.css            | Passed |
| Divider.module.css            | Passed |
| EventDetailPage.module.css    | Passed |
| Form.module.css               | Passed |
| GroupDetailsPage.module.css   | Passed |
| GroupsPage.module.css         | Passed |
| Loader.module.css             | Passed |
| LoggedOutHomePage.module.css  | Passed |
| LoginSignUpForm.module.css    | Passed |
| ProfilePage.module.css        | Passed |
| ProfilePicture.module.css     | Passed |
| SideNavBar.module.css         | Passed |
| TopNavBar.module.css          | Passed |


## User Story Testing


| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a new user, I can create an account so that I can access the FitTribe platform and start using its features.    | **AC 1**: The registration form should include fields for username, email, password, and confirmation of the password. | PASS       |
|                                                                                                                   | **AC 2**: The system should validate that the email is in the correct format and that the password meets security requirements (e.g., minimum length, contains letters and numbers). | PASS       |
|                                                                                                                   | **AC 3**: If any field is incorrect or missing, the user should see an error message indicating the issue.          | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a returning user, I can login so that I can access my account and personalized content on the FitTribe platform.| **AC 1**: The login form should include fields for email and password.                                            | PASS       |
|                                                                                                                   | **AC 2**: The system should validate that the email and password match an existing account.                      | PASS       |
|                                                                                                                   | **AC 3**: Upon successful login, the user should be redirected to their feed homepage.                           | PASS       |
|                                                                                                                   | **AC 4**: If the email or password is incorrect, the user should see an error message indicating invalid credentials. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a logged-in user, I can logout so that I can securely end my session on the FitTribe platform.                  | **AC 1**: There should be a visible "Logout" button or link available in the navigation menu when the user is logged in. | PASS       |
|                                                                                                                   | **AC 2**: Clicking the "Logout" button should immediately log the user out and invalidate their session.          | PASS       |
|                                                                                                                   | **AC 3**: After logging out, the user should be redirected to the homepage or login page.                         | PASS       |
|                                                                                                                   | **AC 4**: Any attempt to access authenticated-only pages after logging out should redirect the user to the login page. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a new user, I can create a profile so that I can share information about myself and my fitness goals with the FitTribe community. | **AC 1**: The profile should include fields for real name, profile picture, cover photo, and bio. | PASS |
|                                                                                                                   | **AC 2**: The system should validate the uploaded profile picture format and size. | PASS |
|                                                                                                                   | **AC 3**: The user should be able to save their profile information. | PASS |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can edit my profile so that I can update my personal information as needed.                          | **AC 1**: There should be an "Edit Profile" button on the user’s profile page if they are the owner.             | PASS       |
|                                                                                                                   | **AC 2**: Clicking the "Edit Profile" button should open a form pre-filled with the user's current profile information including name, profile picture, cover photo, bio. | PASS       |
|                                                                                                                   | **AC 3**: The system should validate the updated profile information, including the format and size of the uploaded pictures. | PASS       |
|                                                                                                                   | **AC 4**: If any mandatory fields are missing or incorrectly filled, the user should see an error message indicating the issue. | PASS       |
|                                                                                                                   | **AC 5**: After saving the changes, the user should be redirected back to their updated profile page.            | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can see a header on every page so that I can easily navigate the FitTribe platform and access key features. | **AC 1**: The header should be consistently displayed at the top of every page on the site.                     | PASS       |
|                                                                                                                   | **AC 2**: The header should include the FitTribe logo, which links back to the homepage.                        | PASS       |
|                                                                                                                   | **AC 3**: The header should include navigation links to key sections such as Home and Profile if the user is authenticated and Home, Login and Sign up if not authenticated. | PASS       |
|                                                                                                                   | **AC 4**: The header should display a search bar to allow users to search for other users, posts, and groups if the user is authenticated. | PASS       |
|                                                                                                                   | **AC 5**: The header should be responsive and adapt to different screen sizes, ensuring usability on both desktop and mobile devices. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an authenticated user, I can access a side navigation menu on larger devices so that I can easily navigate to different sections of the FitTribe platform. | **AC 1**: The side navigation should be visible on larger devices (e.g., desktop and tablets) and collapse into a more compact menu or a hamburger menu on smaller devices (e.g., mobile phones). | PASS       |
|                                                                                                                   | **AC 2**: The side navigation should include links to the following sections: Home, Feed, Blogs, Workouts, Following, Groups, and Events. | PASS*      |
|                                                                                                                   | **AC 3**: Each link in the side navigation should have an icon and a label for easy identification.              | PASS       |
|                                                                                                                   | **AC 4**: The side navigation should highlight the current section the user is on to provide clear navigation context. | PASS       |
|                                                                                                                   | **AC 5**: The side navigation should have a consistent design that aligns with the overall look and feel of the FitTribe platform. | PASS       |

\*Note: Workouts has been removed due to not being present in the current version.

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can land on a personalized landing page based on my authentication status so that I can access relevant content and information about the FitTribe platform. | **Non-Authenticated Users**:                                                                                     |            |
|                                                                                                                   | **AC 1**: Non-authenticated users should be directed to a landing page with a hero image, hero text, and a call-to-action to join the FitTribe platform. | PASS       |
|                                                                                                                   | **AC 2**: The hero image should be visually appealing and represent the fitness and community aspect of FitTribe. | PASS       |
|                                                                                                                   | **AC 3**: Below the hero section, there should be additional information about the site, highlighting key features and reasons to join. | PASS       |
|                                                                                                                   | **AC 4**: The call-to-action button should stand out and lead users to the registration page to create an account. | PASS       |
|                                                                                                                   | **AC 5**: Non-authenticated users should have the option to navigate to other sections of the platform using the header, which may include links to "Login" and "Create Account". | PASS       |
|                                                                                                                   | **Authenticated Users**:                                                                                        |            |
|                                                                                                                   | **AC 1**: Authenticated users should be redirected to a landing page displaying their latest feed of blogs and workouts upon logging in. | PASS*      |
|                                                                                                                   | **AC 2**: Each blog post and workout item on the landing page should include a title, brief summary, author, and publication date. | PASS       |
|                                                                                                                   | **AC 3**: Authenticated users should have the option to navigate to other sections of the platform using the side navigation or header. | PASS       |

**Note:** Workouts have been removed due to not being present in the current version.
 
 ---

 | **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an authenticated user, I can create a blog so that I can share my fitness experiences, tips, and knowledge with the FitTribe community. | **AC 1**: There should be a "Create Blog" button accessible from the user's profile and a designated section for blog creation. | PASS       |
|                                                                                                                   | **AC 2**: Clicking the "Create Blog" button should open a form where the user can input the blog details.       | PASS       |
|                                                                                                                   | **AC 3**: The blog creation form should include fields for the title, cover image upload, description, and category selection. | PASS       |
|                                                                                                                   | **AC 4**: The title field should allow the user to enter a text title for the blog.                              | PASS       |
|                                                                                                                   | **AC 5**: The cover image upload should support common image formats (e.g., JPEG, PNG) and validate the image size and dimensions. | PASS       |
|                                                                                                                   | **AC 6**: The description field should be a text area where the user can write the content of the blog.         | PASS       |
|                                                                                                                   | **AC 7**: The category selection should provide a list of predefined categories related to fitness, and users should be able to select one or multiple categories that best fit their blog content. | PASS       |
|                                                                                                                   | **AC 8**: The system should validate that the title and description fields are not empty before allowing the user to submit the blog. | PASS       |
|                                                                                                                   | **AC 9**: Upon successful submission, the new blog post should be added to the platform, visible to other users. | PASS       |
|                                                                                                                   | **AC 10**: If any mandatory fields are missing or incorrectly filled, the user should see an error message indicating the issue. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can read blogs so that I can gain insights, tips, and information from other users' fitness experiences and knowledge. | **AC 1**: There should be a "Blogs" section accessible from the main navigation menu.                           | PASS       |
|                                                                                                                   | **AC 2**: The blog list page should display a list of blog posts with the title, cover image thumbnail, short description, author name, and publication date. | PASS       |
|                                                                                                                   | **AC 3**: Blogs should be paginated or have infinite scroll to avoid overwhelming the user with too many posts at once. | PASS       |
|                                                                                                                   | **AC 4**: The user should be able to search for blogs using a search bar.                                        | PASS       |
|                                                                                                                   | **AC 5**: Each blog post in the list should be clickable, leading to the blog details page.                     | PASS       |
|                                                                                                                   | **AC 1**: The blog details page should display the blog title, full cover image, full description/content, author name, publication date, and selected categories. | PASS       |
|                                                                                                                   | **AC 2**: The page should include the author's profile link so users can view more blogs by the same author or follow them. | PASS       |
|                                                                                                                   | **AC 3**: There should be a comment section where users can read and leave comments on the blog post.           | PASS       |
|                                                                                                                   | **AC 4**: Users should be able to like the blog post and see the total number of likes.                          | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can update my blog posts so that I can make corrections, add new information, or improve the content after publishing. | **AC 1**: There should be an "Edit" button or link accessible from the blog details page if they are the owner of the blog. | PASS       |
|                                                                                                                   | **AC 2**: Clicking the "Edit" button should open a form pre-filled with the current blog details, including the title, cover image and description. | PASS       |
|                                                                                                                   | **AC 3**: The user should be able to update the title, cover image and description.                              | PASS       |
|                                                                                                                   | **AC 4**: The system should validate the updated information, ensuring mandatory fields are not empty and the image format and size are correct. | PASS       |
|                                                                                                                   | **AC 5**: Upon successful update, the blog post should reflect the changes immediately.                         | PASS       |
|                                                                                                                   | **AC 6**: If any mandatory fields are missing or incorrectly filled, the user should see an error message indicating the issue. | PASS       |
|                                                                                                                   | **AC 7**: Any comments, likes, and previous shares on the blog should remain intact after the update.           | PASS       |
|                                                                                                                   | **AC 8**: The user should be able to cancel the update process and return to the blog details page without saving changes. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can delete my blog posts so that I can remove content I no longer want to share on the FitTribe platform. | **AC 1**: There should be a "Delete" button or link accessible from the blog details page. | PASS       |
|                                                                                                                   | **AC 2**: The "Delete" button should only be visible to the owner of the blog post.                              | PASS       |
|                                                                                                                   | **AC 3**: Clicking the "Delete" button should prompt a confirmation dialog asking the user to confirm if they want to delete the blog post. | PASS       |
|                                                                                                                   | **AC 4**: If the user confirms the deletion, the blog post should be permanently removed from the platform.       | PASS       |
|                                                                                                                   | **AC 5**: Upon successful deletion, the user should be redirected to their profile page or the blog list page.   | PASS       |
|                                                                                                                   | **AC 6**: If the user cancels the deletion process, no changes should be made, and the blog post should remain unchanged. | PASS       |
|                                                                                                                   | **AC 7**: Deleted blog posts should no longer be accessible or visible to other users on the platform.           | PASS       |
|                                                                                                                   | **AC 8**: Any comments, likes, and shares associated with the deleted blog post should also be removed.          | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can comment on blog posts so that I can engage with the content and share my thoughts or feedback with the FitTribe community. | **AC 1**: Each blog details page should include a comment section at the bottom where users can read existing comments and add new ones. | PASS       |
|                                                                                                                   | **AC 2**: The comment section should have a text area where users can write their comments.                     | PASS       |
|                                                                                                                   | **AC 3**: The system should validate that the comment text is not empty before allowing the user to submit it.   | PASS       |
|                                                                                                                   | **AC 4**: Upon successful submission, the new comment should appear immediately below the existing comments, along with the user's name and the comment timestamp. | PASS       |
|                                                                                                                   | **AC 5**: Users should be able to edit or delete their own comments, with appropriate validation and confirmation prompts. | PASS       |
|                                                                                                                   | **AC 6**: The number of comments should be displayed near the comment section header to indicate the level of engagement on the blog post. | PASS       |
|                                                                                                                   | **AC 7**: The comment section should load more comments dynamically as the user scrolls down, ensuring performance and usability. | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an authenticated user, I can like blog posts so that I can express my appreciation for the content.            | **AC 1**: Each blog details page and blog list posting should include a "Like" button that users can click to like the post. | PASS       |
|                                                                                                                   | **AC 2**: Users should be able to click the "Like" button to like or unlike the blog post.                      | PASS       |
|                                                                                                                   | **AC 3**: The "Like" button should visually change state to indicate whether the user has liked the post or not. | PASS       |
|                                                                                                                   | **AC 4**: The total number of likes should be displayed next to the "Like" button and update in real-time when a user likes or unlikes the post. | PASS       |
|                                                                                                                   | **AC 5**: The system should ensure that each user can only like a blog post once, preventing duplicate likes from the same user. | PASS       |
|                                                                                                                   | **AC 6**: The author of the blog post should not be able to like their own post.                                | PASS       |

---

| **User Story**                                                                                                    | **Acceptance Criteria**                                                                                         | **Result** |
|-------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can create a group so that I can facilitate community engagement and organize members around common interests on the FitTribe platform. | **AC 1**: There should be a "Create Group" button accessible from the admin dashboard.                           | PASS       |
|                                                                                                                   | **AC 2**: Clicking the "Create Group" button should open a form for creating a new group.                        | PASS       |
|                                                                                                                   | **AC 3**: The form should include fields for the group name, description, cover photo, and group logo.           | PASS       |
|                                                                                                                   | **AC 4**: The system should validate that the group name is unique and not empty before allowing submission.     | PASS       |
|                                                                                                                   | **AC 5**: The system should validate that the cover photo and group logo meet specified size and dimension requirements. | PASS       |
|                                                                                                                   | **AC 6**: Upon successful submission, the new group should be created and added to the list of groups on the platform. | PASS       |
|                                                                                                                   | **AC 7**: The new group should be visible to all users on the platform.                                          | PASS       |
|                                                                                                                   | **AC 8**: Only users with admin privileges should be able to see and access the "Create Group" button.           | PASS       |

---

| **User Story**                                                                                           | **Acceptance Criteria**                                                                                         | **Result** |
|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can view the details of a group so that I can learn more about the group's purpose and activities. | **AC 1**: There should be a "View Group" button or link accessible from the groups list page.                   | PASS       |
|                                                                                                          | **AC 2**: Clicking the "View Group" button should open the group details page.                                  | PASS       |
|                                                                                                          | **AC 3**: The group details page should display the group name, description, cover photo, and group logo.       | PASS       |
|                                                                                                          | **AC 4**: The group details page should list all current members of the group.                                  | FAIL*      |
|                                                                                                          | **AC 5**: The group details page should show the date the group was created and last updated.                   | PASS       |
|                                                                                                          | **AC 6**: The group details page should be accessible to all users on the platform.                             | PASS       |

**Note:** Due to privacy settings not being implemented in this version, listing all current members was deferred until privacy settings are added in the next iteration. 

---

| **User Story**                                                                                           | **Acceptance Criteria**                                                                                         | **Result** |
|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can update the details of a group so that I can keep the group's information current and relevant. | **AC 1**: There should be an "Edit Group" button accessible from the group details page.                        | PASS       |
|                                                                                                          | **AC 2**: Clicking the "Edit Group" button should open a form pre-populated with the current group details.      | PASS       |
|                                                                                                          | **AC 3**: The form should include fields for the group name, description, cover photo, and group logo.           | PASS       |
|                                                                                                          | **AC 4**: The system should validate the updated cover photo and group logo for size and dimension requirements. | PASS       |
|                                                                                                          | **AC 5**: Upon successful submission, the updated group details should be saved and reflected on the group details page. | PASS       |
|                                                                                                          | **AC 6**: Only users with admin privileges should be able to see and access the "Edit Group" button.             | PASS       |

---

| **User Story**                                                                                      | **Acceptance Criteria**                                                                                         | **Result** |
|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can delete a group so that I can remove groups that are no longer relevant or active. | **AC 1**: There should be a "Delete Group" button accessible from the group details page.                        | PASS       |
|                                                                                                     | **AC 2**: Clicking the "Delete Group" button should prompt a confirmation dialog asking the admin to confirm the deletion. | PASS       |
|                                                                                                     | **AC 3**: If the admin confirms the deletion, the group should be permanently removed from the platform.         | PASS       |
|                                                                                                     | **AC 4**: All members should be removed from the group, and the group should no longer be visible to users.      | PASS       |
|                                                                                                     | **AC 5**: Only users with admin privileges should be able to see and access the "Delete Group" button.           | PASS       |

---

| **User Story**                                                                                       | **Acceptance Criteria**                                                                                         | **Result** |
|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can join a group so that I can participate in the group's activities and connect with other members. | **AC 1**: There should be a "Join Group" button accessible from the group details page.                        | PASS       |
|                                                                                                      | **AC 2**: Clicking the "Join Group" button should add the user to the group's members list.                     | PASS       |
|                                                                                                      | **AC 3**: The "Join Group" button should change to a "Leave Group" button after the user has joined.            | PASS       |
|                                                                                                      | **AC 4**: The user should now appear in the group's members list.                                               | PASS       |
|                                                                                                      | **AC 5**: Users should not be able to join a group if they are already a member.                                | PASS       |

---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                             | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can leave a group so that I can stop participating in the group's activities.         | **AC 1**: There should be a "Leave Group" button accessible from the group details page if the user is a member.    | PASS       |
|                                                                                                    | **AC 2**: Clicking the "Leave Group" button should prompt a confirmation dialog asking the user to confirm the action. | PASS       |
|                                                                                                    | **AC 3**: If the user confirms, they should be removed from the group's members list.                               | PASS       |
|                                                                                                    | **AC 4**: Upon successful leaving, the user should see a confirmation message indicating that they have left the group. | PASS       |
|                                                                                                    | **AC 5**: The "Leave Group" button should change to a "Join Group" button after the user has left.                   | PASS       |
|                                                                                                    | **AC 6**: The user should no longer appear in the group's members list.                                             | PASS       |

---

| **User Story**                                                                                                   | **Acceptance Criteria**                                                                                             | **Result** |
|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can create an event within a group so that members can participate in scheduled activities.       | **AC 1**: There should be a "Create Event" button accessible from the group details page for admins.                | PASS       |
|                                                                                                                  | **AC 2**: Clicking the "Create Event" button should open a form for entering event details such as name, description, date, time, and location. | PASS       |
|                                                                                                                  | **AC 3**: The form should validate the event name for uniqueness and non-emptiness before allowing submission.      | PASS       |
|                                                                                                                  | **AC 4**: Upon successful submission, the new event should be added to the group's events list.                     | PASS       |
|                                                                                                                  | **AC 5**: Only users with admin privileges should be able to see and access the "Create Event" button.              | PASS       |

---

| **User Story**                                                                                           | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can view the details of an event so that I can learn more about the scheduled activities and participate. | **AC 1**: There should be a "View Event" button or link accessible from the group's events list page.         | PASS       |
|                                                                                                          | **AC 2**: Clicking the "View Event" button should open the event details page.                                | PASS       |
|                                                                                                          | **AC 3**: The event details page should display the event name, description, date, time, and location.        | PASS       |
|                                                                                                          | **AC 4**: The event details page should list all members who have joined the event.                           | FAIL*      |
|                                                                                                          | **AC 5**: The event details page should show the date the event was created and last updated.                 | PASS       |

**Note for AC 4**: Due to privacy settings not being implemented in this version, this feature will be held off until privacy settings are implemented in the next iteration.

---

| **User Story**                                                                                           | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can update the details of an event so that I can keep the event's information current and relevant. | **AC 1**: There should be an "Edit Event" button accessible from the event details page.                      | PASS       |
|                                                                                                          | **AC 2**: Clicking the "Edit Event" button should open a form pre-populated with the current event details.   | PASS       |
|                                                                                                          | **AC 3**: The form should include fields for the event name, description, date, time, and location.           | PASS       |
|                                                                                                          | **AC 4**: Upon successful submission, the updated event details should be saved and reflected on the event details page. | PASS       |
|                                                                                                          | **AC 5**: Only users with admin privileges should be able to see and access the "Edit Event" button.          | PASS       |


---

| **User Story**                                                                                           | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As an admin, I can delete an event so that I can remove events that are no longer relevant or active.    | **AC 1**: There should be a "Delete Event" button accessible from the event details page.                     | PASS       |
|                                                                                                          | **AC 2**: Clicking the "Delete Event" button should prompt a confirmation dialog asking the admin to confirm the deletion. | PASS       |
|                                                                                                          | **AC 3**: If the admin confirms the deletion, the event should be permanently removed from the platform.      | PASS       |
|                                                                                                          | **AC 4**: Upon successful deletion the user should be redirected to the group's details page.                 | PASS       |
|                                                                                                          | **AC 5**: All members should be removed from the event, and the event should no longer be visible to users.   | PASS       |
|                                                                                                          | **AC 6**: Only users with admin privileges should be able to see and access the "Delete Event" button.        | PASS       |

---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can join an event so that I can participate in the group's scheduled activities.      | **AC 1**: There should be a "Join Event" button accessible from the event details page.                       | PASS       |
|                                                                                                    | **AC 2**: Clicking the "Join Event" button should add the user to the event's participants list.              | PASS       |
|                                                                                                    | **AC 3**: Upon successful joining, the user should see a 'joined' message on the event list display indicating that they have joined the event. | PASS       |
|                                                                                                    | **AC 4**: The "Join Event" button should change to a "Leave Event" button after the user has joined.          | PASS       |
|                                                                                                    | **AC 5**: The user should now appear in the event's participants list.                                        | PASS       |
|                                                                                                    | **AC 6**: Users should not be able to join an event if they are already a participant.                        | PASS       |


---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can leave an event so that I can stop participating in the group's scheduled activities. | **AC 1**: There should be a "Leave Event" button accessible from the event details page if the user is a participant. | PASS       |
|                                                                                                    | **AC 2**: Clicking the "Leave Event" button should prompt a confirmation dialog asking the user to confirm the action. | PASS       |
|                                                                                                    | **AC 3**: If the user confirms, they should be removed from the event's participants list.                    | PASS       |
|                                                                                                    | **AC 4**: The "Leave Event" button should change to a "Join Event" button after the user has left.            | PASS       |
|                                                                                                    | **AC 5**: The user should no longer appear in the event's participants list.                                  | PASS       |

---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can follow other users so that I can stay updated with their activities and content on the platform. | **AC 1**: There should be a "Follow" button accessible from the user's profile page and their posts.             | PASS       |
|                                                                                                    | **AC 2**: Clicking the "Follow" button should add the user to the list of users that the current user is following. | PASS       |
|                                                                                                    | **AC 3**: Upon successfully following a user, the "Follow" button should change to an "Unfollow" button.          | PASS       |
|                                                                                                    | **AC 4**: The follower count on the followed user's profile should increase by one.                             | PASS       |
|                                                                                                    | **AC 5**: The following count on the current user's profile should increase by one.                              | PASS       |

---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can unfollow other users so that I can stop receiving updates from their activities and content on the platform. | **AC 1**: There should be an "Unfollow" button accessible from the user's profile page and their posts if the current user is already following them. | PASS       |
|                                                                                                    | **AC 2**: Clicking the "Unfollow" button should remove the user from the list of users that the current user is following. | PASS       |
|                                                                                                    | **AC 3**: Upon successfully unfollowing a user, the "Unfollow" button should change to a "Follow" button.       | PASS       |
|                                                                                                    | **AC 4**: The follower count on the unfollowed user's profile should decrease by one.                           | PASS       |
|                                                                                                    | **AC 5**: The following count on the current user's profile should decrease by one.                             | PASS       |

---

| **User Story**                                                                                     | **Acceptance Criteria**                                                                                       | **Result** |
|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|------------|
| As a user, I can upload and update my profile cover photo so that I can personalize my profile page. | **AC 1**: There should be an option to upload or update the cover photo on the profile edit page.              | PASS       |
|                                                                                                    | **AC 2**: The system should allow users to select an image file from their device to upload as the cover photo. | PASS       |
|                                                                                                    | **AC 3**: Upon successful upload, the new cover photo should be displayed on the user's profile page.           | PASS       |
|                                                                                                    | **AC 4**: The system should validate that the uploaded image meets the required dimensions and file size limits. | PASS       |
|                                                                                                    | **AC 5**: If the user does not have a cover photo, a default image should be displayed on the profile page.     | PASS       |

---

### Form Input Testing

| **Form**           | **Handles Change** | **Handles Errors** | **Handles Submit** |
|--------------------|---------------------|--------------------|--------------------|
| Signup             | PASS                | PASS               | PASS               |
| Signin             | PASS                | PASS               | PASS               |
| ProfileCreate      | PASS                | PASS               | PASS               |
| ProfileEdit        | PASS                | PASS               | PASS               |
| BlogCreate         | PASS                | PASS               | PASS               |
| BlogEdit           | PASS                | PASS               | PASS               |
| CommentCreate      | PASS                | PASS               | PASS               |
| CommentEdit        | PASS                | PASS               | PASS               |
| GroupCreate        | PASS                | PASS               | PASS               |
| GroupEdit          | PASS                | PASS               | PASS               |
| EventCreate        | PASS                | PASS               | PASS               |
| EventEdit          | PASS                | PASS               | PASS               |

---

## Accessibility Testing

**Lighthouse**

We used [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), an open-source, automated tool, to perform a comprehensive audit of our web pages. Lighthouse evaluates various aspects of web accessibility based on the Web Content Accessibility Guidelines (WCAG). By running a Lighthouse audit, it can identify and address issues such as missing alt text for images, insufficient color contrast, and keyboard navigation problems. The tool provided actionable insights and recommendations for each identified issue, enabling us to enhance the accessibility of our platform. Through Lighthouse, we ensured that our website meets accessibility standards and delivers a better user experience for all users, including those with disabilities.

The low scores on Best Practices for the Create and Edit pages are primarily due to the use of deprecated APIs. Specifically, DOM Mutation Events, including `DOMSubtreeModified`, `DOMNodeInserted`, `DOMNodeRemoved`, `DOMNodeRemovedFromDocument`, `DOMNodeInsertedIntoDocument`, and `DOMCharacterDataModified`, are deprecated and will be removed in future versions of Chrome. We believe this issue is caused by Quill, the rich text editor. We have reached out to Quill for guidance on this matter and will implement a fix in the next iteration or replace the rich text editor if necessary. Additionally, the Best Practices scores have been affected by the use of third-party cookies. Future versions of Chrome will no longer support third-party cookies, which are used by some of our integrations, such as Cloudinary for image hosting and Heroku for backend services. Unfortunately, we cannot resolve these issues immediately due to the dependencies on third-party services, but we are monitoring updates and will address them as soon as possible.

Moreover, the accessibility scores for these pages have been impacted by Quill's buttons not providing accessible names. We are limited in our ability to modify Quill's internal structure but are exploring alternative editors that comply better with accessibility standards.

Performance improvements are also on our roadmap for the next iteration. We plan to implement an on-demand image resizer and a loading spinner to ensure that the entire document has loaded before being displayed to the user. This will enhance the overall user experience by reducing load times and providing visual feedback during content loading. We are committed to continuously improving our site's performance and accessibility to offer the best possible user experience.

Please see the results for Desktop and Mobile Below:

**Lighthouse Testing Desktop**

| Page Name            | Performance | Accessibility | Best Practices | SEO  |
|----------------------|-------------|---------------|----------------|------|
| Homepage (Logged out) | 85          | 100           | 96             | 100  |
| Homepage (Logged In)  | 87          | 100           | 97             | 92   |
| Login Page           | 86          | 100           | 96             | 100  |
| Signup Page          | 86          | 100           | 96             | 100  |
| Profile              | 78          | 100           | 78             | 100  |
| Edit Profile         | 79          | 100           | 78             | 100  |
| Blog List            | 78          | 100           | 78             | 92   |
| Blog Create          | 86          | 90            | 59             | 92   |
| Blog Edit            | 68          | 90            | 59             | 92   |
| Blog Detail          | 78          | 100           | 78             | 100  |
| Group List           | 88          | 100           | 78             | 100  |
| Group Create         | 90          | 100           | 59             | 100  |
| Group Detail         | 78          | 100           | 78             | 100  |
| Group Edit           | 75          | 90            | 59             | 92   |
| Following            | 91          | 100           | 78             | 100  |
| Event Create         | 84          | 90            | 59             | 92   |
| Event Edit           | 87          | 90            | 59             | 92   |
| Event Detail         | 90          | 100           | 74             | 100  |

**Lighthouse Testing Mobile**

| Page Name            | Performance | Accessibility | Best Practices | SEO  |
|----------------------|-------------|---------------|----------------|------|
| Homepage (Logged out) | 60          | 100           | 96             | 100  |
| Homepage (Logged In)  | 60          | 100           | 79             | 100  |
| Login Page           | 59          | 100           | 96             | 100  |
| Signup Page          | 60          | 100           | 96             | 100  |
| Profile              | 61          | 100           | 79             | 100  |
| Edit Profile         | 60          | 100           | 79             | 100  |
| Blog List            | 61          | 100           | 79             | 100  |
| Blog Create          | 59          | 90            | 61             | 92   |
| Blog Edit            | 60          | 90            | 61             | 92   |
| Blog Detail          | 64          | 90            | 75             | 100  |
| Group List           | 62          | 100           | 79             | 100  |
| Group Create         | 67          | 100           | 79             | 100  |
| Group Detail         | 64          | 100           | 79             | 100  |
| Group Edit           | 65          | 90            | 61             | 92   |
| Following            | 68          | 100           | 79             | 100  |
| Event Create         | 61          | 90            | 61             | 92   |
| Event Edit           | 61          | 90            | 61             | 92   |
| Event Detail         | 65          | 100           | 79             | 100  |

## Compatibility Testing

This project was built and tested primarily in the Chrome browser. Upon completion and deployment, additional testing was conducted across various browsers and devices to ensure compatibility. The results are as follows:

### Browser Testing

| Route               | Specific View                  | Chrome | Safari | Firefox | Edge  |
|---------------------|--------------------------------|--------|--------|---------|-------|
| "/"                 | Home page for logged-out user  | PASS   | PASS   | PASS    | PASS  |
| "/"                 | Home page for logged-in user   | PASS   | FAIL   | PASS    | PASS  |
| "/signup"           | Sign-up page                   | PASS   | PASS   | PASS    | PASS  |
| "/signin"           | Sign-in page                   | PASS   | FAIL   | PASS    | PASS  |
| "/profile"          | Profile page                   | PASS   | FAIL   | PASS    | PASS  |
| "/edit-profile"     | Edit profile page              | PASS   | FAIL   | PASS    | PASS  |
| "/blogs"            | Blog list page                 | PASS   | FAIL   | PASS    | PASS  |
| "/create-blog"      | Create blog page               | PASS   | FAIL   | PASS    | PASS  |
| "/blogs/:id"        | Blog detail page               | PASS   | FAIL   | PASS    | PASS  |
| "/groups"           | Group list page                | PASS   | FAIL   | PASS    | PASS  |
| "/create-group"     | Create group page              | PASS   | FAIL   | PASS    | PASS  |
| "/groups/:id"       | Group detail page              | PASS   | FAIL   | PASS    | PASS  |
| "/groups/:id/edit"  | Edit group page                | PASS   | FAIL   | PASS    | PASS  |
| "/following"        | Following page                 | PASS   | FAIL   | PASS    | PASS  |
| "/create-event"     | Create event page              | PASS   | FAIL   | PASS    | PASS  |
| "/events/:id/edit"  | Edit event page                | PASS   | FAIL   | PASS    | PASS  |
| "/events/:id"       | Event detail page              | PASS   | FAIL   | PASS    | PASS  |
| Unknown route       | Page not found                 | PASS   | PASS   | PASS    | PASS  |

**Note:** The failure on Safari browsers (both mobile and desktop) is due to a known issue related to cross-site tracking and cookies. This issue arises because the project is deployed in separate frontend and backend repositories/URLs. If time permits, we will consider combining both backend and frontend under one terminal to resolve this issue.

### Device Testing

- **iPhone 13:**
  - Tested the entire platform on Safari. Encountered issues with staying logged in due to cross-site tracking and cookies.
- **Windows PC:**
  - Tested on Chrome, Firefox, and Edge. All tests passed successfully.
- **iPad Air:**
  - Tested on Safari and Chrome. Safari experienced similar issues as on the iPhone 13 due to cross-site tracking and cookies. Chrome tests passed.
- **MacBook Pro:**
  - Tested on Safari and Chrome. Safari experienced similar issues as on the iPhone 13 due to cross-site tracking and cookies. Chrome tests passed.

These tests highlight the need for improvements in handling cross-site tracking and cookies, especially for Safari users. Additionally, the performance on various devices will be enhanced in future iterations by implementing on-demand image resizing and a loading spinner to ensure the entire document loads before being displayed to the user.
