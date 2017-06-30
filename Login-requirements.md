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

* If not an admin:
	* list only see purchase requests you own
	* cannot change user
* if an admin
	* list all purchase requests
	* can change user
* You don't have to be an admin to add/change/delete a PR
* On the view, change the text "Detail, Edit" to Bootstrap Glyphicons
* Detail view displays REVIEW button
	* if current status is NEW
	* changes status from NEW to REVIEW
* The Review process
	- Menu item for REVIEW
	- Only display purchase requests with status of REVIEW
	- Review view like purchase request view EXCEPT:
		# None of the purchase request or lines data can be modified
		# Detail action displays purchase request and all lines (no changes allowed)
		# Two buttons: APPROVE & REJECT
		# APPROVED: Changes status to APPROVED on purchase request and updates
		# REJECTED: Changes status to REJECTED on purchase request and updates
		# Review view is redisplayed. Changed purchase request should be missing (since status is not REVIEW)
* if Purchase request status is APPROVED
	- Entire purchase request is read only except for admins. No changes
	- Purchase request can be deleted
* if Purchase Request status is REJECTED
	- Purchase request allows all changes and deletes
	- Can be set to REVIEW again