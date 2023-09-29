# ga-project3
Restaurant finder app

## Routes
| HTTP method | Endpoint                      | Operation                   | Router         | Controller           | Controller Action | Payload |
|-------------|-------------------------------|-----------------------------|----------------|----------------------|-------------------|---------|
| GET         | /customer/home                | Retrieve user's groups      | customerRouter | customerController   | index             | no      |
| GET         | /customer/group/:groupid      | Retrieve group details      | customerRouter | groupsController     | show              | no      |
| POST        | /customer/group/new           | Create new group            | customerRouter | groupsController     | create            | yes     |
| PUT         | /customer/group/:groupid      | Update group details        | customerRouter | groupsController     | update            | yes     |
| DELETE      | /customer/group/:groupid      | Delete group                | customerRouter | groupsController     | delete            | no      |
| GET         | /merchant/home                | Retrieve merchant's stores  | index          | merchantController   | index             | no      |
| GET         | /merchant/store/:storeid      | Retrieve store details      | merchantRouter | storeController      | show              | no      |
| POST        | /merchant/store/new           | Create new store            | merchantRouter | storeController      | create            | no      |
| PUT         | /merchant/store/:storeid      | Update store details        | merchantRouter | storeController      | update            | -       |
| DELETE      | /merchant/store/:storeid      | Delete store                | merchantRouter | storeController      | delete            | -       |

* <u>update</u> action 
  * change group name
  * add/remove group member (other0)
  * leave group (self)

* <u>delete</u> group
  * "leave" group - use update instead to remove self from group
  * "close" group - remove group from DB, group will no longer be accessible for other users too


wireframe
https://docs.google.com/presentation/d/1Y9RsNlIcv0F0aYZ_XaB5mnJGmpywuNJFqqSR40y9XIg/edit?usp=sharing
