**Create New User**
----
  Create a new EventHawk user.

* **URL**

  /users

* **Method:**
  
  POST
 
* **Data Params**

   **Required:**
 
   `{ "user" : { "first_name" : "[string]", "last_name" : "[string]", "email" : "[string]", "password" : "[string]" } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "user" : { "first_name" : "[string]", "last_name" : "[string]", "email" : "[string]", "user_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`