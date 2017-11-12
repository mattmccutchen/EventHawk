**Update User**
----
  Update a single EventHawk user.

* **URL**

  /users/:id

* **Method:**
  
  PUT

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

*  **URL Params**

   **Required:**
 
   `id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "user" : { <one_or_more_optional> } }`
   
   **Optional:**
   
   `{ "first_name" : "[string]" }` <br/>
   `{ "last_name" : "[string]" }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "user" : { "first_name" : "[string]", "last_name" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer] }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
