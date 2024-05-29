const {pool} = require("../DB/dbConnection");


const getAllCountries = (req, res) => {
    // Check if the 'sort' query parameter is present and its value is 'true'
    const sort = req.query.sort === 'true';
  
    // Construct the SQL query based on the presence of the 'sort' query parameter
    let query = "SELECT * FROM user1_countries";
    if (sort) {
      // Add ORDER BY clause to sort the results alphabetically by the name column
      query += " ORDER BY name";
    }
  
    // Execute the query
    pool.query(query, (error, result) => {
      if (error) {
        // Handle any errors during query execution
        throw error;
      } else {
        // Check if the query returned any rows
        if (result.rows.length === 0) {
          // If no rows are found, send a 404 response
          res.status(404).send("No data found");
        } else {
          // Send the resulting rows as a JSON response
          res.json(result.rows);
        }
      }
    });
  };


const getCountryByCode = (req,res)=>{
    const {id} = req.params;
     console.log(id)
    const query = `
      SELECT * FROM user1_countries 
      WHERE alpha2_code = $1 OR alpha3_code = $2
    `;

    pool.query(query, [id,id], (error, result)=>{
        if(error){
            throw error
        }else{
            if (result.rows.length === 0) {
                res.status(404).send("Country not found");
        }else{
            res.json(result.rows);
            
        }
    }
  });
};

//CREATE COUNTRY in users list checking if that country exists in the global country tables.

const createCountry = (req, res) => {
  
        // Extract country name from request body
        const { country_name } = req.body;

        // Determine the table based on the alphabetical range of the country name
        let tableName;
        const abecedary = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            ' y',
            'z',
          ];
        const firstLetter = country_name.charAt(0).toLowerCase();
        
        const indexAbc= abecedary.find((letter, index)=>{
            if (letter===firstLetter){
                return index
            }
        })

        if (indexAbc >= 0 && indexAbc <= 4) {
            tableName = 'countries_a_to_e';
        } else if (firstLetter >= 'F' && firstLetter <= 'J') {
            tableName = 'countries_f_to_j';
        } else if (firstLetter >= 'K' && firstLetter <= 'O') {
            tableName = 'countries_k_to_o';
        } else if (firstLetter >= 'P' && firstLetter <= 'T') {
            tableName = 'countries_p_to_t';
        } else if(firstLetter >= 'U' && firstLetter <= 'Z'){
            tableName = 'countries_u_to_z';
        } else {
            throw new Error('Invalid country name');
        }

        // Retrieve alpha codes for the country from the corresponding table
        const query = `
            SELECT alpha2_code, alpha3_code
            FROM ${tableName}
            WHERE name = $1;
        `;
        const values = [country_name];
        pool.query(query, values, (error, result)=>{
            if(error){
                throw error
            }else{

            
 // Extract alpha codes from the query result
        const { alpha2_code, alpha3_code } = result.rows[0];

        // Insert the country with alpha codes into the user's table
        const insertQuery = `
            INSERT INTO user1_countries (country_name, alpha2_code, alpha3_code)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const insertValues = [country_name, alpha2_code, alpha3_code];
        pool.query(insertQuery, insertValues,(error,result)=>{
            if(error){
                console.error('Error adding country to user:', error.message);
                res.status(500).send('Error adding country to user');
            }else{
             // Respond with the inserted country data
             res.status(201).json(insertResult.rows[0]);
            }

        });

       
        }
});

        
    
};



//DELETE COUNTRY
 const deleteCountry =(req,res)=>{
    const {id}=req.params;

    pool.query(`DELETE FROM user1_countries WHERE id=$1 RETURNING*`,[id], (error, result)=>{
        if(error){
            throw error
        }else{
            if (result.rows.length === 0) {
                return res.status(404).send('Country not found');
              }else{
                res.json(result.rows);
              }
        }
    })
    
 }


module.exports =  {getAllCountries, getCountryByCode, createCountry, deleteCountry} 