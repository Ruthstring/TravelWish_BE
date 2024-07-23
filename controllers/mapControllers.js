const {pool} = require("../DB/dbConnection");

const getColor= async(req,res)=>{
    try {
        const result = await pool.query('SELECT country_id, color FROM country_colors');
        const colors = {};
        result.rows.forEach(row => {
          colors[row.country_id] = row.color;
        });
        res.json(colors);
      } catch (err) {
        console.error('Error fetching colors:', err);
        res.status(500).json({ error: 'Failed to fetch colors' });
      }
};

const saveColor=async(req,res)=>{
    const { countryId, color } = req.body;
    try {
      await pool.query(`
        INSERT INTO country_colors (country_id, color)
        VALUES ($1, $2)
        ON CONFLICT (country_id)
        DO UPDATE SET color = EXCLUDED.color;
      `, [countryId, color]);
      console.log(countryId,color);
      res.json({ success: true });
    } catch (err) {
      console.error('Error saving color:', err);
      res.status(500).json({ error: 'Failed to save color' });
    }   
}

module.exports={saveColor,getColor}