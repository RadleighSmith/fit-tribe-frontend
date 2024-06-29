# Testing and Validation

## Contents

[Code Validation](#code-validation)


---

## Code Validation

### JavaScript Validation

### ESLint Error Fixes

In our project, we leveraged [ESLint](https://eslint.org/) to maintain code quality and consistency throughout our JavaScript and React codebase. ESLint helped us identify potential errors and deviations from our coding standards, ensuring our code remained clean and maintainable. By configuring ESLint with specific rules, we tailored it to meet our project's requirements and coding style.

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
