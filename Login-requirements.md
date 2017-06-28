LOGIN

* CREATE NEW BRANCH
* View in UsersController (Angular only) with
  * two fields (username & password), both required
  * message
  * button ("login")
* Password display is masked
* Login Button action
  - Read db.Users for username (case insensitive) and password (case sensitive)
    * if not found: clear fields
    * if found:
      - store some User data for all PRS access (System Service?)
      - navigate to home page

IF USER ISADMIN == FALSE

* Cannot Add/Edit/Delete
* Cannot toggle to see passwords
* Cannot edit or delete from detail

PURCHASE REQUESTS

* If not an admin, list only see purchase requests you own