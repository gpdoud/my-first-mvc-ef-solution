LOGIN

* CREATE NEW BRANCH
* View in UsersController (Angular only) with
  * two fields (username & password), both required
  * message
  * button ("login")
* Password display is masked
* Button action
  - Read db.Users for username (case insensitive) and password (case sensitive)
    * if not found: clear fields
    * if found:
      - store some User data for all PRS access (System Service?)
      - navigate to home page