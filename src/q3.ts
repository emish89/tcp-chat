export const answer = `Suppose we have a single production environment (no staging, dev, or test). 
  How would you design the development and release process of a web application that makes it possible to release the "master" branch at any time? 
  
  \n
  It depends from the requests. For example, I want the "main" branch to release on every commit, without any other external confirmation?
  In this case I can use the CI/CD pipeline (like GitHub Actions or Jenkins) to build and deploy the application on every commit.
  In the other case, I can create a "release" branch and merge the "main" branch in it when I want to release the application (using a similar pipeline).
  \n
  \n
  How would you manage incrementally developing multiple features in parallel while frequently releasing to production?
  \n
  I can use N "features" branch to develop new feature and merge it in the "main" branch when it's ready. 
  In this way we can develop multiple features in parallel and release on "main" only when they are fully working and tested.
  Before merging, in case of other features merged in the "main" branch, I can use a "rebase" to update the "feature" branch with the new changes.

  `;
