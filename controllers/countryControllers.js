const {pool} = require("../DB/dbConnection");


const getAllCountries = (req, res) => {
    // Check if the 'sort' query parameter is present and its value is 'true'
    const sort = req.query.sort === 'true';
  
    // Construct the SQL query based on the presence of the 'sort' query parameter
    let query = "SELECT * FROM countries";
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
    const {code} = req.params;

    const query = `
      SELECT * FROM countries 
      WHERE alpha2Code = $1 OR alpha3Code = $2
    `;

    pool.query(query, [code,code], (error, result)=>{
        if(error){
            throw error
        }else{
            if (result.rows.length === 0) {
                res.status(404).send("Country not found");
        }else{
            res.json(result.rows[0]); 
        }
    }
  });
};

//CREATE COUNTRY in users list checking if that country exists in the global country tables.

const createCountry = (req, res) => {
  
        // Extract country name from request body
        const { name } = req.body;

        // Determine the table based on the alphabetical range of the country name
        let tableName;
        const firstLetter = name.charAt(0).toUpperCase();

        if (firstLetter >= 'A' && firstLetter <= 'G') {
            tableName = 'countries_a_to_g';
        } else if (firstLetter >= 'H' && firstLetter <= 'M') {
            tableName = 'countries_h_to_m';
        } else if (firstLetter >= 'N' && firstLetter <= 'S') {
            tableName = 'countries_n_to_s';
        } else if (firstLetter >= 'T' && firstLetter <= 'Z') {
            tableName = 'countries_t_to_z';
        } else {
            throw new Error('Invalid country name');
        }

        // Retrieve alpha codes for the country from the corresponding table
        const query = `
            SELECT alpha2_code, alpha3_code
            FROM ${tableName}
            WHERE name = $1;
        `;
        const values = [name];
        pool.query(query, values);

        // Extract alpha codes from the query result
        const { alpha2_code, alpha3_code } = result.rows[0];

        // Insert the country with alpha codes into the user's table
        const insertQuery = `
            INSERT INTO user_table (country_name, alpha2_code, alpha3_code)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const insertValues = [name, alpha2_code, alpha3_code];
        const insertResult =  pool.query(insertQuery, insertValues);

        // Respond with the inserted country data
        res.status(201).json(insertResult.rows[0]);
    
        console.error('Error adding country to user:', error.message);
        res.status(500).send('Error adding country to user');
    
};






//Delete Country


module.exports =  {getAllCountries, getCountryByCode, createCountry, deleteCountry} 