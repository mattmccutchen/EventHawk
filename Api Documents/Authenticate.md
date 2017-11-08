**Get Auth Token**
----
  Get an auth token for the EventHawk API.

* **URL**

  /login

* **Method:**
  
  POST
 
* **Data Params**

   **Required:**
 
   `{ "auth" : { "email" : "[string]", "password" : "[string]" } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "jwt" : "[string]" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error" : ["string"] }`
