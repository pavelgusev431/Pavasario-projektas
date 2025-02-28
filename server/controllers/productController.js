import User from '../models/userModel.js';
import Product from '../models/productModel.js';

const getUserProducts = async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Netinkamas vartotojo ID formatas" });
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
     
    });

    if (!user) {
      return res.status(404).json({ message: "Vartotojas nerastas" });
    }

    const products =  await Product.findAll(
      { where: { user_id: userId } }
    ) 
    console.log(products);
    
    return res.json({data:products});  // Send the products in the response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Klaida gaunant duomenis" });
  }
};
export {getUserProducts}



