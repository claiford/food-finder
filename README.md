# ga-project3
Restaurant finder app

## Routes
| HTTP method | Endpoint    | Operation              | Controller Action | Payload |
|-------------|-------------|------------------------|-------------------|---------|
| GET         | /groups     | Retrieve user's groups | index             | -       |
| GET         | /groups/:id | Retrieve group details | show              | -       |
| POST        | /groups     | Create new group       | create            | yes     |
| PUT         | /groups/:id | Update group details   | update            | yes     |
| DELETE      | /groups/:id | Delete group           | delete            | no      |

* <u>update</u> action 
  * change group name    
  * add/remove group member (other0)
  * leave group (self)

* <u>delete</u> group
  * "leave" group - use update instead to remove self from group
  * "close" group - remove group from DB, group will no longer be accessible for other users too