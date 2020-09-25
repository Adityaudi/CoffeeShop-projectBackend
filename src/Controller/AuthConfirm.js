const confirmtoken = {}

confirmtoken.confirm = (req, res) => {
   try {
    return res.status(200).json('ini Admin')
   } catch (error) {
       return res.status(401).json('No access CRUD')
   }
}
module.exports = confirmtoken