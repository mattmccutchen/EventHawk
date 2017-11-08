**Show User**
----
  Returns JSON data about a single EventHawk user

* **URL**

  /users/:id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "user" : { "first_name" : "[string]", "last_name" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
